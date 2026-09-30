import { useMemo } from "react";

const colors = [
  "#F7DE50",
  "#EBA258",
  "#A4CCEE",
  "#AEB265",
  "#EAA0A7",
  "#99A0D9",
] as const;

// A seeded pattern keeps decorations stable across language/page renders.
export function useRandomFlowers(count = 5, area = "full") {
  return useMemo(() => {
    const seed = Array.from(area).reduce(
      (sum, char) => sum + char.charCodeAt(0),
      1,
    );
    const number = (id: number, salt: number, min: number, max: number) => {
      const value = Math.abs(
        Math.sin(seed + id * 127.1 + salt * 311.7) * 43758.5453,
      );
      return min + Math.floor((value % 1) * (max - min + 1));
    };
    return Array.from({ length: count }, (_, id) => ({
      id,
      color: colors[number(id, 1, 0, colors.length - 1)] ?? colors[0],
      size: number(id, 2, 30, 80),
      rotate: number(id, 3, -45, 45),
      top: `${number(id, 4, 0, 100)}%`,
      left: `${number(id, 5, 0, 100)}%`,
    }));
  }, [count, area]);
}
