export interface ProblemDetails {
    type?: string;
    title: string;
    status: number;
    errors?: Record<string, string[]>; // Mapa de claves a listas de errores
    traceId?: string;
  }
  