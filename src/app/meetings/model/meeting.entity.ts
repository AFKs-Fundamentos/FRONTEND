export interface Meeting {
  id: string;
  hora: string; // o tipo Date si lo prefieres unificado con fecha
  fecha: Date;
  tipoReunion: 'PRESENCIAL' | 'VIRTUAL';
  email: string;
  descripcion: string;
  estado: 'EN_ESPERA' | 'EN_PROCESO' | 'COMPLETADA';
  rating: number | null;
}
