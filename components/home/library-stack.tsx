import { libraries } from "@/data/libraries";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/home/section-heading";

export function LibraryStack() {
  return (
    <section id="bibliotecas" className="border-b border-border py-20">
      <Container>
        <SectionHeading
          index="03"
          eyebrow="Stack"
          title="Bibliotecas do laboratório"
          description="Cada ferramenta tem um propósito específico dentro da pilha — nenhuma é usada só para constar."
        />
        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse font-mono text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-[0.14em] text-muted">
                <th className="py-3 pr-4 font-normal">Biblioteca</th>
                <th className="py-3 pr-4 font-normal">Categoria</th>
                <th className="py-3 pr-4 font-normal">Propósito</th>
                <th className="py-3 font-normal">Alternativa</th>
              </tr>
            </thead>
            <tbody>
              {libraries.map((library) => (
                <tr
                  key={library.slug}
                  className="border-b border-border/60 last:border-b-0"
                >
                  <td className="py-3 pr-4">{library.name}</td>
                  <td className="py-3 pr-4 text-muted">{library.category}</td>
                  <td className="py-3 pr-4 text-muted">{library.purpose}</td>
                  <td className="py-3 text-muted">{library.comparison}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
}
