import { useEffect, useRef, useSyncExternalStore } from "react";
import { Box, Button, Container } from "@mui/material";
import { InvitationPage } from "./pages/InvitationPage";
import { MemoriesPage } from "./pages/MemoriesPage";
import { LanguageSwitcher } from "./components/LanguageSwitcher";
import { FlowerBackground } from "./components/common/FlowerBackground";
import { useTranslation } from "./hooks/useTranslation";

function subscribe(callback: () => void) {
  window.addEventListener("hashchange", callback);
  return () => window.removeEventListener("hashchange", callback);
}
function getPage() {
  return window.location.hash === "#/memories" ? "memories" : "invitation";
}

export default function App() {
  const page = useSyncExternalStore(
    subscribe,
    getPage,
    () => "invitation" as const,
  );
  const { t } = useTranslation();
  const main = useRef<HTMLElement>(null);
  useEffect(() => {
    window.scrollTo(0, 0);
    main.current?.focus({ preventScroll: true });
  }, [page]);
  useEffect(() => {
    document.title = `${t(page)} — ${t("couple")}`;
  }, [page, t]);

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "clip",
        bgcolor: "#faf7f2",
        minHeight: "100vh",
      }}
    >
      <FlowerBackground count={page === "invitation" ? 228 : 45} />
      <Box
        component="header"
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          bgcolor: "rgba(250,247,242,0.97)",
          borderBottom: "1px solid #eadfd0",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1,
            py: 1.5,
          }}
        >
          <Box
            component="nav"
            aria-label={t("navigation")}
            sx={{ display: "flex", gap: 1 }}
          >
            {(["invitation", "memories"] as const).map((item) => (
              <Button
                key={item}
                href={item === "invitation" ? "#/" : "#/memories"}
                aria-current={page === item ? "page" : undefined}
                variant={page === item ? "contained" : "text"}
                sx={{
                  fontSize: { xs: "1.1rem", sm: "1.4rem" },
                  textTransform: "none",
                  whiteSpace: "nowrap",
                }}
              >
                {t(item)}
              </Button>
            ))}
          </Box>
          <LanguageSwitcher />
        </Container>
      </Box>
      <Box
        component="main"
        ref={main}
        tabIndex={-1}
        sx={{ position: "relative", zIndex: 1, outline: "none" }}
      >
        {page === "memories" ? <MemoriesPage /> : <InvitationPage />}
      </Box>
    </Box>
  );
}
