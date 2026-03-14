import React from "react";

type Planet = {
  id: string;
  label: string;
};

export type HouseData = {
  houseNumber: number;
  houseName?: string;
  planets?: Planet[];
};

export interface KundliProps {
  size?: number;
  houses: HouseData[];
  strokeColor?: string;
  textColor?: string;
}

type Point = { x: number; y: number };

function centroid(points: Point[]): Point {
  const x = points.reduce((sum, p) => sum + p.x, 0) / points.length;
  const y = points.reduce((sum, p) => sum + p.y, 0) / points.length;
  return { x, y };
}

export default function NorthIndianKundli({
  size = 500,
  houses,
  strokeColor = "black",
  textColor = "black",
}: KundliProps) {
  const mid = size / 2;

  const top = { x: mid, y: 0 };
  const right = { x: size, y: mid };
  const bottom = { x: mid, y: size };
  const left = { x: 0, y: mid };
  const center = { x: mid, y: mid };

  const tl = { x: 0, y: 0 };
  const tr = { x: size, y: 0 };
  const bl = { x: 0, y: size };
  const br = { x: size, y: size };

  const housePolygons: Record<number, Point[]> = {
    1: [top, right, center],
    2: [tl, top, center],
    3: [tl, left, center],
    4: [left, bl, center],
    5: [bl, bottom, center],
    6: [bottom, br, center],
    7: [right, bottom, center],
    8: [tr, right, center],
    9: [br, bottom, right],
    10: [bottom, center, right],
    11: [top, tr, center],
    12: [tl, center, top],
  };

  const houseNumberPositions: Record<number, { x: number; y: number }> = {
    // center
    1: { x: mid, y: mid - size * 0.05 },

    // top row
    2: { x: mid - size * 0.25, y: size * 0.12 },
    12: { x: mid, y: size * 0.05 },
    11: { x: mid + size * 0.25, y: size * 0.12 },

    // left side
    3: { x: size * 0.12, y: mid },
    4: { x: size * 0.2, y: mid + size * 0.18 },
    5: { x: size * 0.35, y: size * 0.9 },

    // bottom
    6: { x: mid, y: size * 0.93 },
    7: { x: mid + size * 0.15, y: size * 0.8 },
    8: { x: size * 0.85, y: size * 0.7 },

    // right side
    9: { x: size * 0.75, y: size * 0.82 },
    10: { x: size * 0.65, y: mid },
  };

  const houseMap = Object.fromEntries(houses.map((h) => [h.houseNumber, h]));

  return (
    <div className="flex justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Outer square */}
        <rect
          x="0"
          y="0"
          width={size}
          height={size}
          fill="white"
          stroke={strokeColor}
          strokeWidth="2"
        />

        {/* Inner diamond */}
        <polygon
          points={`${mid},0 ${size},${mid} ${mid},${size} 0,${mid}`}
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
        />

        {/* Diagonal connectors */}
        <line x1={0} y1={0} x2={mid} y2={mid} stroke={strokeColor} />
        <line x1={size} y1={0} x2={mid} y2={mid} stroke={strokeColor} />
        <line x1={0} y1={size} x2={mid} y2={mid} stroke={strokeColor} />
        <line x1={size} y1={size} x2={mid} y2={mid} stroke={strokeColor} />

        {/* House Numbers */}
        {Object.entries(houseNumberPositions).map(([house, pos]) => (
          <text
            key={house}
            x={pos.x}
            y={pos.y}
            textAnchor="middle"
            fill={textColor}
            fontSize="18"
            fontWeight="600"
          >
            {house}
          </text>
        ))}

        {/* Planets / Labels */}
        {Object.entries(housePolygons).map(([houseNum, points]) => {
          const centroidPoint = centroid(points);
          const house = houseMap[Number(houseNum)];

          if (!house) return null;

          return (
            <g key={houseNum}>
              {house.houseName && (
                <text
                  x={centroidPoint.x}
                  y={centroidPoint.y - 10}
                  textAnchor="middle"
                  fill={textColor}
                  fontSize="16"
                  fontWeight="600"
                >
                  {house.houseName}
                </text>
              )}

              {house.planets?.map((planet, i) => (
                <text
                  key={planet.id}
                  x={centroidPoint.x}
                  y={centroidPoint.y + i * 16}
                  textAnchor="middle"
                  fill={textColor}
                  fontSize="14"
                >
                  {planet.label}
                </text>
              ))}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
