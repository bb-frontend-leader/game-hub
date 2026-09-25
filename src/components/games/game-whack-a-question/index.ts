/**
 * Punto de entrada principal para el juego Whac-A-Question
 *
 * Exporta todo lo necesario para usar el componente en proyectos externos
 */

// Componente principal
export { GameWhackAQuestion } from "./game-whack-a-question";

// Tipos e interfaces
export {
  DEFAULT_THEME,
  type GameResult,
  type ThemeType,
  type WhackQuestion,
  WORLD_THEMES,
} from "./types/types";

// Utilidades de tema
export {
  getCurrentThemeColors,
  getCurrentThemeName,
  getImageByName,
  getSpritesheetByName,
  getThemeAmbienceSounds,
  getThemeImages,
  getThemeSpritesheets,
  getThemeTileMap,
  themeManager,
} from "./utils";

// Estado global
export { globalState, loadQuestions, setTheme } from "./utils/global-state";
