// A player as recorded by the backend: only the username is stored (the
// emoji is a client-side choice, see src/lib/perfil.ts). `id` is assigned by
// the backend the first time the register endpoint is called.
export type User = {
  id: string;
  name: string;
};

// A player who just registered or logged in, plus the bearer token the
// backend issued, needed to authorize that player's later requests (e.g.
// submitting scores). `code` is the player's access code: together with the
// name, it's what lets them log back in.
export type RegisteredUser = User & {
  token: string;
  code?: string;
};
