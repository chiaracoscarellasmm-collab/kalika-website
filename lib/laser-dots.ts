export type ZoneColor = "blue" | "green" | "red";

export const LASER_IMG_W = 1536;
export const LASER_IMG_H = 1024;

export const LASER_COLORS: Record<ZoneColor, string> = {
  blue: "#4a7ba6",
  green: "#5f8f70",
  red: "#c56b6b",
};

export const LASER_DOTS: { c: ZoneColor; x: number; y: number; r: number }[] = [
  { c: "blue", x: 235, y: 282, r: 7 },
  { c: "blue", x: 390, y: 282, r: 7 },
  { c: "blue", x: 858, y: 275, r: 7 },
  { c: "blue", x: 1042, y: 274, r: 7 },
  { c: "green", x: 226, y: 350, r: 12 },
  { c: "green", x: 311, y: 402, r: 11 },
  { c: "green", x: 397, y: 350, r: 12 },
  { c: "green", x: 533, y: 499, r: 11 },
  { c: "green", x: 625, y: 499, r: 11 },
  { c: "green", x: 946, y: 262, r: 12 },
  { c: "green", x: 947, y: 386, r: 12 },
  { c: "green", x: 1250, y: 257, r: 13 },
  { c: "red", x: 272, y: 752, r: 20 },
  { c: "red", x: 310, y: 504, r: 14 },
  { c: "red", x: 348, y: 751, r: 20 },
  { c: "red", x: 541, y: 752, r: 20 },
  { c: "red", x: 613, y: 752, r: 20 },
  { c: "red", x: 841, y: 334, r: 14 },
  { c: "red", x: 892, y: 755, r: 20 },
  { c: "red", x: 947, y: 499, r: 14 },
  { c: "red", x: 1004, y: 755, r: 20 },
  { c: "red", x: 1058, y: 334, r: 15 },
  { c: "red", x: 1195, y: 755, r: 20 },
  { c: "red", x: 1205, y: 484, r: 11 },
  { c: "red", x: 1294, y: 483, r: 11 },
  { c: "red", x: 1305, y: 754, r: 20 },
];
