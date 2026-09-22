import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { AdminHeader } from "@/components/admin/AdminHeader";
import { RequireAdminSession } from "@/components/admin/RequireAdminSession";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { GlobalLeaderboardEntry, LeaderboardEntry } from "@/core";
import { getLeaderboardService } from "@/core";
import { medalFor } from "@/lib/medal";

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
    return <p className="py-12 text-center text-xl text-muted-foreground">Cargando...</p>;
  }
  if (!entries || entries.length === 0) {
    return (
      <p className="py-12 text-center text-xl text-muted-foreground">Todavía no hay puntajes.</p>
    );
  }
  return (
    <ol className="space-y-2">
      {entries.map((entry) => (
        <li
          key={entry.userId}
          className="flex items-center gap-4 rounded-xl border bg-card px-6 py-4"
        >
          <span className="w-14 text-center text-3xl font-bold">{medalFor(entry.rank)}</span>
          <span className="text-3xl" aria-hidden>
            {entry.emoji}
          </span>
          <span className="flex-1 text-2xl font-semibold">{entry.name}</span>
          <span className="text-2xl font-bold text-primary">{entry.points} pts</span>
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
        <div className="min-h-screen bg-muted/40">
          <AdminHeader username={session.username} />
          <main className="mx-auto max-w-3xl px-6 py-10">
            <h1 className="mb-6 text-center text-4xl font-bold">Tabla de clasificación</h1>
            <Tabs defaultValue="global">
              <TabsList className="mb-6 h-auto w-full flex-wrap justify-center gap-1 bg-transparent p-0">
                <TabsTrigger value="global" className="text-base">
                  General
                </TabsTrigger>
                <TabsTrigger value="temple-of-knowledge" className="text-base">
                  Temple of Knowledge
                </TabsTrigger>
                <TabsTrigger value="whack-a-question" className="text-base">
                  Whack a game
                </TabsTrigger>
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
