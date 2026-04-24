export default function PriceSparkline({
  values = [],
  width = 180,
  height = 64,
  color = "#2563eb",
  fill = "rgba(37,99,235,0.12)",
  strokeWidth = 2.4,
  showGrid = false,
}) {
  if (!values.length) {
    return null;
  }

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const step = width / Math.max(values.length - 1, 1);

  const points = values
    .map((value, index) => {
      const x = index * step;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    })
    .join(" ");

  const areaPath = `M 0 ${height} L ${points
    .split(" ")
    .join(" L ")} L ${width} ${height} Z`;
  const lastPoint = points.split(" ").at(-1)?.split(",") || [width, height / 2];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full overflow-visible">
      {showGrid ? (
        <g className="opacity-40">
          <line x1="0" y1={height / 2} x2={width} y2={height / 2} stroke="#dbe3f0" strokeDasharray="3 5" />
          <line x1="0" y1={height * 0.2} x2={width} y2={height * 0.2} stroke="#eef2f7" />
          <line x1="0" y1={height * 0.8} x2={width} y2={height * 0.8} stroke="#eef2f7" />
        </g>
      ) : null}
      <path d={areaPath} fill={fill} />
      <polyline
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
        points={points}
      />
      <circle cx={lastPoint[0]} cy={lastPoint[1]} r="3.5" fill={color} />
    </svg>
  );
}
