import React from 'react';
import type { NextPage } from 'next';
import Color from 'color';

const tileWidth = 8;
const totalPlanes = 1300;
const blendSteps = 20;

function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function lerp(v0: number, v1: number, t: number): number {
  return v0 * (1 - t) + v1 * t;
}

function Plane(props: any): JSX.Element {
  const { width, height, x, y } = props;

  const points = [
    {
      x: 0,
      y: 0,
    },
    {
      x: width * tileWidth,
      y: 0,
    },
    {
      x: width * tileWidth,
      y: height * tileWidth,
    },
    {
      x: 0,
      y: height * tileWidth,
    },
  ];

  const blend = Array.apply(null, Array(blendSteps)).map((v, index) => {
    const step = index + 1;
    const stepX = lerp(x, 500, step / blendSteps);
    const stepY = lerp(y, 600, step / blendSteps);
    const scale = lerp(1, 0, step / blendSteps);
    const color = Color('#ffffff');
    const fill = color.darken(step / blendSteps).hex();
    return { x: stepX, y: stepY, scale, fill };
  });

  return (
    <g>
      <g>
        {blend
          .splice(0, blend.length - 5)
          .reverse()
          .map((b, i) => {
            return (
              <g key={i} transform={`translate(${b.x}, ${b.y}), scale(${b.scale})`}>
                <polygon
                  vectorEffect="non-scaling-stroke"
                  stroke="#000"
                  // fill="#fad2e1"
                  fill={b.fill}
                  strokeWidth="1px"
                  strokeLinejoin="round"
                  points={`${points[0].x},${points[0].y} ${points[1].x},${points[1].y} ${points[2].x},${points[2].y} ${points[3].x},${points[3].y}`}
                />
              </g>
            );
          })}
      </g>
      <g transform={`translate(${x},${y})`}>
        <polygon
          stroke="#000"
          fill="#fff"
          strokeWidth="1px"
          strokeLinejoin="round"
          points={`${points[0].x},${points[0].y} ${points[1].x},${points[1].y} ${points[2].x},${points[2].y} ${points[3].x},${points[3].y}`}
        />
      </g>
    </g>
  );
}

const Planes: NextPage = () => {
  const [force, setForce] = React.useState(false);

  const planes = Array.apply(null, Array(totalPlanes)).map((v, i) => {
    const width = random(1, 5);
    const height = random(1, 5);

    const x = random(100, 850);
    const y = random(50, 1100);

    return { width, height, x, y };
  });

  // Sort so outer planes are first
  const sorted = planes.sort((a, b) => {
    const ax = Math.abs(500 - a.x);
    const ay = Math.abs(500 - a.y);
    const totalA = ax + ay;
    const bx = Math.abs(600 - b.x);
    const by = Math.abs(600 - b.y);
    const totalB = bx + by;
    return totalA < totalB ? 1 : -1;
  });

  // MAYBE Remove planes rendered in the center
  const filtered = sorted.filter(({ x, y }) => {
    const maybe = Math.random() > 0.9;
    return Math.abs(500 - x) + Math.abs(600 - y) < 100 ? maybe : true;
  });

  return (
    <div>
      <button onClick={() => setForce(!force)}>refresh</button>
      <main>
        <svg viewBox="0 0 1000 1200" width="1000px" height="1000px">
          {filtered.map((plane, i) => (
            <Plane key={i} {...plane} />
          ))}
        </svg>
      </main>
    </div>
  );
};

export default Planes;
