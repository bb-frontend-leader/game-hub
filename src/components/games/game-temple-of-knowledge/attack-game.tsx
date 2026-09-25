import Phaser from "phaser";
import { useEffect, useRef, useState } from "react";

import { loadQuestions } from "./global-state";
import PhaserGame from "./main";
import css from "./styles/game-attack.module.css";
import type { GameResult, Question } from "./types/types";

interface AttackGameProps {
  questions: Question[];
  gameId?: string;
  onResult?: (result: GameResult) => void;
}

export function AttackGame({ questions, gameId, onResult }: AttackGameProps) {
  const gameContainer = useRef<HTMLDivElement>(null);

  const gameEvents = useRef(new Phaser.Events.EventEmitter()).current;
  const phaserGameInstanceRef = useRef<PhaserGame | null>(null);

  const containerId = `game-container-${gameId ?? "default"}`;

  const [phaserKey, _] = useState(0);

  // ✅ 1) Cargar questions al globalState
  useEffect(() => {
    if (questions?.length) loadQuestions(questions);
  }, [questions]);

  // ✅ 2) Handler del ThemeSelector
  // const handleThemeChange = useCallback(
  //   (theme: ThemeType) => {
  //     setTheme(theme); // globalState.theme

  //     applyTheme(theme);

  //     // Avisar a Phaser para que lo aplique (o reinicie)
  //     gameEvents.emit("theme-changed", { theme });
  //     setPhaserKey((k) => k + 1);

  //     // Anunciar el cambio
  //     announce(`Tema cambiado a ${theme.name}. Presiona jugar para comenzar.`);
  //   },
  //   [gameEvents],
  // );

  // ✅ 3) Crear Phaser una sola vez
  useEffect(() => {
    if (phaserGameInstanceRef.current) {
      phaserGameInstanceRef.current.destroy(true);
      phaserGameInstanceRef.current = null;
    }

    phaserGameInstanceRef.current = new PhaserGame({
      gameId: containerId,
      ...(onResult ? { onResult } : {}),
    });

    return () => {
      phaserGameInstanceRef.current?.destroy(true);
      phaserGameInstanceRef.current = null;
    };
  }, [containerId, phaserKey, onResult]); // 👈 phaserKey aquí

  return (
    <>
      {/* Selector de temas */}
      {/* <div className={css["theme-selector-container"]}>
        <ThemeSelector onThemeChange={handleThemeChange} gameEvents={gameEvents} />
      </div> */}
      <div className={css["gameAttack_container"]} id="gameAttack-id">
        <div
          id="game-announcer"
          aria-live="polite"
          aria-atomic="true"
          className={css["visually-hidden"]}
        ></div>
        <div key={phaserKey} ref={gameContainer} id={containerId} tabIndex={-1} />
      </div>
    </>
  );
}
