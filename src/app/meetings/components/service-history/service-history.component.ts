import {Component, OnInit} from '@angular/core';
import {CardAdvisorComponent} from '../card-advisor/card-advisor.component';
import {CardComponent} from '../../../shared/components/card/card.component';
import {AdvisorService} from '../../services/advisor.service';
import {Advisory} from '../../model/advisory.entity';
import {AdvisoryService} from '../../services/advisory.service';
import {CommonModule} from '@angular/common';
import {Advisor} from '../../../profiles/model/advisor.entity';
import {ButtonDirective, ButtonLabel} from 'primeng/button';
import {AuthenticationService} from '../../../iam/services/authentication.service';

@Component({
  selector: 'app-service-history',
  imports: [
    CardComponent,
    CommonModule,
    ButtonDirective,
    ButtonLabel,
  ],
  providers: [AdvisorService,AdvisoryService],
  templateUrl: './service-history.component.html',
  standalone: true,

  styleUrl: './service-history.component.css'
})
export class ServiceHistoryComponent implements OnInit {
  advisoriesSchedulled: Advisory[] = [];
  advisoriesCompleted: Advisory[] = [];

  advisors: Advisor[] = [];
  advisor?: Advisor;
  currentUserId!: number;
  currentUserRole!: string;

  constructor(
    private advisoryService: AdvisoryService,
    private appointmentService: AdvisoryService,
    private advisorService: AdvisorService,
    private authService: AuthenticationService
  ) {
  }

  ngOnInit(): void {
    this.currentUserId = this.authService.getCurrentUserId;
    this.currentUserRole = this.authService.getCurrentUserRole;
    this.loadAdvisor();
    this.loadAdvisoriesByStatus("SCHEDULLED");
    this.loadAdvisoriesByStatus("COMPLETED");
  }

  loadAdvisor(): void {
    this.advisorService.getAll().subscribe(data => {
      this.advisors = data;
    });
  }

  loadAdvisoriesByStatus(status: string): void {
    this.advisoryService.getAdvisoryByStatus(status).subscribe({
      next: (data: Advisory[]) => {
        const advisorFilter = data.filter(a => a.advisorId === this.currentUserId);
        const customerFilter = data.filter(a => a.customerId === this.currentUserId);

        if (this.currentUserRole == 'ROLE_TECHNICIAN') {
          if (status === "SCHEDULLED") {
            this.advisoriesSchedulled = advisorFilter;
          } else if (status === "COMPLETED") {
            this.advisoriesCompleted = advisorFilter;
          }
          console.log(`Asesorías con estado ${status} del usuario  ${this.currentUserId}:`, advisorFilter);

        } else {
          if (status == "SCHEDULLED") {
            this.advisoriesSchedulled = customerFilter;
          } else if (status === "COMPLETED") {
            this.advisoriesCompleted = customerFilter;
          }
          console.log(`Asesorías con estado ${status} del usuario ASESOR ${this.currentUserId}:`, customerFilter);

        }
      },
      error: (error) => {
        console.error(`Error al cargar las asesorías con estado ${status}:`, error);
      }
    });
  }


  onMarkAsCanceled(id: any) {
    this.advisoryService.getById(id).subscribe({
      next: (advisory) => {
        const updatedAdvisory = {
          advisoryStatus: 'CANCELLED',
          advisorId: advisory.advisorId,
          customerId: advisory.customerId,
          advisoryDate: advisory.advisoryDate,
          advisoryTime: advisory.advisoryTime,
          meetUrl: advisory.meetUrl,
          advisoryDescription: advisory.advisoryDescription
        };

        this.advisoryService.update(id, updatedAdvisory).subscribe({
          next: () => {
            console.log(`Asesoría ${id} cancelada`);
            this.loadAdvisoriesByStatus("SCHEDULLED");
            this.loadAdvisoriesByStatus("COMPLETED");
          },
          error: (err) => console.error('Error al cancelar asesoría:', err)
        });
      },
      error: (err) => console.error('Error al obtener asesoría:', err)
    });
  }


  onMarkAsCompleted(id: any) {


    this.advisoryService.getById(id).subscribe({
      next: (advisory) => {
        const updatedAdvisory = {
          advisoryStatus: 'COMPLETED',
          advisorId: advisory.advisorId,
          customerId: advisory.customerId,
          advisoryDate: advisory.advisoryDate,
          advisoryTime: advisory.advisoryTime,
          meetUrl: advisory.meetUrl,
          advisoryDescription: advisory.advisoryDescription
        };

        this.advisoryService.update(id, updatedAdvisory).subscribe({
          next: () => {
            console.log(`Asesoría ${id} completada`);
            this.loadAdvisoriesByStatus("SCHEDULLED");
            this.loadAdvisoriesByStatus("COMPLETED");
          },
          error: (err) => console.error('Error al completar asesoría:', err)
        });
      },
      error: (err) => console.error('Error al obtener asesoría:', err)
    });
  }
}
