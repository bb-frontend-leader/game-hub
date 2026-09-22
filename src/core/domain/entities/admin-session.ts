// Result of a successful admin login: the bearer token used to authorize
// subsequent admin-only requests, plus who's logged in.
export type AdminSession = {
  token: string;
  username: string;
};
