import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ApiReferenceList, type ApiReference } from "@/components/lab-detail/api-reference-list";
import { CopyCodeButton } from "@/components/lab-detail/copy-code-button";

export interface SourceFileEntry {
  filePath: string;
  dir?: "components" | "hooks" | "lib";
  apis?: ApiReference[];
  copyable?: boolean;
}

async function SourceFile({ filePath, dir = "components", apis, copyable }: SourceFileEntry) {
  const code = await readFile(
    dir === "hooks"
      ? join(process.cwd(), "hooks", filePath)
      : dir === "lib"
        ? join(process.cwd(), "lib", filePath)
        : join(process.cwd(), "components", filePath),
    "utf-8",
  );

  return (
    <details className="group border border-border">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 font-mono text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:text-foreground [&::-webkit-details-marker]:hidden">
        <span>
          {dir}/{filePath}
        </span>
        <span aria-hidden className="text-base leading-none group-open:rotate-45">
          +
        </span>
      </summary>
      <div className="border-t border-border p-4">
        {apis && apis.length > 0 ? (
          <div className="mb-4">
            <ApiReferenceList apis={apis} />
          </div>
        ) : null}
        <div className="relative">
          <pre
            tabIndex={0}
            className="overflow-x-auto bg-surface p-4 pr-14 text-xs leading-relaxed"
          >
            <code className="font-mono">{code}</code>
          </pre>
          {copyable ? <CopyCodeButton code={code} /> : null}
        </div>
      </div>
    </details>
  );
}

export function SourceCode({ files }: { files: SourceFileEntry[] }) {
  return (
    <div className="flex flex-col gap-4">
      {files.map((file) => (
        <SourceFile key={file.filePath} {...file} />
      ))}
    </div>
  );
}
