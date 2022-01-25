import type { NextPage } from 'next';

function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

type CubeProps = {
  x?: number;
  y?: number;
  height?: number;
  xMod?: number;
  yMod?: number;
};

const isoTan = Math.tan((30 * Math.PI) / 180);
const isoCos = 1 / Math.cos((30 * Math.PI) / 180);

const tileWidth = 13;
const x1 = 0;
const x2 = 1;
const y1 = 0;
const y2 = 1;
const z1 = 0;
const tileHeight = tileWidth * isoTan;
const halfWidth = tileWidth * isoTan;
const halfHeight = tileHeight * isoTan;

function Cube(props: CubeProps): JSX.Element {
  const { x, y, height = 1, xMod = 1, yMod = 1 } = props;
  const z2 = height < 1 ? 1 : height;

  const zHeight1 = z1 * isoCos;
  const zHeight2 = z2 * isoCos;

  const x2Modified = x2 * xMod;
  const y2Modified = y2 * yMod;

  const top = [
    {
      x: (x1 - y1) * halfWidth,
      y: (x1 + y1) * halfHeight - zHeight2 * tileHeight,
    },
    {
      x: (x2Modified - y1) * halfWidth,
      y: (x2Modified + y1) * halfHeight - zHeight2 * tileHeight,
    },
    {
      x: (x2Modified - y2Modified) * halfWidth,
      y: (x2Modified + y2Modified) * halfHeight - zHeight2 * tileHeight,
    },
    {
      x: (x1 - y2Modified) * halfWidth,
      y: (x1 + y2Modified) * halfHeight - zHeight2 * tileHeight,
    },
  ];

  const left = [
    {
      x: top[3].x,
      y: top[3].y,
    },
    {
      x: top[2].x,
      y: top[2].y,
    },
    {
      x: top[2].x,
      y: (x2Modified + y2Modified) * halfHeight - zHeight1 * tileHeight,
    },
    {
      x: top[3].x,
      y: (x1 + y2Modified) * halfHeight - zHeight1 * tileHeight,
    },
  ];

  const right = [
    {
      x: top[2].x,
      y: top[2].y,
    },
    {
      x: top[1].x,
      y: top[1].y,
    },
    {
      x: top[1].x,
      y: (x2Modified + y1) * halfHeight - zHeight1 * tileHeight,
    },
    {
      x: top[2].x,
      y: (x2Modified + y2Modified) * halfHeight - zHeight1 * tileHeight,
    },
  ];

  return (
    <g transform={`translate(${x},${y})`}>
      <polygon
        fill="#fff"
        stroke="#000"
        // fill="#000"
        strokeWidth="1px"
        strokeLinejoin="round"
        points={`${top[0].x},${top[0].y} ${top[1].x},${top[1].y} ${top[2].x},${top[2].y} ${top[3].x},${top[3].y}`}
      />
      <polygon
        fill="#fff"
        // fill="#000"
        // fill="transparent"
        // fill="url(#Gradient1)"
        stroke="#000"
        strokeWidth="1px"
        strokeLinejoin="round"
        points={`${left[0].x},${left[0].y} ${left[1].x},${left[1].y} ${left[2].x},${left[2].y} ${left[3].x},${left[3].y}`}
      />
      <polygon
        fill="#fff"
        // fill="transparent"
        // fill="url(#Gradient1)"
        stroke="#000"
        strokeWidth="1px"
        strokeLinejoin="round"
        points={`${right[0].x},${right[0].y} ${right[1].x},${right[1].y} ${right[2].x},${right[2].y} ${right[3].x},${right[3].y}`}
      />
    </g>
  );
}
const Cubes: NextPage = () => {
  const slice = [];
  const cube = [];
  const perRow = 25;
  const max = perRow * perRow;
  const maxHeight = 90;

  for (let i = 0; i < max; i++) {
    const j = i % perRow; // index down a row
    const k = Math.floor(i / perRow); // index across a row

    slice.push({
      index: i,
      x: 400 + halfWidth * j - k * halfWidth,
      y: 600 + halfHeight * j + k * halfHeight,
      height: 1,
      j,
      k,
    });
  }

  for (let i = 0; i < maxHeight; i++) {
    cube.push({
      slice,
      y: i * -halfHeight * 2,
    });
  }

  return (
    <div>
      <main>
        <svg viewBox="0 0 1000 1000" width="1000px" height="1000px">
          <defs>
            <linearGradient id="Gradient1" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#ffffdd" />
              <stop offset="100%" stopColor="#999922" />
            </linearGradient>
          </defs>
          {cube.map(({ slice, y }, i) => {
            return (
              <g key={i} transform={`translate(0,${y})`}>
                {slice.map(({ index, x, y, height, j, k }) => {
                  let invisible = false;

                  if (i > perRow - 10) {
                    invisible = random(i, 100) / 100 > 0.8;
                  }

                  if (i > perRow) {
                    invisible = random(i, 500) / 100 > 0.5;
                  }

                  if (invisible) {
                    return null;
                  }
                  return <Cube key={index} x={x} y={y} height={height} />;
                })}
              </g>
            );
          })}
        </svg>
      </main>
    </div>
  );
};

export default Cubes;
