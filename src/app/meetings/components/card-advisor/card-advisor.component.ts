import {Component, EventEmitter, input, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {AdvisorService} from '../../services/advisor.service';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {Dialog} from 'primeng/dialog';
import {Advisor} from '../../model/advisor.entity';
import {DialogComponent} from '../../../shared/components/dialog/dialog.component';
import {CardComponent} from '../../../shared/components/card/card.component';

@Component({
  selector: 'app-card-advisor',
  imports: [
    CardModule,
    ButtonModule,
    Dialog,
    DialogComponent,
    CardComponent
  ],
  templateUrl: './card-advisor.component.html',
  standalone: true,
  styleUrl: './card-advisor.component.css'
})

export class CardAdvisorComponent implements OnChanges {

  @Input() advisor?: Advisor;
  @Input() visibleFromFather: boolean = false;
  @Output() dialogClosed = new EventEmitter<void>();
  visible: boolean = false;
  selectedAdvisor?: Advisor;
  dialogVisible = false;


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visibleFromFather']) {
      this.visible = changes['visibleFromFather'].currentValue;
    }
  }

  onHandleCancel() {
    this.visible = false;
  }
  onHandleSave() {}
}
