import { createFileRoute, Link } from "@tanstack/react-router";

import { GroundParade, PixelGround, PixelIcon, TempleScene, WhackScene } from "@/components/pixel";
import { usePerfil } from "@/lib/perfil-context";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BooksQuest — Elige tu juego" },
      {
        name: "description",
        content:
          "Elige tu juego en BooksQuest: responde preguntas en Temple of Knowledge o golpea la respuesta correcta en Whack a game.",
      },
      { property: "og:title", content: "BooksQuest — Elige tu juego" },
      {
        property: "og:description",
        content:
          "Dos juegos de preguntas en pixel-art. Elige uno, responde rápido y sube en la tabla de clasificación.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const games = [
  {
    to: "/temple-of-knowledge",
    name: "Temple of Knowledge",
    tagline: "Responde rápido y suma puntos",
    tags: ["Rol", "Preguntas"],
    scene: <TempleScene />,
    bar: "[--px-bar-hi:var(--px-red-hi)] [--px-bar:var(--px-red)]",
    delay: "0.1s",
  },
  {
    to: "/whack-a-question",
    name: "Whack a game",
    tagline: "Golpea rápido y suma puntos",
    tags: ["Arcade", "Preguntas"],
    scene: <WhackScene />,
    bar: "[--px-bar-hi:var(--px-blue-hi)] [--px-bar:var(--px-blue)]",
    delay: "0.25s",
  },
] as const;

function Index() {
  const perfil = usePerfil();

  return (
    <div className="flex min-h-[calc(100dvh-5rem)] flex-col overflow-x-clip">
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center px-4 pb-28 pt-6 sm:pt-8">
        <h1 className="px-title animate-px-pop text-balance text-center text-[1.5rem] leading-snug wrap-anywhere sm:text-[2.5rem]">
          ¡Hola, {perfil.name}!
          <span className="mt-3 block text-star [--px-title:var(--px-star)] sm:mt-4">
            Elige tu juego
          </span>
        </h1>
        <p
          className="animate-px-pop mt-4 text-center text-xl text-muted-foreground sm:mt-5 sm:text-2xl"
          style={{ animationDelay: "0.15s" }}
        >
          Dos aventuras te esperan. ¿Con cuál empiezas?
          <span
            aria-hidden
            className="animate-px-blink ml-2 inline-block h-5 w-3 bg-gold align-middle"
          />
        </p>

        <div className="mt-8 grid w-full gap-10 sm:mt-9 sm:grid-cols-2">
          {games.map((game) => (
            <Link
              key={game.to}
              to={game.to}
              className="animate-px-pop group block focus-visible:outline-offset-4"
              style={{ animationDelay: game.delay }}
            >
              <article className="px-frame px-c-deep px-drop transition-transform duration-100 ease-[steps(2)] group-hover:-translate-y-1">
                <div className={`px-bar ${game.bar}`}>
                  <PixelIcon name="star" scale={2} />
                  <h2 className="leading-snug">{game.name}</h2>
                </div>

                {game.scene}

                <div className="space-y-4 border-t-4 border-ink p-5">
                  <p className="text-xl text-star">{game.tagline}</p>
                  <div className="flex flex-wrap gap-2">
                    {game.tags.map((tag) => (
                      <span key={tag} className="px-frame px-chip px-c-night">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="px-frame px-btn px-btn--lg px-c-gold w-full group-hover:brightness-110">
                    <PixelIcon name="play" scale={2} />
                    ¡Jugar!
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </main>

      <PixelGround>
        <GroundParade />
      </PixelGround>
    </div>
  );
}
