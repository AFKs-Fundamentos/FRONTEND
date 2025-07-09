export interface Advisory {
  advisoryId: any;
  advisorId: any ;
  customerId: any;
  appointmentId: any;
  advisoryDate: string; // ISO date string
  advisoryTime: string; // ISO time string
  meetUrl?: string; // Optional for virtual meetings
  advisoryStatus: 'SCHEDULLED' | 'CANCELLED' | 'COMPLETED';
  advisoryDescription: string;
}


