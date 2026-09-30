import { Box } from "@mui/material";
import DecorativeFlower from "../DecorativeFlower";
import { useRandomFlowers } from "../../hooks/useRandomFlowers";

export function FlowerBackground({
  count = 60,
  area = "full",
  opacity = 0.08,
}) {
  const flowers = useRandomFlowers(count, area);
  return (
    <Box
      aria-hidden="true"
      sx={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {flowers.map((flower) => (
        <DecorativeFlower
          key={flower.id}
          {...flower}
          opacity={opacity}
          style={{ top: flower.top, left: flower.left }}
        />
      ))}
    </Box>
  );
}
