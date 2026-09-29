// A player as recorded by the backend: only the username is stored (the
// emoji is a client-side choice, see src/lib/perfil.ts). `id` is assigned by
// the backend the first time the register endpoint is called.
export type User = {
  id: string;
  name: string;
};

// A freshly registered player plus the bearer token the backend issues for
// it, needed to authorize that player's later requests (e.g. submitting scores).
export type RegisteredUser = User & {
  token: string;
};
