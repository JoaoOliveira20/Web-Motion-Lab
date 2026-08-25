import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ApiReferenceList, type ApiReference } from "@/components/lab-detail/api-reference-list";

export interface SourceFileEntry {
  filePath: string;
  apis?: ApiReference[];
}

async function SourceFile({ filePath, apis }: SourceFileEntry) {
  const code = await readFile(
    join(process.cwd(), "components", filePath),
    "utf-8",
  );

  return (
    <details className="group border border-border">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 font-mono text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:text-foreground [&::-webkit-details-marker]:hidden">
        <span>components/{filePath}</span>
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
        <pre
          tabIndex={0}
          className="overflow-x-auto bg-surface p-4 text-xs leading-relaxed"
        >
          <code className="font-mono">{code}</code>
        </pre>
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
