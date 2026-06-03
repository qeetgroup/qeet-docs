import type { ComponentProps, ReactNode } from "react";
import {
  CalloutContainer,
  CalloutDescription,
  CalloutTitle,
  type CalloutType,
} from "fumadocs-ui/components/callout";
import {
  CircleCheckIcon,
  InfoIcon,
  LightbulbIcon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Friendly variant aliases on top of fumadocs' callout types. Existing content
 * uses `type="info"` / `type="warn"` (fumadocs types) — those still work; the
 * extra aliases (`tip`, `danger`) map onto fumadocs types and get a brand icon.
 */
type Variant = "info" | "tip" | "warn" | "danger" | "success" | CalloutType;

const MAP: Record<
  string,
  { type: CalloutType; icon: ReactNode; accent: string }
> = {
  info: { type: "info", icon: <InfoIcon />, accent: "" },
  tip: { type: "success", icon: <LightbulbIcon />, accent: "text-brand-text" },
  idea: { type: "idea", icon: <LightbulbIcon />, accent: "" },
  warn: { type: "warn", icon: <TriangleAlertIcon />, accent: "" },
  warning: { type: "warn", icon: <TriangleAlertIcon />, accent: "" },
  danger: { type: "error", icon: <OctagonXIcon />, accent: "" },
  error: { type: "error", icon: <OctagonXIcon />, accent: "" },
  success: { type: "success", icon: <CircleCheckIcon />, accent: "" },
};

interface CalloutProps extends Omit<ComponentProps<"div">, "title"> {
  type?: Variant;
  title?: ReactNode;
  icon?: ReactNode;
}

export function Callout({ type = "info", title, icon, children, className, ...props }: CalloutProps) {
  const cfg = MAP[type] ?? MAP.info;

  return (
    <CalloutContainer
      type={cfg.type}
      icon={icon ?? cfg.icon}
      className={cn("rounded-xl", className)}
      {...props}
    >
      {title ? <CalloutTitle className={cfg.accent}>{title}</CalloutTitle> : null}
      <CalloutDescription>{children}</CalloutDescription>
    </CalloutContainer>
  );
}
