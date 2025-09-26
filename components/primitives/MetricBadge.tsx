import Badge from "@/components/primitives/Badge";

type MetricBadgeProps = {
  value: string | number;
  unit?: string;
  label?: string;
  direction?: "up" | "down";
};

export default function MetricBadge({ value, unit, label, direction }: MetricBadgeProps) {
  const arrow = direction === "down" ? "v" : direction === "up" ? "^" : null;
  return (
    <Badge tone="emerald" size="sm" aria-label={label ? `${label}: ${value}${unit ?? ""}` : undefined}>
      {arrow ? <span aria-hidden>{arrow}</span> : null}
      <strong>
        {value}
        {unit}
      </strong>
      {label ? (
        <>
          &nbsp;
          <span>{label}</span>
        </>
      ) : null}
    </Badge>
  );
}
