  export interface Appointment {
    id?: any;
    appointmentDate: string;
    appointmentStartTime: string;
    appointmentEndTime: string;
    description: string;
    appointmentStatus: 'PENDING' | 'REJECTED' | 'PAID';
    advisorId: any;
    customerId: any;
  }
