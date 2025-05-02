import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AdvisorService} from '../../services/advisor.service';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {Dialog} from 'primeng/dialog';
import {Advisor} from '../../model/advisor.entity';

@Component({
  selector: 'app-card-advisor',
  imports: [CardModule, ButtonModule, Dialog],
  templateUrl: './card-advisor.component.html',
  standalone: true,
  styleUrl: './card-advisor.component.css'
})

export class CardAdvisorComponent implements OnInit, OnChanges {

@Input() advisorId?: any;
  advisor!: Advisor ;
  visible: boolean = false;

  constructor(private advisorService: AdvisorService) {}

  ngOnInit(): void {
    // Puede o no funcionar dependiendo de si advisorId está disponible al iniciar
    if (this.advisorId) {
  }

}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['advisorId'] && this.advisorId) {
  }
}

  closeDialog() {
    this.visible = !this.visible
  }

  onRequestMeeting(advisor: Advisor) {
    this.advisor = advisor;
  }
}
