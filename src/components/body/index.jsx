import { useEffect, useRef } from "react";

function SpiralPath() {
  const roundTo = (input, sigdigs) => {
    return Math.round(input * Math.pow(10, sigdigs)) / Math.pow(10, sigdigs);
  };

  const makeSpiralPoints = (
    origin,
    revolutions,
    pointCount,
    clockwise,
    padding
  ) => {
    const direction = clockwise ? 1 : -1;
    const circ = padding / (2 * Math.PI);
    const step = (2 * Math.PI * revolutions) / pointCount;
    const points = [];
    let angle = null;
    let x = null;
    let y = null;
    for (let i = 0; i <= pointCount; i++) {
      angle = direction * step * i;
      x = roundTo(circ * angle * Math.cos(angle) + origin.x, 2);
      y = roundTo(circ * angle * Math.sin(angle) + origin.y, 2);
      points.push(x + " " + y);
    }

    return "M " + points.shift() + " S " + points.join(" ");
  };

  const pathRef = useRef(null);

  useEffect(() => {
    const path = pathRef.current;
    const d = makeSpiralPoints({ x: 75, y: 75 }, 4, 2048, false, 25);
    if (path) {
      path.setAttribute("d", d);
    }
  }, []);

  return (
    <svg width="150" height="150">
      <path ref={pathRef} />
    </svg>
  );
}

export default SpiralPath;
