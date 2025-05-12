import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {Advisor} from '../../model/advisor.entity';
import {CardComponent} from '../../../shared/components/card/card.component';

@Component({
  selector: 'app-card-advisor',
  imports: [
    CardModule,
    ButtonModule,
    CardComponent,
  ],
  templateUrl: './card-advisor.component.html',
  standalone: true,
  styleUrl: './card-advisor.component.css'
})

export class CardAdvisorComponent implements OnChanges {

  @Input() advisor?: Advisor;
  @Input() visibleFromFather: boolean = false;
  @Output() dialogClosed = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<void>();
  visible: boolean = false;


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visibleFromFather']) {
      this.visible = changes['visibleFromFather'].currentValue;
    }
  }


  onHandleCancel() {
    this.visible = false;
    this.dialogClosed.emit();

  }
  onHandleSave(){
    this.visible = false;
    this.onSave.emit();
    console.log(this.advisor);
  }
}
