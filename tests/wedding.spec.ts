import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // Tests never send real RSVPs or navigate to external material providers.
  await page.route("https://script.google.com/**", (route) => route.abort());
});

test("photos page has an album link, language persistence and browser history", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await page.getByRole("link", { name: "Фото", exact: true }).click();
  await expect(page).toHaveURL(/#\/photos$/);
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /^(Наш день в кадрах|Наш дан у сликама)$/,
    }),
  ).toHaveText(
    "Наш день в кадрах",
  );
  await expect(page.locator("main img")).toHaveCount(620);
  const album = page.getByRole("link", { name: "Открыть папку с оригиналами" });
  await expect(album).toHaveAttribute(
    "href",
    "https://drive.google.com/drive/folders/1TFV7yQAuQPaD8bh7msEiltTpRNqNVtEc?usp=sharing",
  );
  await expect(album).toHaveAttribute("rel", "noopener noreferrer");
  await page.getByRole("button", { name: "Сербский", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "sr");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /^(Наш день в кадрах|Наш дан у сликама)$/,
    }),
  ).toHaveText(
    "Наш дан у сликама",
  );
  await page.reload();
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /^(Наш день в кадрах|Наш дан у сликама)$/,
    }),
  ).toHaveText(
    "Наш дан у сликама",
  );
  await page.getByRole("link", { name: "Позивница", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "26. Септембар 2026", exact: true }),
  ).toBeVisible();
  await page.goBack();
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /^(Наш день в кадрах|Наш дан у сликама)$/,
    }),
  ).toHaveText(
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
  for (const path of ["/", "/#/photos", "/#/videos"]) {
    await page.goto(path);
    await expect
      .poll(() =>
        page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      )
      .toBe(true);
  }
  await page.goto("/#/photos");
  const firstPhoto = page.locator("main img").first();
  await expect(firstPhoto).toBeVisible();
  await expect.poll(() => firstPhoto.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
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
  await page.getByRole("link", { name: "Фото", exact: true }).click();
  await expect.poll(
    () => page.evaluate(() => Reflect.get(window, "testAudioStates")),
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

test("photo gallery and video link live on separate pages", async ({ page }) => {
  await page.goto("/#/photos");
  await expect(page.getByRole("link", { name: "Открыть папку с оригиналами" })).toBeVisible();
  const photos = page.locator("main img");
  await expect(photos).toHaveCount(620);
  await expect(photos.last()).toHaveAttribute("loading", "lazy");
  await photos.last().scrollIntoViewIfNeeded();
  await expect.poll(() => photos.last().evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
  await expect(page.getByRole("link", { name: "Смотреть видео" })).toHaveCount(0);
  await page.getByRole("link", { name: "Видео", exact: true }).click();
  await expect(page).toHaveURL(/#\/videos$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Видео нашего дня");
  await expect(page.locator("main img, main video, main iframe")).toHaveCount(0);
  await expect(page.locator("main a")).toHaveCount(1);
  await expect(page.getByRole("link", { name: "Смотреть видео" })).toHaveAttribute("target", "_blank");
  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Видео нашего дня");
});

test("gallery follows numeric filename order in a single horizontal row", async ({ page }) => {
  await page.goto("/#/photos");
  const photos = page.locator("main img");
  await expect(photos).toHaveCount(620);
  const sources = await photos.evaluateAll((images) => images.map((img) => img.getAttribute("src")!));
  const expected = [...sources].sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
  expect(sources).toEqual(expected);
  const bounds = await photos.evaluateAll((images) => images.slice(0, 4).map((img) => {
    const { x, y, width, height } = img.getBoundingClientRect();
    return { x, y, width, height, ratio: Number(img.getAttribute("width")) / Number(img.getAttribute("height")) };
  }));
  for (let index = 0; index < bounds.length; index++) {
    expect(Math.abs(bounds[index]!.y + bounds[index]!.height / 2 - bounds[0]!.y - bounds[0]!.height / 2)).toBeLessThan(1);
    expect(Math.abs(bounds[index]!.width / bounds[index]!.height - bounds[index]!.ratio)).toBeLessThan(0.01);
    if (index > 0) expect(bounds[index]!.x).toBeGreaterThan(bounds[index - 1]!.x);
  }
});

test("photo preview opens centered without a filename and closes with keyboard or button", async ({ page }) => {
  await page.goto("/#/photos");
  const thumbnail = page.getByRole("button", { name: "Свадебная фотография 1", exact: true });
  const source = await thumbnail.locator("img").getAttribute("src");
  await thumbnail.click();
  const preview = page.getByRole("dialog", { name: "Свадебная фотография", exact: true });
  await expect(preview).toBeVisible();
  const photo = preview.getByRole("img");
  await expect(photo).toHaveAttribute("src", source!);
  await expect(preview).not.toContainText(/\.(webp|jpg)/);
  const bounds = await photo.boundingBox();
  const viewport = page.viewportSize()!;
  expect(Math.abs(bounds!.x + bounds!.width / 2 - viewport.width / 2)).toBeLessThan(2);
  expect(Math.abs(bounds!.y + bounds!.height / 2 - viewport.height / 2)).toBeLessThan(2);
  await page.keyboard.press("Escape");
  await expect(preview).toHaveCount(0);
  await expect(thumbnail).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(preview).toBeVisible();
  await preview.getByRole("button", { name: "Закрыть", exact: true }).click();
  await expect(preview).toHaveCount(0);
});


test("mouse wheel scrolls photos horizontally only while hovering the strip", async ({ page }) => {
  await page.goto("/#/photos");
  const strip = page.getByRole("group", { name: "Фотографии", exact: true });
  await strip.scrollIntoViewIfNeeded();
  await strip.hover();
  const top = await page.evaluate(() => window.scrollY);
  await page.mouse.wheel(0, 400);
  await expect.poll(() => strip.evaluate((element) => element.scrollLeft)).toBeGreaterThan(100);
  expect(await page.evaluate(() => window.scrollY)).toBe(top);
  const left = await strip.evaluate((element) => element.scrollLeft);
  await page.mouse.wheel(250, 0);
  await expect.poll(() => strip.evaluate((element) => element.scrollLeft)).toBeGreaterThan(left);
  await page.mouse.wheel(0, -400);
  await expect.poll(() => strip.evaluate((element) => element.scrollLeft)).toBeLessThan(left);
  await page.getByRole("heading", { level: 1 }).hover();
  const stoppedAt = await strip.evaluate((element) => element.scrollLeft);
  await page.mouse.wheel(0, 300);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
  expect(await strip.evaluate((element) => element.scrollLeft)).toBe(stoppedAt);
});

test("gallery scrollbar supports track clicks, dragging and follows wheel scrolling", async ({ page }) => {
  await page.goto("/#/photos");
  const strip = page.getByRole("group", { name: "Фотографии", exact: true });
  const slider = page.getByRole("slider", { name: "Прокрутка фотографий", exact: true });
  await expect(slider).toBeVisible();
  await slider.scrollIntoViewIfNeeded();
  const bar = page.locator('.MuiSlider-root');
  const bounds = (await bar.boundingBox())!;
  await page.mouse.click(bounds.x + bounds.width * 0.5, bounds.y + bounds.height / 2);
  await expect.poll(() => strip.evaluate((el) => el.scrollLeft / (el.scrollWidth - el.clientWidth))).toBeGreaterThan(0.45);
  const thumb = page.locator('.MuiSlider-thumb');
  const handle = (await thumb.boundingBox())!;
  await page.mouse.move(handle.x + handle.width / 2, handle.y + handle.height / 2);
  await page.mouse.down();
  await page.mouse.move(bounds.x + bounds.width * 0.75, bounds.y + bounds.height / 2, { steps: 8 });
  await page.mouse.up();
  await expect.poll(() => strip.evaluate((el) => el.scrollLeft / (el.scrollWidth - el.clientWidth))).toBeGreaterThan(0.7);
  await slider.focus();
  await page.keyboard.press("Home");
  await expect.poll(() => strip.evaluate((el) => el.scrollLeft)).toBe(0);
  await strip.hover();
  await page.mouse.wheel(0, 600);
  await expect.poll(async () => Number(await slider.getAttribute("aria-valuenow"))).toBeGreaterThan(0);
});

test("every photo fits the mobile strip without cropping", async ({ page }) => {
  test.skip(page.viewportSize()!.width >= 600, "Mobile layout");
  await page.goto("/#/photos");
  const strip = page.getByRole("group", { name: "Фотографии", exact: true });
  await expect(strip).toBeVisible();
  for (const width of [390, 320, 568]) {
    await page.setViewportSize({ width, height: 844 });
    const fits = await strip.evaluate((element) => [...element.querySelectorAll("img")].every((image) => {
      const bounds = image.getBoundingClientRect();
      const ratio = Number(image.getAttribute("width")) / Number(image.getAttribute("height"));
      return bounds.width <= element.clientWidth && bounds.height <= element.clientHeight && Math.abs(bounds.width / bounds.height - ratio) < 0.01;
    }));
    expect(fits).toBe(true);
  }
});
