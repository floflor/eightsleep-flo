interface SleepStage {
  stage: "awake" | "out" | "light" | "deep"; // Tipos de etapa de sueño
  duration: number; // Duración en segundos
}

interface TimeseriesData {
  tnt: [string, number][]; // Toss and turns: [timestamp, value]
  tempRoomC: [string, number][]; // Room temperature in Celsius: [timestamp, value]
  tempBedC: [string, number][]; // Bed temperature in Celsius: [timestamp, value]
  respiratoryRate: [string, number][]; // Respiratory rate in breaths per minute: [timestamp, value]
  heartRate: [string, number][]; // Heart rate in beats per minute: [timestamp, value]
}

interface SleepInterval {
  id: string; // ID del intervalo
  ts: string; // Timestamp de inicio del intervalo (ISO 8601)
  stages: SleepStage[]; // Array de etapas de sueño
  score: number; // Puntuación del sueño (0-100)
  timeseries: TimeseriesData; // Datos de series temporales
}

interface SleepIntervalsResponse {
  intervals: SleepInterval[]; // Array de intervalos de sueño
}
