export interface Advisor {
  id: string;
  nombre: string;
  especialidad: string;
  calificacion: number;
  tipoAsesoria: string;
  disponibilidad: Date[];
  ubicacion: string;
}
