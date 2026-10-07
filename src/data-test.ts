import { Question } from "@games/game-temple-of-knowledge/types/types";
import { WhackQuestion } from "@games/game-whack-a-question/types/types";

export const TEMPLE_OF_KNOWLEDGE_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "¿En qué ciudad se encuentra la sede principal de Books & Books Colombia?",
    options: [
      { id: "A", text: "Medellín", correct: false },
      { id: "B", text: "Cali", correct: false },
      { id: "C", text: "Bogotá", correct: true },
      { id: "D", text: "Barranquilla", correct: false },
    ],
  },
  {
    id: 2,
    text: "¿Cuál es uno de los principales campos de especialización de Books & Books?",
    options: [
      { id: "A", text: "Construcción de infraestructura escolar", correct: false },
      { id: "B", text: "Producción de contenidos y soluciones educativas", correct: true },
      { id: "C", text: "Fabricación de dispositivos electrónicos", correct: false },
      { id: "D", text: "Transporte escolar", correct: false },
    ],
  },
  {
    id: 3,
    text: "Verdadero o falso: Books & Books trabaja únicamente con materiales educativos impresos.",
    options: [
      { id: "A", text: "Verdadero", correct: false },
      { id: "B", text: "Falso", correct: true },
    ],
  },
  {
    id: 4,
    text: "¿Qué característica se destaca en el desarrollo de contenidos educativos de Books & Books?",
    options: [
      { id: "A", text: "Producción idéntica para todas las instituciones", correct: false },
      { id: "B", text: "Exclusivamente contenidos universitarios", correct: false },
      { id: "C", text: "Exclusivamente materiales físicos", correct: false },
      {
        id: "D",
        text: "Personalización y adaptación a diferentes contextos de aprendizaje",
        correct: true,
      },
    ],
  },
  {
    id: 5,
    text: "¿Cuáles de las siguientes editoriales aparecen asociadas públicamente con Books & Books?",
    options: [
      { id: "A", text: "Cambridge / HMH / Helbling / Marshall Cavendish", correct: true },
      { id: "B", text: "NASA Publishing", correct: false },
      { id: "C", text: "Random Education exclusivamente", correct: false },
      { id: "D", text: "UNESCO Press", correct: false },
    ],
  },
  {
    id: 6,
    text: "Verdadero o falso: Books & Books ha desarrollado proyectos relacionados con el bilingüismo a nivel nacional.",
    options: [
      { id: "A", text: "Verdadero", correct: true },
      { id: "B", text: "Falso", correct: false },
    ],
  },
  {
    id: 7,
    text: "¿Cuál de estos conceptos aparece asociado a la propuesta de valor de Books & Books?",
    options: [
      { id: "A", text: "Sustituir al docente mediante tecnología", correct: false },
      { id: "B", text: "Eliminar los procesos de capacitación", correct: false },
      {
        id: "C",
        text: "Hacer accesibles la tecnología y las metodologías pedagógicas",
        correct: true,
      },
      { id: "D", text: "Trabajar únicamente con educación superior", correct: false },
    ],
  },
  {
    id: 8,
    text: "¿Qué tipo de contenido desarrolla Books & Books como parte de su oferta digital?",
    options: [
      { id: "A", text: "Únicamente videojuegos", correct: false },
      { id: "B", text: "Contenidos académicos interactivos", correct: true },
      { id: "C", text: "Exclusivamente contenidos administrativos", correct: false },
      { id: "D", text: "Únicamente libros electrónicos de literatura", correct: false },
    ],
  },
  {
    id: 9,
    text: "¿Cuál de las siguientes combinaciones representa mejor el enfoque de Books & Books?",
    options: [
      { id: "A", text: "Tecnología + transporte + infraestructura", correct: false },
      { id: "B", text: "Publicidad + turismo + entretenimiento", correct: false },
      { id: "C", text: "Impresión + logística únicamente", correct: false },
      { id: "D", text: "Contenido + tecnología + metodología pedagógica", correct: true },
    ],
  },
  {
    id: 10,
    text: "¿Qué busca lograr la personalización de contenidos educativos según la propuesta institucional?",
    options: [
      { id: "A", text: "Adaptarlos a las necesidades y contextos de los clientes", correct: true },
      {
        id: "B",
        text: "Hacer que todos los estudiantes utilicen exactamente el mismo recurso",
        correct: false,
      },
      { id: "C", text: "Eliminar la participación docente", correct: false },
      { id: "D", text: "Reducir la variedad de formatos", correct: false },
    ],
  },
  {
    id: 11,
    text: "Verdadero o falso: Books & Books se presenta exclusivamente como una librería comercial y no como un proveedor de soluciones educativas.",
    options: [
      { id: "A", text: "Verdadero", correct: false },
      { id: "B", text: "Falso", correct: true },
    ],
  },
  {
    id: 12,
    text: "¿Qué producto de Books & Books está orientado específicamente al fortalecimiento del bilingüismo?",
    options: [
      { id: "A", text: "Biblioteca Empresarial Digital", correct: false },
      { id: "B", text: "Laboratorio de Robótica", correct: false },
      { id: "C", text: "Biblioteca Básica Bilingüe", correct: true },
      { id: "D", text: "Plataforma de Finanzas", correct: false },
    ],
  },
  {
    id: 13,
    text: "¿Qué servicio complementa la oferta de Books & Books para apoyar la implementación de soluciones educativas?",
    options: [
      { id: "A", text: "Transporte escolar", correct: false },
      { id: "B", text: "Administración de infraestructura física", correct: false },
      { id: "C", text: "Servicios de alimentación escolar", correct: false },
      { id: "D", text: "Acompañamiento y capacitación", correct: true },
    ],
  },
  {
    id: 14,
    text: "Verdadero o falso: Books & Books ha participado en proyectos educativos con instituciones y entidades territoriales.",
    options: [
      { id: "A", text: "Verdadero", correct: true },
      { id: "B", text: "Falso", correct: false },
    ],
  },
  {
    id: 15,
    text: "Una institución necesita implementar un programa de bilingüismo. ¿Qué alternativa coincide mejor con el enfoque de Books & Books?",
    options: [
      { id: "A", text: "Entregar únicamente libros y finalizar el proceso", correct: false },
      {
        id: "B",
        text: "Combinar materiales, soluciones pedagógicas, acompañamiento y capacitación",
        correct: true,
      },
      { id: "C", text: "Sustituir el currículo institucional", correct: false },
      { id: "D", text: "Implementar tecnología sin formación docente", correct: false },
    ],
  },
  {
    id: 16,
    text: "¿Cuál de las siguientes afirmaciones representa mejor la evolución del modelo de Books & Books?",
    options: [
      {
        id: "A",
        text: "Pasar de una lógica centrada en libros a un portafolio amplio de soluciones educativas, contenidos digitales, acompañamiento y proyectos institucionales",
        correct: true,
      },
      {
        id: "B",
        text: "Abandonar completamente los materiales educativos tradicionales",
        correct: false,
      },
      {
        id: "C",
        text: "Concentrarse exclusivamente en la venta directa al consumidor",
        correct: false,
      },
      {
        id: "D",
        text: "Limitar su actividad a la importación de libros extranjeros",
        correct: false,
      },
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
