import {Component, OnInit} from '@angular/core';
import {CardAdvisorComponent} from '../card-advisor/card-advisor.component';
import {CardComponent} from '../../../shared/components/card/card.component';
import {Advisor} from '../../model/advisor.entity';
import {AdvisorService} from '../../services/advisor.service';
import {Meeting} from '../../model/meeting.entity';
import {MeetingService} from '../../services/meeting.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-service-history',
  imports: [
    CardComponent,
    CommonModule,
  ],
  providers: [AdvisorService,MeetingService],
  templateUrl: './service-history.component.html',
  standalone: true,

  styleUrl: './service-history.component.css'
})
export class ServiceHistoryComponent implements OnInit {
  meeting?: Meeting;
  advisors: Advisor[] = [];
  advisor?: Advisor;
  meetings: Meeting[] = [];
  constructor(
    private meetingService:MeetingService,
    private advisorService: AdvisorService
  ) {}

  ngOnInit(): void {

    //TODO: remove comments
   // this.loadMeetings(this.advisors);
    this.loadAdvisor();

  }

  loadAdvisor(): void {
    this.advisorService.getAll().subscribe(data => {
      this.advisors = data;
    //  console.log(this.advisors);
    });
  }
  loadMeetings(advisor: Advisor): void {
    this.meetingService.getAllById(advisor.id).subscribe(ms => this.meetings = ms);
    console.log(this.meetings);
  }



}
