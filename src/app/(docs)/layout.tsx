import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { buttonVariants } from "fumadocs-ui/components/ui/button";
import { MessageCircleIcon } from "lucide-react";
import { AISearch, AISearchPanel, AISearchTrigger } from "@/components/ai/search";
import { baseOptions } from "@/lib/layout.shared";
import { cn } from "@/lib/cn";
import { source } from "@/lib/source";

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      // Derive a product/root switcher from each `root: true` folder
      // (Qeet ID / People / Logs). `auto` keeps it in the sidebar.
      tabMode="auto"
      {...baseOptions()}
    >
      <AISearch>
        <AISearchPanel />
        <AISearchTrigger
          position="float"
          className={cn(
            buttonVariants({
              variant: "secondary",
              className: "text-fd-muted-foreground rounded-2xl",
            }),
          )}
        >
          <MessageCircleIcon className="size-4.5" />
          Ask AI
        </AISearchTrigger>
      </AISearch>

      {children}
    </DocsLayout>
  );
}
