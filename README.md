# Letters.

Anonimowa przestrzeń nadziei. Platforma do pisania i czytania listów, które mogą uratować komuś dzień.

## O projekcie

Letters. to miejsce, gdzie ludzie anonimowo dzielą się swoimi listami — osobistymi tekstami nadziei, przebaczenia, wdzięczności i siły. Celem projektu jest walka z samotnością i pomoc osobom w kryzysie.

## Stack

- Next.js 16 (Static Export)
- React 19 + TypeScript
- Tailwind CSS
- Framer Motion
- DM Sans (Google Fonts)

## Uruchomienie

```bash
npm install
npm run dev
```

Otwórz [http://localhost:3000](http://localhost:3000)

## Dodawanie listów

Listy przechowywane są jako pliki JSON w `content/letters/published/`. Każdy list to osobny plik:

```json
{
  "id": "2026-04-15-001",
  "greeting": "Do kogoś —",
  "body": "Treść listu...",
  "author": "Anonim",
  "createdAt": "2026-04-15T10:00:00Z",
  "status": "published"
}
```

## Moderacja

Panel moderacji dostępny pod `/admin`. Domyślne hasło: `letters2026`.

Listy przesłane przez formularz trafiają do localStorage i są widoczne w panelu admina.

## Pomoc

Jeśli jesteś w kryzysie, zadzwoń:
- **Telefon Zaufania:** 116 123
- **Centrum Wsparcia:** 800 70 2222

## Licencja

MIT
