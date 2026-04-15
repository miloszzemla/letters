import { getPublishedLetters } from "@/lib/letters";
import HomePage from "@/components/HomePage";
import Stats from "@/components/Stats";

export default function Home() {
  const letters = getPublishedLetters();

  return (
    <HomePage letters={letters}>
      <Stats letterCount={letters.length} />
      {/* Grid will go here later */}
    </HomePage>
  );
}
