import Badge from "@/components/primitives/Badge";

type MetricBadgeProps = {
  value: string | number;
  unit?: string;
  label?: string;
  direction?: "up" | "down";
};

export default function MetricBadge({ value, unit, label }: MetricBadgeProps) {
  return (
    <Badge tone="emerald" size="sm" aria-label={label ? `${label}: ${value}${unit ?? ""}` : undefined}>
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
