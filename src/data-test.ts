import { Question } from "@games/game-temple-of-knowledge/types/types";
import { WhackQuestion } from "@games/game-whack-a-question/types/types";

export const TEMPLE_OF_KNOWLEDGE_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "¿Cuál es la unidad de fuerza?",
    options: [
      { id: "A", text: "Newton", correct: true },
      { id: "B", text: "Joule", correct: false },
      { id: "C", text: "KiloNewton", correct: false },
      { id: "D", text: "Pound", correct: false },
    ],
  },
  {
    id: 2,
    text: "¿Qué significa HTML?",
    options: [
      { id: "A", text: "HyperText Markup Language", correct: true },
      { id: "B", text: "HighText Machine Language", correct: false },
      { id: "C", text: "HyperTool Multi Language", correct: false },
      { id: "D", text: "Home Tool Markup Language", correct: false },
    ],
  },
  {
    id: 3,
    text: "¿Cuál es la fórmula del área de un círculo?",
    options: [
      { id: "A", text: "A = 2πr", correct: false },
      { id: "B", text: "A = πr²", correct: true },
      { id: "C", text: "A = r²", correct: false },
      { id: "D", text: "A = πd", correct: false },
    ],
  },
  {
    id: 4,
    text: "¿Qué es una base de datos relacional?",
    options: [
      { id: "A", text: "Una base que solo guarda imágenes", correct: false },
      { id: "B", text: "Un sistema que organiza datos en tablas relacionadas", correct: true },
      { id: "C", text: "Un archivo de texto con datos", correct: false },
      { id: "D", text: "Un servidor para ejecutar videojuegos", correct: false },
    ],
  },
  {
    id: 5,
    text: "¿Qué significa CSS?",
    options: [
      { id: "A", text: "Computer Style Sheets", correct: false },
      { id: "B", text: "Cascading Style Sheets", correct: true },
      { id: "C", text: "Creative Styling System", correct: false },
      { id: "D", text: "Code Styling Syntax", correct: false },
    ],
  },
  {
    id: 6,
    text: "¿Cuál de estos es un tipo de dato en JavaScript?",
    options: [
      { id: "A", text: "String", correct: true },
      { id: "B", text: "Compile", correct: false },
      { id: "C", text: "Package", correct: false },
      { id: "D", text: "Runtime", correct: false },
    ],
  },
  {
    id: 7,
    text: "¿Para qué sirve Git?",
    options: [
      { id: "A", text: "Para crear diseños en CSS", correct: false },
      { id: "B", text: "Para controlar versiones de un proyecto", correct: true },
      { id: "C", text: "Para ejecutar bases de datos", correct: false },
      { id: "D", text: "Para compilar HTML", correct: false },
    ],
  },
];

export const dataGameWhackAQuestion: WhackQuestion[] = [
  {
    question: "¿Cuál es el propósito central de una convención de líderes educativos?",
    options: ["A. Sustituir los sistemas educativos nacionales", "B. Facilitar el diálogo y el intercambio de experiencias", "C. Unificar todos los currículos", "D. Eliminar la autonomía institucional"],
    correctAnswer: 1,
  },
  {
    question: "¿Qué permite el intercambio de experiencias entre instituciones?",
    options: ["A. Evitar toda adaptación local", "B. Compartir aprendizajes y prácticas", "C. Sustituir la gestión institucional", "D. Eliminar la evaluación"],
    correctAnswer: 1,
  },
  {
    question: "¿Qué dimensión debe considerarse al hablar de transformación educativa?",
    options: ["A. Solo infraestructura", "B. Solo herramientas digitales", "C. Personas, procesos, cultura y tecnología", "D. Exclusivamente presupuesto"],
    correctAnswer: 2,
  },
  {
    question: "Verdadero o falso: La innovación educativa puede incluir cambios pedagógicos y organizacionales.",
    options: ["Verdadero", "Falso"],
    correctAnswer: 0,
  },
  {
    question: "¿Qué componentes deberían considerarse al diseñar una hoja de ruta de transformación?",
    options: ["A. Fases e hitos", "B. Responsables y dependencias", "C. Indicadores y riesgos", "D. Todos las anteriores"],
    correctAnswer: 3,
  },
  {
    question: "Verdadero o falso: Las microcredenciales pueden servir para reconocer aprendizajes y competencias específicas.",
    options: ["Verdadero", "Falso"],
    correctAnswer: 0,
  },
  {
    question: "¿Qué aspecto debe evaluarse al implementar una iniciativa de IA?",
    options: ["A. Solo el costo inicial", "B. Utilidad, riesgos, adopción y resultados", "C. Únicamente la novedad de la herramienta ", "D. Solo la velocidad de implementación"],
    correctAnswer: 1,
  },
  {
    question: "Verdadero o falso: La gestión del cambio debe considerar barreras culturales y necesidades de formación.",
    options: ["Verdadero", "Falso"],
    correctAnswer: 0,
  },
  {
    question: "¿En qué año Medellín se convirtió en capital de Antioquia?",
    options: ["A. 1616", "B. 1675", "C. 1826", "D. 1907"],
    correctAnswer: 2,
  },
  {
    question: "¿En qué fecha se estableció la Villa de Nuestra Señora de la Candelaria de Medellín?",
    options: ["A. 2 de noviembre de 1675", "B. 22 de noviembre de 1674", "C. 20 de julio de 1810", "D. 1 de enero de 1826"],
    correctAnswer: 0,
  },
  {
    question: "¿Cuál de estas iniciativas surgió en Medellín como parte de su apuesta por la innovación y el conocimiento?",
    options: ["A. Ruta N", "B. Banco de la República", "C. Canal del Dique", "D. Parque Tayrona"],
    correctAnswer: 0,
  },
  {
    question: "Verdadero o falso: La temperatura promedio de Medellín indicada por la Alcaldía es de 24 °C.",
    options: ["Verdadero", "Falso"],
    correctAnswer: 0,
  }
];
