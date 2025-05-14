export interface Meeting {
  id: any;
  tipoReunion: 'IN_PERSON' | 'VIRTUAL';
  estado: 'IN_POGRESS' | 'COMPLETED' | 'CANCELLED' | 'PENDING';
  advisorId: any;
  customerId: any;
  fecha: Date;
  hora: Date;
  meetUrl: string;
  email: string;
  descripcion: string;
  location: string;
}


