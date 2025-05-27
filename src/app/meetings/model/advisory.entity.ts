export interface Advisory {
  id: any;
  advisoryType: 'IN_PERSON' | 'VIRTUAL';
  advisoryStatus: 'PENDING' | 'IN_PROGRESS' | 'CANCELLED' | 'COMPLETED';
  advisorId: any ;
  customerId: any;
  advisoryDate: string; // ISO date string
  advisoryTime: string; // ISO time string
  meetUrl?: string; // Optional for virtual meetings
  clientEmail: string;
  advisoryDescription: string;
  location?: string; // Optional for in-person meetings
}

