import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { AdminHeader } from "@/components/admin/AdminHeader";
import { RequireAdminSession } from "@/components/admin/RequireAdminSession";
import { RankBadge } from "@/components/pixel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { GlobalLeaderboardEntry, LeaderboardEntry } from "@/core";
import { getLeaderboardService } from "@/core";

export const Route = createFileRoute("/admin/leaderboard")({
  head: () => ({
    meta: [{ title: "Clasificación — Panel admin" }],
  }),
  component: AdminLeaderboard,
});

const BOARD_SIZE = 20;

function BoardTable({
  entries,
  isLoading,
}: {
  entries: (GlobalLeaderboardEntry | LeaderboardEntry)[] | undefined;
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <p
        role="status"
        className="animate-px-blink py-12 text-center text-2xl text-muted-foreground"
      >
        Cargando...
      </p>
    );
  }
  if (!entries || entries.length === 0) {
    return (
      <p className="py-12 text-center text-2xl text-muted-foreground">Todavía no hay puntajes.</p>
    );
  }
  return (
    <ol className="space-y-5">
      {entries.map((entry) => (
        <li
          key={entry.userId}
          className={`px-frame px-drop flex items-center gap-4 px-4 py-3 sm:gap-5 sm:px-6 ${
            entry.rank === 1 ? "px-c-gold" : "px-c-deep"
          }`}
        >
          <RankBadge rank={entry.rank} scale={4} className="w-12 shrink-0 sm:w-14" />
          <span className="text-3xl leading-none" aria-hidden>
            {entry.emoji}
          </span>
          <span className="min-w-0 flex-1 truncate text-2xl font-semibold sm:text-3xl">
            {entry.name}
          </span>
          <span
            className={`shrink-0 font-pixel text-lg font-bold sm:text-2xl ${
              entry.rank === 1 ? "text-ink" : "text-gold"
            }`}
          >
            {entry.points} pts
          </span>
        </li>
      ))}
    </ol>
  );
}

function AdminLeaderboard() {
  const { data: globalEntries, isLoading: isGlobalLoading } = useQuery({
    queryKey: ["leaderboard", "global", BOARD_SIZE],
    queryFn: () => getLeaderboardService().getGlobalLeaderboard(BOARD_SIZE),
  });

  const { data: templeEntries, isLoading: isTempleLoading } = useQuery({
    queryKey: ["leaderboard", "temple-of-knowledge", BOARD_SIZE],
    queryFn: () => getLeaderboardService().getLeaderboard("temple-of-knowledge", BOARD_SIZE),
  });

  const { data: whackEntries, isLoading: isWhackLoading } = useQuery({
    queryKey: ["leaderboard", "whack-a-question", BOARD_SIZE],
    queryFn: () => getLeaderboardService().getLeaderboard("whack-a-question", BOARD_SIZE),
  });

  return (
    <RequireAdminSession>
      {(session) => (
        <div className="min-h-screen">
          <AdminHeader username={session.username} />
          <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
            <h1 className="px-title mb-8 text-balance text-center text-[1.5rem] sm:text-[2.5rem]">
              Tabla de clasificación
            </h1>
            <Tabs defaultValue="global">
              <TabsList className="mb-6 justify-center">
                <TabsTrigger value="global">General</TabsTrigger>
                <TabsTrigger value="temple-of-knowledge">Temple of Knowledge</TabsTrigger>
                <TabsTrigger value="whack-a-question">Whack a game</TabsTrigger>
              </TabsList>
              <TabsContent value="global">
                <BoardTable entries={globalEntries} isLoading={isGlobalLoading} />
              </TabsContent>
              <TabsContent value="temple-of-knowledge">
                <BoardTable entries={templeEntries} isLoading={isTempleLoading} />
              </TabsContent>
              <TabsContent value="whack-a-question">
                <BoardTable entries={whackEntries} isLoading={isWhackLoading} />
              </TabsContent>
            </Tabs>
          </main>
        </div>
      )}
    </RequireAdminSession>
  );
}
