// A player as recorded by the backend. The client's local profile
// (src/lib/perfil.ts) only stores { name, emoji } today; `id` is assigned by
// the backend the first time the create-user endpoint is called.
export type User = {
  id: string;
  name: string;
  emoji: string;
};
