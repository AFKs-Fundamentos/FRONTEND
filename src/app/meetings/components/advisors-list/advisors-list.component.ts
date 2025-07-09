import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FilterMatchMode, FilterService, SelectItem} from 'primeng/api';
import {CommonModule} from '@angular/common';
import {TableModule} from 'primeng/table';

import {AdvisorService} from '../../services/advisor.service';
import {Button} from 'primeng/button';
import {DialogComponent} from '../../../shared/components/dialog/dialog.component';
import {AdvisoryFormComponent} from '../advisory-form/advisory-form.component';
import {CardAdvisorComponent} from '../card-advisor/card-advisor.component';
import {Advisor} from '../../../profiles/model/advisor.entity';
import {SchedulesComponent} from '../../../profiles/components/schedules/schedules.component';
import {AdvisorSchedule} from '../../model/advisorSchedule.entity';
import {SchedulingService} from '../../../profiles/services/scheduling.service';

@Component({
  selector: 'app-advisors-list',
  imports: [TableModule, CommonModule, Button, DialogComponent, AdvisoryFormComponent, CardAdvisorComponent, SchedulesComponent],
  providers: [FilterService, AdvisorService],
  templateUrl: './advisors-list.component.html',
  standalone: true,
  styleUrl: './advisors-list.component.css'
})

export class AdvisorsListComponent implements OnInit, OnChanges{

  cols: any[] = [];
  advisors: Advisor[] = [];
  visibleInfo: boolean = false;
  visibleForm: boolean = false;
  visibleSchedules: boolean = false;
  matchModeOptions: SelectItem[] = [];
  schedules:AdvisorSchedule[] = [];
  @Input() advisor?: Advisor;
  @Output() dialogClosed = new EventEmitter<void>();



  constructor(
    private filterService: FilterService,
    private advisorService: AdvisorService,
    private scheduleService: SchedulingService
  ) {}

  ngOnInit() {
    const customFilterDate = 'betweenDates'
    const customFilterName = 'custom-equals';
    this.filterService.register(customFilterName, (value:any, filter:any): boolean => {
      if (filter === undefined || filter === null || filter.trim() === '') {
        return true;
      }

      if (value === undefined || value === null) {
        return false;
      }

      return value.toString() === filter.toString();
    });
    this.filterService.register(customFilterDate, (value: any, filter: Date[]): boolean => {
        if (!Array.isArray(filter) || filter.length !== 2 || !value) {
          return false;
        }

        const [start, end] = filter;
        const valueDate = new Date(value);

        // Validar que start y end sean fechas
        if (!(start instanceof Date) || isNaN(start.getTime())) return false;
        if (!(end instanceof Date) || isNaN(end.getTime())) return false;

        return valueDate >= start && valueDate <= end;
      }
    );




    this.cols = [
      { field: 'firstName', header: 'Nombre' },
      { field: 'lastName', header: 'Apellido' },
      { field: 'schedules', header: 'Horario' },
      { field: 'phone', header: 'Phone' },
      { field: 'actions', header: 'Actions' }
    ];

    this.matchModeOptions = [
      { label: 'Custom Equals', value: customFilterName},
      { label: 'Starts With', value: FilterMatchMode.STARTS_WITH },
      { label: 'Contains', value: FilterMatchMode.CONTAINS },
      { label: 'Not Contains', value: FilterMatchMode.NOT_CONTAINS },
      { label: 'After Date', value: FilterMatchMode.AFTER },
      { label: 'Before Date', value: FilterMatchMode.BEFORE},
      { label: 'Between Dates', value: 'betweenDates' }

    ];
    this.advisorService.getAll().subscribe(data => {
      this.advisors = data;
    });

  }

  onRequestMeeting(asesor: Advisor): void {
    this.advisor = asesor;
    this.visibleForm = true;
    console.log("asesor: ", this.advisor)
  }

  onViewDetails(asesor: Advisor): void {
    this.advisor = asesor;
    this.visibleInfo = true;
    console.log("asesor: ", this.advisor)
  }

  onHandleCancel() {
    this.visibleInfo = false;
    this.visibleForm = false;
    this.visibleSchedules = false;
  }

  onFormSent() {
    this.visibleForm = false;
    console.log("Form sent" , this.advisor);
  }
  onViewSchedules(asesor: Advisor): void {
    this.advisor = asesor;
    this.visibleSchedules = true;

    // Llamar al servicio para obtener los horarios
    this.scheduleService.getScheduleByAdvisorId(asesor.id).subscribe(
      (data: AdvisorSchedule[]) => {
        this.schedules = data;
      },
      error => {
        console.error('Error cargando horarios:', error);
        this.schedules = [];
      }
    );
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['visible']) {
      this.visibleInfo = changes['visible'].currentValue;
    }
  }



}
