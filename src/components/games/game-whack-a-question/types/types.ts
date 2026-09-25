export interface WhackQuestion {
  question: string;
  options: string[]; // Array de opciones
  correctAnswer: number; // Índice de la respuesta correcta (0-based)
}

export interface GameResult {
  isCorrect: boolean;
  questionIndex: number;
  selectedAnswer?: string;
  correctAnswer: string;
  question: string;
}

export interface GameWhackAQuestionProps {
  data: WhackQuestion[];
  onResult?: (result: GameResult) => void;
  gameId?: string;
}

export type MusicSound = Phaser.Sound.BaseSound & {
  mute: boolean;
  volume: number;
};

export interface ThemeType {
  id: number;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    bgButton: string; // boton como volver a jugar
    textButton: string; // texto del boton como volver a jugar
    gradientModalFeedbacks: string;
    borderModalFeedbacks: string;
    gradientModalInstructions: string;
    borderModalInstructionContent: string;
  };
  assets: {
    images: {
      name: string;
      path: string;
    }[];
    spritesheets: {
      name: string;
      path: string;
    }[];
    tileMap: {
      name: string;
      path: string;
    }[];
    ambiencesSounds: {
      name: string;
      path: string;
    }[];
  };
}

export const DEFAULT_THEME: ThemeType = {
  id: 1,
  name: 'Pradera',
  colors: {
    primary: '#e0a44c',
    secondary: '#84543d',
    bgButton: 'linear-gradient(135deg, #8b4513 0%, #d2691e 50%, #8b4513 100%)', // boton como volver a jugar
    textButton: '#0f0806', // texto del boton como volver a jugar
    gradientModalFeedbacks: 'linear-gradient(135deg, #8b4513 0%, #d2691e 50%, #8b4513 100%)',
    borderModalFeedbacks: '6px solid #4a2511',
    gradientModalInstructions: 'linear-gradient(135deg, #452316 0%, #5c2d15 50%, #2c1810 100%)',
    borderModalInstructionContent: '8px solid #8b4513d9',
  },
  assets: {
    images: [
      //fondo del menuScene y sus capas
      { name: 'background-1', path: 'assets/game-whack-a-question/images/background-initial/1.png' },
      { name: 'bg-layer-1', path: 'assets/game-whack-a-question/images/background-initial/2.png' },
      { name: 'bg-layer-2', path: 'assets/game-whack-a-question/images/background-initial/3.png' },
      { name: 'bg-layer-3', path: 'assets/game-whack-a-question/images/background-initial/4.png' },
      //fondo del juego y sus nubes
      { name: 'background_sky', path: 'assets/game-whack-a-question/images/backgrounds/background_sky.png' },
      {
        name: 'clouds_medium',
        path: 'assets/game-whack-a-question/images/backgrounds/background_clouds_medium.png',
      },
      {
        name: 'clouds_small',
        path: 'assets/game-whack-a-question/images/backgrounds/background_clouds_small.png',
      },
      //tiles del juego
      {
        name: 'tiles_ground',
        path: 'assets/game-whack-a-question/tiles/Topdown RPG 32x32 - Ground Tileset 1.2.PNG',
      },
      {
        name: 'tiles_trees',
        path: 'assets/game-whack-a-question/tiles/Topdown RPG 32x32 - Trees 1.2.PNG',
      },
    ],
    spritesheets: [
      { name: 'mole', path: 'assets/game-whack-a-question/sprites/mole.png' },
      { name: 'hole', path: 'assets/game-whack-a-question/sprites/hole.png' },
      { name: 'hurt-mole', path: 'assets/game-whack-a-question/sprites/hurt-mole.png' },
    ],
    tileMap: [
      { name: 'mapa_bosque', path: 'assets/game-whack-a-question/tiles/normalMapWhackAQuestion.json' },
    ],
    ambiencesSounds: [
      { name: 'bg_music-normal', path: 'assets/game-whack-a-question/music/ambience/normal-game.mp3' },
    ],
  },
};

export const WORLD_THEMES: ThemeType[] = [DEFAULT_THEME];
