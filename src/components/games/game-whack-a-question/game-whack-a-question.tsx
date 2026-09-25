import "./styles/game-whack.css";

import * as Phaser from "phaser";
import React, { useEffect, useRef } from "react";

import PhaserGame from "./game/main";
import { DEFAULT_THEME, GameResult, GameWhackAQuestionProps } from "./types/types";
import { loadQuestions, setTheme } from "./utils/global-state";
import { themeManager } from "./utils/theme-manager";
import { applyTheme } from "./utils/ui-styles";

export const GameWhackAQuestion: React.FC<GameWhackAQuestionProps> = ({
  data,
  onResult,
  gameId = "default",
}) => {
  // Ref para el div donde se montará el canvas de Phaser
  const gameContainer = useRef<HTMLDivElement>(null);
  // Generar un ID único para el contenedor del juego
  const containerId = `game-whack-a-question-${gameId}`;
  // Ref para mantener la instancia del juego Phaser entre renders
  const phaserGameInstance = useRef<Phaser.Game | null>(null);
  // Ref para EventEmitter
  const gameEvents = useRef(new Phaser.Events.EventEmitter()).current;
  // Refs para evitar problemas de closure
  const onResultRef = useRef(onResult);

  // Aplicar el tema único (Pradera) al montar el componente
  useEffect(() => {
    themeManager.initialize();
    setTheme(DEFAULT_THEME);
    applyTheme(DEFAULT_THEME);
  }, []);

  useEffect(() => {
    onResultRef.current = onResult;
  }, [onResult]);

  // Cargar preguntas al globalState
  useEffect(() => {
    if (data?.length) {
      loadQuestions(data);
    }
  }, [data]);

  useEffect(() => {
    // Limpiar instancia anterior si existe
    if (phaserGameInstance.current) {
      phaserGameInstance.current.destroy(true);
      phaserGameInstance.current = null;
    }

    // Inicialización de Phaser
    const game = new PhaserGame({
      gameId: containerId,
      gameEvents,
      data,
    });
    phaserGameInstance.current = game;

    // Escuchar evento de respuesta desde Phaser
    const handleAnswer = (resultData: {
      isCorrect: boolean;
      questionIndex: number;
      selectedAnswer: string;
      correctAnswer: string;
      question: string;
    }) => {
      const result: GameResult = {
        isCorrect: resultData.isCorrect,
        questionIndex: resultData.questionIndex,
        selectedAnswer: resultData.selectedAnswer,
        correctAnswer: resultData.correctAnswer,
        question: resultData.question,
      };

      if (onResultRef.current) {
        onResultRef.current(result);
      }
    };

    gameEvents.on("question-answered", handleAnswer);

    return () => {
      gameEvents.off("question-answered", handleAnswer);

      // Liberar recursos
      if (phaserGameInstance.current) {
        phaserGameInstance.current.destroy(true);
        phaserGameInstance.current = null;
      }
    };
  }, [containerId, gameEvents, data]);

  // handler para cambiar al sonido o mute
  /*     const toggleMute = useCallback(() => {
      setIsMuted(prev => {
        const newState = !prev;
        gameEvents.emit('toggleMute', newState);
        return newState;
      });
    }, [gameEvents]); */

  return (
    <div className="game-whack-a-question_container">
      {/* Div oculto para anuncios ARIA Live */}
      <div
        id="game-announcer"
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          margin: "-1px",
          padding: 0,
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          border: 0,
        }}
      />

      {/*  <button
          id="game-reorganize-volume-button"
          aria-label={isMuted ? 'Activar sonido' : 'Desactivar sonido'}
          onClick={toggleMute}
          className={`game-reorganize-volume-button ${isMuted ? 'muted' : 'sound'}`}
        /> */}

      <div ref={gameContainer} id={containerId} className="game-whack-a-question_canvas" />
    </div>
  );
};
