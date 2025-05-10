import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FilterMatchMode, FilterService, SelectItem} from 'primeng/api';
import {CommonModule} from '@angular/common';
import {TableModule} from 'primeng/table';

import {AdvisorService} from '../../services/advisor.service';
import {Button} from 'primeng/button';
import {CardAdvisorComponent} from '../card-advisor/card-advisor.component';
import {Advisor} from '../../model/advisor.entity';
import {CardComponent} from '../../../shared/components/card/card.component';
import {DialogComponent} from '../../../shared/components/dialog/dialog.component';

@Component({
  selector: 'app-advisors-list',
  imports: [TableModule, CommonModule, Button, CardAdvisorComponent, CardComponent, DialogComponent],
  providers: [FilterService, AdvisorService],
  templateUrl: './advisors-list.component.html',
  standalone: true,
  styleUrl: './advisors-list.component.css'
})

export class AdvisorsListComponent implements OnInit, OnChanges{

  cols: any[] = [];
  advisors: Advisor[] = [];
  visible: boolean = false;
  matchModeOptions: SelectItem[] = [];
  @Input() advisor?: Advisor;
  @Output() dialogClosed = new EventEmitter<void>();



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
  }

  onViewDetails(asesor: Advisor): void {
    this.advisor = asesor;
    this.visible = true;
    console.log("asesor: ", this.advisor)
  }

  onHandleCancel() {
    this.visible = false;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['visible']) {
      this.visible = changes['visible'].currentValue;
    }
  }

}


