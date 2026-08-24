import type { ReactNode } from "react";

export default function LabLayout({ children }: { children: ReactNode }) {
  return <div className="py-12 md:py-16">{children}</div>;
}
