import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FilterMatchMode, FilterService, SelectItem} from 'primeng/api';
import {CommonModule} from '@angular/common';
import {TableModule} from 'primeng/table';
import {CarService} from '../../services/car.service';
import {AdvisorService} from '../../services/advisor.service';
import {Button} from 'primeng/button';
import {CardAdvisorComponent} from '../card-advisor/card-advisor.component';
import {Dialog} from 'primeng/dialog';
import {Advisor} from '../../model/advisor.entity';
import {Card} from 'primeng/card';

@Component({
  selector: 'app-advisors-list',
  imports: [TableModule, CommonModule, Button, CardAdvisorComponent, Dialog, Card],
  providers: [FilterService, CarService, AdvisorService],
  templateUrl: './advisors-list.component.html',
  standalone: true,
  styleUrl: './advisors-list.component.css'
})

export class AdvisorsListComponent implements OnInit {

  cols: any[] = [];
  advisors: Advisor[] = [];
  advisorId: string = '';
  visible: boolean = false;
  matchModeOptions: SelectItem[] = [];
  advisor: Advisor | undefined;
  constructor(
    private filterService: FilterService,
    private advisorService: AdvisorService
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
        // Validaciones de seguridad
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
      { field: 'nombre', header: 'Name' },
      { field: 'calificacion', header: 'Score' },
      { field: 'tipoAsesoria', header: 'Mode' },
      { field: 'ubicacion', header: 'Location' },
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
    this.advisorService.getAdvisors().then(data => {
      this.advisors = data;
    });

  }


  onRequestMeeting(asesor: Advisor): void {
    this.advisor = asesor;
    this.visible = true;

  }

  onViewDetails(asesor: Advisor): void {
    this.advisor = asesor;
    this.visible = true;
  }


  closeDialog() {
    this.visible = !this.visible;
    console.log('id:' + this.advisorId );
  }

}


