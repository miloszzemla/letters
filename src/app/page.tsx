import { getPublishedLetters } from "@/lib/letters";
import HomePage from "@/components/HomePage";
import Stats from "@/components/Stats";
import LetterGrid from "@/components/LetterGrid";

export default function Home() {
  const letters = getPublishedLetters();

  return (
    <HomePage letters={letters}>
      <Stats letterCount={letters.length} />
      <LetterGrid letters={letters} />
    </HomePage>
  );
}
