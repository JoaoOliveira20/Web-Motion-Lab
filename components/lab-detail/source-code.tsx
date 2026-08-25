import { readFile } from "node:fs/promises";
import { join } from "node:path";

async function SourceFile({ filePath }: { filePath: string }) {
  const code = await readFile(
    join(process.cwd(), "components", filePath),
    "utf-8",
  );

  return (
    <div className="border border-border">
      <p className="border-b border-border px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] text-muted">
        components/{filePath}
      </p>
      <pre
        tabIndex={0}
        className="overflow-x-auto bg-surface p-4 text-xs leading-relaxed"
      >
        <code className="font-mono">{code}</code>
      </pre>
    </div>
  );
}

export function SourceCode({ files }: { files: string[] }) {
  return (
    <div className="flex flex-col gap-4">
      {files.map((filePath) => (
        <SourceFile key={filePath} filePath={filePath} />
      ))}
    </div>
  );
}
