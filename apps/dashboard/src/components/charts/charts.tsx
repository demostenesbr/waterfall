import { Fragment, type ReactNode } from "react";

export type ChartSeries = {
  key: string;
  label: string;
  color: string;
  dashed?: boolean;
  area?: boolean;
  strokeWidth?: number;
};

type Row = Record<string, string | number>;

const WIDTH = 600;
const HEIGHT = 260;
const PAD = { top: 12, right: 12, bottom: 28, left: 36 };
const innerWidth = WIDTH - PAD.left - PAD.right;
const innerHeight = HEIGHT - PAD.top - PAD.bottom;

function niceMax(value: number) {
  if (value <= 0) return 10;
  const magnitude = 10 ** Math.floor(Math.log10(value));
  const step = magnitude / 2;
  return Math.ceil(value / step) * step;
}

type Scale = {
  y: (value: number) => number;
  x: (index: number) => number;
  band: number;
};

function Frame({
  data,
  xKey,
  series,
  children,
}: {
  data: Row[];
  xKey: string;
  series: ChartSeries[];
  children: (scale: Scale) => ReactNode;
}) {
  const peak = Math.max(
    0,
    ...data.flatMap((row) => series.map((item) => Number(row[item.key]) || 0)),
  );
  const max = niceMax(peak);
  const band = innerWidth / Math.max(data.length, 1);
  const y = (value: number) =>
    PAD.top + innerHeight - (value / max) * innerHeight;
  const x = (index: number) => PAD.left + band * index + band / 2;
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((ratio) => max * ratio);
  return (
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="h-full w-full" role="img">
      {ticks.map((tick) => (
        <Fragment key={tick}>
          <line
            x1={PAD.left}
            x2={WIDTH - PAD.right}
            y1={y(tick)}
            y2={y(tick)}
            stroke="var(--color-line)"
            strokeDasharray="3 3"
          />
          <text
            x={PAD.left - 8}
            y={y(tick) + 4}
            textAnchor="end"
            fontSize={11}
            fill="var(--color-ink-muted)"
          >
            {Math.round(tick)}
          </text>
        </Fragment>
      ))}
      {data.map((row, index) => (
        <text
          key={String(row[xKey])}
          x={x(index)}
          y={HEIGHT - 8}
          textAnchor="middle"
          fontSize={11}
          fill="var(--color-ink-muted)"
        >
          {row[xKey]}
        </text>
      ))}
      {children({ y, x, band })}
    </svg>
  );
}

function Legend({ series }: { series: ChartSeries[] }) {
  return (
    <ul className="mt-2 flex flex-wrap justify-center gap-4 text-xs text-ink-muted">
      {series.map((item) => (
        <li key={item.key} className="flex items-center gap-1.5">
          <span
            className="size-2.5 rounded-sm"
            style={{ background: item.color }}
          />
          {item.label}
        </li>
      ))}
    </ul>
  );
}

type ChartProps = {
  data: Row[];
  xKey: string;
  series: ChartSeries[];
  legend?: boolean;
};

export function LineChart({ data, xKey, series, legend = false }: ChartProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="min-h-0 flex-1">
        <Frame data={data} xKey={xKey} series={series}>
          {({ x, y }) =>
            series.map((item) => {
              const points = data.map(
                (row, index) => `${x(index)},${y(Number(row[item.key]) || 0)}`,
              );
              const baseline = y(0);
              return (
                <g key={item.key}>
                  {item.area && (
                    <polygon
                      points={`${x(0)},${baseline} ${points.join(" ")} ${x(data.length - 1)},${baseline}`}
                      fill={item.color}
                      opacity={0.15}
                    />
                  )}
                  <polyline
                    points={points.join(" ")}
                    fill="none"
                    stroke={item.color}
                    strokeWidth={item.strokeWidth ?? 2.5}
                    strokeDasharray={item.dashed ? "5 5" : undefined}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                  {!item.dashed &&
                    data.map((row, index) => (
                      <circle
                        key={String(row[xKey])}
                        cx={x(index)}
                        cy={y(Number(row[item.key]) || 0)}
                        r={3.5}
                        fill="white"
                        stroke={item.color}
                        strokeWidth={2}
                      >
                        <title>{`${item.label} · ${row[xKey]}: ${row[item.key]}`}</title>
                      </circle>
                    ))}
                </g>
              );
            })
          }
        </Frame>
      </div>
      {legend && <Legend series={series} />}
    </div>
  );
}

export function BarChart({ data, xKey, series, legend = false }: ChartProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="min-h-0 flex-1">
        <Frame data={data} xKey={xKey} series={series}>
          {({ x, y, band }) =>
            data.map((row, index) => {
              const group = band * 0.7;
              const barWidth = group / series.length;
              return (
                <g key={String(row[xKey])}>
                  {series.map((item, seriesIndex) => {
                    const value = Number(row[item.key]) || 0;
                    return (
                      <rect
                        key={item.key}
                        x={x(index) - group / 2 + barWidth * seriesIndex + 1}
                        y={y(value)}
                        width={Math.max(barWidth - 2, 1)}
                        height={y(0) - y(value)}
                        rx={4}
                        fill={item.color}
                      >
                        <title>{`${item.label} · ${row[xKey]}: ${value}`}</title>
                      </rect>
                    );
                  })}
                </g>
              );
            })
          }
        </Frame>
      </div>
      {legend && <Legend series={series} />}
    </div>
  );
}

export type DonutSlice = { name: string; value: number; color: string };

export function DonutChart({ data }: { data: DonutSlice[] }) {
  const total = data.reduce((sum, slice) => sum + slice.value, 0) || 1;
  const radius = 66;
  const circumference = 2 * Math.PI * radius;
  const gap = 4;
  const slices = data.map((slice, index) => ({
    ...slice,
    length: (slice.value / total) * circumference,
    offset: data
      .slice(0, index)
      .reduce((sum, item) => sum + (item.value / total) * circumference, 0),
  }));
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" role="img">
      <g transform="rotate(-90 100 100)">
        {slices.map((slice) => {
          const dash = Math.max(slice.length - gap, 0);
          return (
            <circle
              key={slice.name}
              cx={100}
              cy={100}
              r={radius}
              fill="none"
              stroke={slice.color}
              strokeWidth={22}
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={-slice.offset}
            >
              <title>{`${slice.name}: ${slice.value}`}</title>
            </circle>
          );
        })}
      </g>
    </svg>
  );
}
