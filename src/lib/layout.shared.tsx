import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import {
  BellRingIcon,
  ComponentIcon,
  CreditCardIcon,
  FingerprintIcon,
  ScrollTextIcon,
  UsersIcon,
} from "lucide-react";
import { QeetMark } from "@/components/qeet-mark";
import { appName, gitConfig, productUrl } from "./shared";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="flex items-center gap-2 font-semibold tracking-tight">
          {/* Theme-adaptive via currentColor: dark bowl on light, light bowl on dark; orange tail constant. */}
          <QeetMark className="size-7 text-fd-foreground" />
          <span className="text-[15px]">{appName}</span>
        </span>
      ),
      url: "/",
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
    links: [
      {
        type: "main",
        text: "Qeet ID",
        url: "/id",
        active: "nested-url",
        icon: <FingerprintIcon />,
      },
      {
        type: "main",
        text: "Qeetrix",
        url: "/qeetrix",
        active: "nested-url",
        icon: <ComponentIcon />,
      },
      {
        type: "main",
        text: "People",
        url: "/people",
        active: "nested-url",
        icon: <UsersIcon />,
      },
      {
        type: "main",
        text: "Logs",
        url: "/logs",
        active: "nested-url",
        icon: <ScrollTextIcon />,
      },
      {
        type: "main",
        text: "Notify",
        url: "/notify",
        active: "nested-url",
        icon: <BellRingIcon />,
      },
      {
        type: "main",
        text: "Pay",
        url: "/pay",
        active: "nested-url",
        icon: <CreditCardIcon />,
      },
      {
        type: "main",
        text: "Website",
        url: productUrl,
        external: true,
      },
    ],
  };
}
