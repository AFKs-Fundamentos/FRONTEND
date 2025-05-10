import { Component } from '@angular/core';
import {AdvisorsListComponent} from '../advisors-list/advisors-list.component';
import {DialogComponent} from '../../../shared/components/dialog/dialog.component';
import {CardComponent} from '../../../shared/components/card/card.component';

@Component({
  selector: 'app-meetings',
  imports: [
    AdvisorsListComponent,
    DialogComponent,
    CardComponent
  ],
  templateUrl: './meetings.component.html',
  standalone: true,
  styleUrl: './meetings.component.css'
})
export class MeetingsComponent {
  meetings : string = 'Meetings';
  buttonLabel : string = 'Abrir';
  contentTitle : string = 'Titulo do Card';
  contentSubtitle : string = 'Subtitulo do Card';
}
