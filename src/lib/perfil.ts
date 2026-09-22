// Perfil del jugador guardado en el navegador. Se intenta registrar en el
// backend (ver UserService), pero el juego sigue funcionando si eso falla.
// Math.random() solo se usa dentro de manejadores de eventos, nunca durante el render.

const STORAGE_KEY = "juegolandia-perfil";

// `id` lo asigna el backend al crear el usuario (ver UserService.createUser);
// queda sin definir si el perfil solo se pudo guardar de forma local.
export type Perfil = { id?: string; name: string; emoji: string };

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

export function clearPerfil() {
  window.localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event("juegolandia:logout"));
}
