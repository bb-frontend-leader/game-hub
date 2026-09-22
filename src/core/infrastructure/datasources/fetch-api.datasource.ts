import { getApiBaseUrl } from "@/core/infrastructure/config/api-config";

type ApiErrorOptions = {
  status: number | null;
  body?: unknown;
  cause?: unknown;
};

// Thrown for both network-level failures (status: null — the request never
// reached the server) and non-2xx HTTP responses (status: the HTTP status code).
export class ApiError extends Error {
  readonly status: number | null;
  readonly body: unknown;

  constructor(message: string, options: ApiErrorOptions) {
    super(message, options.cause !== undefined ? { cause: options.cause } : undefined);
    this.name = "ApiError";
    this.status = options.status;
    this.body = options.body;
  }
}

type QueryParams = Record<string, string | number | boolean | undefined>;
type RequestOptions = { token?: string };

// Joins a base URL and a path segment, tolerant of whatever shape the backend
// team hands over: trailing slash or not on the base, leading slash or not on
// the path, and an extra path prefix (e.g. "/api/v1") baked into the base.
// Deliberately NOT `new URL(path, base)`: when `path` starts with "/", the
// WHATWG URL parser treats it as root-relative and silently drops any path
// segment already present in `base` (e.g. base "https://host/api/v1" + path
// "/users" would resolve to "https://host/users", losing "/api/v1").
function joinUrl(base: string, path: string): string {
  const trimmedBase = base.replace(/\/+$/, "");
  const trimmedPath = path.replace(/^\/+/, "");
  return `${trimmedBase}/${trimmedPath}`;
}

function buildQueryString(params: QueryParams | undefined): string {
  if (!params) return "";
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) continue;
    search.append(key, String(value));
  }
  const queryString = search.toString();
  return queryString ? `?${queryString}` : "";
}

async function parseBody(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) return undefined;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

async function request<T>(
  method: "GET" | "POST" | "DELETE",
  path: string,
  query: QueryParams | undefined,
  body: unknown,
  options?: RequestOptions,
): Promise<T> {
  const url = joinUrl(getApiBaseUrl(), path) + buildQueryString(query);
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  if (options?.token) headers["Authorization"] = `Bearer ${options.token}`;

  let response: Response;
  try {
    response = await fetch(url, {
      method,
      headers,
      ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    });
  } catch (cause) {
    throw new ApiError(`Could not reach the API: ${method} ${path}`, { status: null, cause });
  }

  const parsed = await parseBody(response);

  if (!response.ok) {
    throw new ApiError(`API responded with ${response.status} for ${method} ${path}`, {
      status: response.status,
      body: parsed,
    });
  }

  return parsed as T;
}

// Minimal fetch-based HTTP client for the core layer. Every infrastructure
// repository goes through this — it is the only place in `src/core` allowed
// to call the global `fetch`.
export const fetchApiDataSource = {
  get<T = unknown>(path: string, query?: QueryParams, options?: RequestOptions): Promise<T> {
    return request<T>("GET", path, query, undefined, options);
  },
  post<T = unknown>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return request<T>("POST", path, undefined, body, options);
  },
  delete<T = unknown>(path: string, options?: RequestOptions): Promise<T> {
    return request<T>("DELETE", path, undefined, undefined, options);
  },
};
