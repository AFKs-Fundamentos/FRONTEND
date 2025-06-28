export class Schedule {
  advisorId: any;
  availableDate: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;

  constructor() {
    this.advisorId = 0;
    this.availableDate = '';
    this.startTime = '';
    this.endTime = '';
    this.isAvailable = true;
  }
}
