import { useState } from "react";
import { Box } from "@mui/material";
import { keyframes } from "@emotion/react";

const pop = keyframes`
  0% { transform: scale(1); opacity: 1; }
  15% { transform: scale(1.18, 0.88); opacity: 1; }
  30% { transform: scale(1.3); opacity: 0; }
  65% { transform: scale(0.2); opacity: 0; }
  85% { transform: scale(1.08); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
`;
const scatter = keyframes`
  0%, 15% { transform: translate(0, 0) scale(0); opacity: 0; }
  25% { opacity: 1; }
  100% { transform: translate(var(--burst-x), var(--burst-y)) scale(0.2); opacity: 0; }
`;
const directions = Array.from({ length: 8 }, (_, index) => {
  const angle = (index * Math.PI) / 4;
  return { x: `${Math.cos(angle) * 55}px`, y: `${Math.sin(angle) * 55}px` };
});

export function PaletteBubble({
  color,
  label,
}: {
  color: string;
  label: string;
}) {
  const [popping, setPopping] = useState(false);
  return (
    <Box
      component="button"
      type="button"
      aria-label={label}
      aria-disabled={popping}
      onClick={() => {
        if (!popping) setPopping(true);
      }}
      sx={{
        position: "relative",
        width: 80,
        height: 80,
        flexShrink: 0,
        border: 0,
        p: 0,
        borderRadius: "50%",
        bgcolor: "transparent",
        cursor: "pointer",
        touchAction: "manipulation",
        WebkitTapHighlightColor: "transparent",
        "&:focus-visible": { outline: "3px solid #a71650", outlineOffset: 6 },
        "@media (hover: hover)": {
          "&:hover > .palette-sphere": { scale: "1.05" },
        },
      }}
    >
      <Box
        component="span"
        className="palette-sphere"
        onAnimationEnd={() => setPopping(false)}
        sx={{
          display: "block",
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          bgcolor: color,
          boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
          position: "relative",
          transition: "scale 0.2s",
          animation: popping ? `${pop} 850ms ease-out both` : "none",
          "&::after": {
            content: '""',
            position: "absolute",
            top: "10%",
            left: "25%",
            width: "30%",
            height: "15%",
            borderRadius: "50%",
            transform: "rotate(-20deg)",
            background:
              "radial-gradient(ellipse, rgba(255,255,255,0.4) 0%, transparent 100%)",
          },
          "@media (prefers-reduced-motion: reduce)": {
            animationDuration: "1ms",
            transition: "none",
          },
        }}
      />
      {popping &&
        directions.map(({ x, y }, index) => (
          <Box
            component="span"
            aria-hidden="true"
            key={index}
            sx={{
              "--burst-x": x,
              "--burst-y": y,
              position: "absolute",
              top: "calc(50% - 4px)",
              left: "calc(50% - 4px)",
              width: index % 2 ? 6 : 9,
              height: index % 2 ? 6 : 9,
              borderRadius: "50%",
              bgcolor: color,
              pointerEvents: "none",
              animation: `${scatter} 650ms ease-out both`,
              "@media (prefers-reduced-motion: reduce)": { display: "none" },
            }}
          />
        ))}
    </Box>
  );
}
