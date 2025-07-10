export interface AdvisorSchedule {
  scheduleId: any;
  advisorId: any;
  availableDate: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  scheduleHours: ScheduleHour[];
}

export interface ScheduleHour {
  id: any;
  startTime: string;
  endTime: string;
  available: boolean;
}
