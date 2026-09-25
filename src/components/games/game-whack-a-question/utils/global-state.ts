import type { ThemeType, WhackQuestion } from '../types/types';
import { DEFAULT_THEME } from '../types/types';

export const globalState = {
  questions: [] as WhackQuestion[],
  theme: DEFAULT_THEME as ThemeType,
};

export function loadQuestions(questions: WhackQuestion[]) {
  globalState.questions = questions;
}

export function setTheme(theme: ThemeType) {
  globalState.theme = theme;
}
