import DottedMap from "dotted-map";
import { cn } from "@/components/ui/primitives";
import { GlobeCanvas } from "./GlobeCanvas";

/**
 * Rotating dotted globe. Land is sampled on a lat/lng grid at build time (kept
 * where it snaps onto a dotted-map land dot); the browser only rotates and
 * draws it (see GlobeCanvas).
 */
const STEP = 2.6;
const grid = new DottedMap({ height: 120, grid: "vertical" });
const landSet = new Set(grid.getPoints().map((p) => `${p.x},${p.y}`));

const LAND: [number, number][] = [];
for (let lat = -60; lat <= 80; lat += STEP) {
  for (let lng = -180; lng < 180; lng += STEP) {
    const g = grid.getPin({ lat, lng });
    if (landSet.has(`${g.x},${g.y}`)) LAND.push([Number(lat.toFixed(1)), Number(lng.toFixed(1))]);
  }
}

const CITIES: [number, number][] = [
  [40.7, -74], // New York
  [37.8, -122.4], // San Francisco
  [43.7, -79.4], // Toronto
  [19.4, -99.1], // Mexico City
  [-23.5, -46.6], // São Paulo
  [51.5, -0.1], // London
  [52.5, 13.4], // Berlin
  [25.2, 55.3], // Dubai
  [24.7, 46.7], // Riyadh
  [12.97, 77.6], // Bengaluru
  [1.35, 103.8], // Singapore
  [35.7, 139.7], // Tokyo
  [-33.9, 151.2], // Sydney
  [-26.2, 28], // Johannesburg
];

export function GlobalReach({ className }: { className?: string }) {
  return <GlobeCanvas land={LAND} cities={CITIES} className={cn("aspect-square w-full", className)} />;
}
