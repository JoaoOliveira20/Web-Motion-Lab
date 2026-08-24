import { Hero } from "@/components/home/hero";
import { ExperimentsGrid } from "@/components/home/experiments-grid";
import { LibraryStack } from "@/components/home/library-stack";
import { FeaturedExperiment } from "@/components/home/featured-experiment";

export default function Home() {
  return (
    <>
      <Hero />
      <ExperimentsGrid />
      <LibraryStack />
      <FeaturedExperiment />
    </>
  );
}
