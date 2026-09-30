import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // Tests never send real RSVPs or navigate to external material providers.
  await page.route("https://script.google.com/**", (route) => route.abort());
});

test("materials page has previews, links, language persistence and browser history", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await page.getByRole("link", { name: "Фото и видео", exact: true }).click();
  await expect(page).toHaveURL(/#\/memories$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Наш день в кадрах",
  );
  await expect(page.locator("main img")).toHaveCount(3);
  for (const link of await page.locator("main a").all()) {
    await expect(link).toHaveAttribute(
      "href",
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    );
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
  }
  await page.getByRole("button", { name: "Сербский", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "sr");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Наш дан у сликама",
  );
  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Наш дан у сликама",
  );
  await page.getByRole("link", { name: "Позивница", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "26. Септембар 2026", exact: true }),
  ).toBeVisible();
  await page.goBack();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Наш дан у сликама",
  );
  await page.goForward();
  await expect(
    page.getByRole("link", { name: "Позивница", exact: true }),
  ).toHaveAttribute("aria-current", "page");
  expect(errors).toEqual([]);
});

test("language changes still work with denied browser storage", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new DOMException("Blocked", "SecurityError");
      },
    });
  });
  await page.goto("/#/memories");
  await page.getByRole("button", { name: "Сербский", exact: true }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Наш дан у сликама",
  );
  await page.getByRole("link", { name: "Позивница", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "26. Септембар 2026", exact: true }),
  ).toBeVisible();
});

test("playlist groups expand independently and carousel responds to keyboard", async ({
  page,
}) => {
  await page.goto("/");
  const groom = page.getByRole("button", { name: "DJ Alexis", exact: true });
  const bride = page.getByRole("button", { name: "DJ MaRussia", exact: true });
  await bride.click();
  await expect(bride).toHaveAttribute("aria-expanded", "false");
  await expect(groom).toHaveAttribute("aria-expanded", "true");
  await bride.click();
  await expect(bride).toHaveAttribute("aria-expanded", "true");
  await groom.click();
  await expect(groom).toHaveAttribute("aria-expanded", "false");
  await expect(bride).toHaveAttribute("aria-expanded", "true");
  const image = page.getByRole("img", {
    name: "Примеры для вдохновения — 1",
    exact: true,
  });
  await expect(image).toBeVisible();
  const next = page.getByRole("button", {
    name: "Следующее фото",
    exact: true,
  });
  await next.focus();
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("img", { name: "Примеры для вдохновения — 2", exact: true }),
  ).toBeVisible();
});

test("completed event keeps RSVP disabled and shows the translated notice", async ({
  page,
}) => {
  let requests = 0;
  await page.route("https://script.google.com/**", async (route) => {
    requests++;
    await route.abort();
  });
  await page.goto("/");
  await expect(
    page.getByText("Событие завершилось :(", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("textbox", { name: "Ваше имя и фамилия" }),
  ).toBeDisabled();
  await expect(
    page.getByRole("button", { name: "Отправить ответ" }),
  ).toBeDisabled();
  for (const radio of await page.getByRole("radio").all())
    await expect(radio).toBeDisabled();
  await page
    .locator("form")
    .evaluate((form) =>
      form.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true }),
      ),
    );
  expect(requests).toBe(0);
  await page.getByRole("button", { name: "Сербский", exact: true }).click();
  await expect(
    page.getByText("Догађај је завршен :(", { exact: true }),
  ).toBeVisible();
});

test("pages fit the viewport and preview images load", async ({ page }) => {
  for (const path of ["/", "/#/memories"]) {
    await page.goto(path);
    await expect
      .poll(() =>
        page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      )
      .toBe(true);
  }
  await expect
    .poll(() =>
      page
        .locator("main img")
        .evaluateAll((images) =>
          images.every(
            (img) =>
              img instanceof HTMLImageElement &&
              img.complete &&
              img.naturalWidth > 0,
          ),
        ),
    )
    .toBe(true);
});

test("pausing a pending audio play is cancellation, not a playback error", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "Audio", {
      value: class {
        paused = true;
        currentTime = 0;
        duration = 120;
        rejectPlay?: (reason: Error) => void;
        play() {
          this.paused = false;
          return new Promise<void>((_, reject) => {
            this.rejectPlay = reject;
          });
        }
        pause() {
          this.paused = true;
          this.rejectPlay?.(
            new DOMException("Interrupted by pause", "AbortError"),
          );
        }
      },
    });
  });
  await page.goto("/");
  await page
    .getByRole("button", { name: "Воспроизвести", exact: true })
    .first()
    .click();
  await page.getByRole("button", { name: "Пауза", exact: true }).click();
  await expect(page.getByRole("alert")).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Пауза", exact: true }),
  ).toHaveCount(0);
});

test("audio switches tracks, resets at the end and stops when leaving the page", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const tracks: { paused: boolean }[] = [];
    Object.defineProperty(window, "testAudioStates", {
      get: () => tracks.map((track) => track.paused),
    });
    Object.defineProperty(window, "Audio", {
      value: class {
        paused = true;
        currentTime = 0;
        duration = 120;
        onended: (() => void) | null = null;
        constructor() {
          tracks.push(this);
          window.addEventListener("test-audio-ended", () => {
            this.paused = true;
            this.onended?.();
          });
        }
        play() {
          this.paused = false;
          return Promise.resolve();
        }
        pause() {
          this.paused = true;
        }
      },
    });
  });
  await page.goto("/");
  await page
    .getByRole("button", { name: "Воспроизвести", exact: true })
    .first()
    .click();
  await expect(
    page.getByRole("button", { name: "Пауза", exact: true }),
  ).toHaveCount(1);
  await page
    .getByRole("button", { name: "Воспроизвести", exact: true })
    .first()
    .click();
  expect(
    await page.evaluate(() => Reflect.get(window, "testAudioStates")),
  ).toEqual([true, false]);
  await page.evaluate(() =>
    window.dispatchEvent(new Event("test-audio-ended")),
  );
  await expect(
    page.getByRole("button", { name: "Пауза", exact: true }),
  ).toHaveCount(0);
  await page
    .getByRole("button", { name: "Воспроизвести", exact: true })
    .first()
    .click();
  await page.getByRole("link", { name: "Фото и видео", exact: true }).click();
  expect(
    await page.evaluate(() => Reflect.get(window, "testAudioStates")),
  ).toEqual([true, true, true]);
});

test("palette bubbles pop independently and can be popped again", async ({
  page,
}) => {
  await page.goto("/");
  const bubbles = page.getByRole("button", { name: /^Лопнуть цвет:/ });
  await expect(bubbles).toHaveCount(6);
  const first = bubbles.first();
  await first.click();
  await expect(first).toHaveAttribute("aria-disabled", "true");
  await expect(bubbles.nth(1)).toHaveAttribute("aria-disabled", "false");
  await expect(first).toHaveAttribute("aria-disabled", "false");
  await first.focus();
  await page.keyboard.press("Enter");
  await expect(first).toHaveAttribute("aria-disabled", "true");
  await expect(first).toHaveAttribute("aria-disabled", "false");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await first.click();
  await expect(first).toHaveAttribute("aria-disabled", "false");
});

test("photo previews are not links and only text opens media", async ({
  page,
}) => {
  await page.goto("/#/memories");
  await expect(page.locator("main a img")).toHaveCount(0);
  await expect(page.locator("main a")).toHaveCount(2);
  await expect(
    page.getByRole("link", { name: "Открыть фотоальбом" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Смотреть видео" }),
  ).toBeVisible();
  await page.locator("main img").first().click();
  await expect(page).toHaveURL(/#\/memories$/);
});
