// Perfil del jugador guardado en el navegador. Se intenta registrar en el
// backend (ver UserService), pero el juego sigue funcionando si eso falla.
// Math.random() solo se usa dentro de manejadores de eventos, nunca durante el render.

const STORAGE_KEY = "booksquest-perfil";

// `id`, `token` y `code` los asigna el backend al registrar el usuario (ver
// UserService.createUser); quedan sin definir si el perfil solo se pudo
// guardar de forma local. El token autoriza las peticiones del jugador y el
// código (con el nombre) le permite volver a entrar.
export type Perfil = { id?: string; name: string; emoji: string; token?: string; code?: string };

const ADJETIVOS = [
  "Tigre",
  "Cometa",
  "Dragon",
  "Panda",
  "Lobo",
  "Zorro",
  "Tornado",
  "Cohete",
  "Rayo",
  "Galaxia",
  "Dino",
  "Tiburon",
  "Fenix",
  "Pantera",
  "Volcan",
];

const NOMBRES = [
  "Saltarin",
  "Veloz",
  "Loco",
  "Feliz",
  "Trueno",
  "Brillante",
  "Feroz",
  "Risueno",
  "Cosmico",
  "Salvaje",
  "Relampago",
  "Explosivo",
  "Ninja",
  "Turbo",
];

export const EMOJIS = ["😎", "🦊", "🐼", "🚀", "🐲", "🦁", "🐙", "🦄", "🐸", "⚡", "🌟", "🐯"];

export function randomUsername(): string {
  const a = ADJETIVOS[Math.floor(Math.random() * ADJETIVOS.length)];
  const n = NOMBRES[Math.floor(Math.random() * NOMBRES.length)];
  const num = Math.floor(Math.random() * 90) + 10;
  return `${a}${n}${num}`;
}

export function getPerfil(): Perfil | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Perfil;
    if (typeof parsed?.name !== "string" || !parsed.name) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function randomEmoji(): string {
  return EMOJIS[Math.floor(Math.random() * EMOJIS.length)] ?? "😎";
}

export function savePerfil(perfil: Perfil): Perfil {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(perfil));
  return perfil;
}

// La sesión del jugador venció (401): se borra el perfil, pero se recuerda su
// nombre para que la pantalla de inicio le ofrezca volver a entrar con su
// código sin reescribirlo. Distinto de un logout voluntario (clearPerfil),
// donde no se guarda nada: en un computador compartido, el siguiente niño no
// debería ver el nombre del anterior.
const RETURNING_NAME_KEY = "booksquest-returning-name";

export function expirePerfil(name: string) {
  window.localStorage.setItem(RETURNING_NAME_KEY, name);
  clearPerfil();
}

// Lee y borra (una sola vez) el nombre guardado por expirePerfil.
export function consumeReturningName(): string | null {
  try {
    const name = window.localStorage.getItem(RETURNING_NAME_KEY);
    window.localStorage.removeItem(RETURNING_NAME_KEY);
    return name;
  } catch {
    return null;
  }
}

export function clearPerfil() {
  window.localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event("booksquest:logout"));
}
