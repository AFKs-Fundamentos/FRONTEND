import {Component, OnInit} from '@angular/core';
import {CardAdvisorComponent} from '../card-advisor/card-advisor.component';
import {CardComponent} from '../../../shared/components/card/card.component';
import {Advisor} from '../../model/advisor.entity';
import {AdvisorService} from '../../services/advisor.service';
import {Advisory} from '../../model/advisory.entity';
import {AdvisoryService} from '../../services/advisory.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-service-history',
  imports: [
    CardComponent,
    CommonModule,
  ],
  providers: [AdvisorService,AdvisoryService],
  templateUrl: './service-history.component.html',
  standalone: true,

  styleUrl: './service-history.component.css'
})
export class ServiceHistoryComponent implements OnInit {
  advisoriesPending: Advisory[] = [];
  advisoriesCompleted: Advisory[] = [];
  advisors: Advisor[] = [];
  advisor?: Advisor;
  constructor(
    private advisoryService:AdvisoryService,
    private advisorService: AdvisorService
  ) {}

  ngOnInit(): void {

    //TODO: remove comments
   // this.loadMeetings(this.advisors);
    this.loadAdvisor();
    this.loadAdvisoriesByStatus("PENDING");
    this.loadAdvisoriesByStatus("COMPLETED");
  }

  loadAdvisor(): void {
    this.advisorService.getAll().subscribe(data => {
      this.advisors = data;
    //  console.log(this.advisors);
    });
  }



  loadAdvisoriesByStatus(status: string): void {
    this.advisoryService.getAdvisoryByStatus(status).subscribe({
      next: (data: Advisory[]) => {
        if (status === "PENDING") {
          this.advisoriesPending = data;
        } else if (status === "COMPLETED") {
          this.advisoriesCompleted = data;
        }
        console.log(`Asesorías con estado ${status}:`, data);
      },
      error: (error) => {
        console.error(`Error al cargar las asesorías con estado ${status}:`, error);
      }
    });
  }


}
