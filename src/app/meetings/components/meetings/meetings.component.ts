import { Component } from '@angular/core';
import {AdvisorsListComponent} from '../advisors-list/advisors-list.component';
import {DialogComponent} from '../../../shared/components/dialog/dialog.component';
import {CardComponent} from '../../../shared/components/card/card.component';
import {AdvisoryFormComponent} from '../advisory-form/advisory-form.component';

@Component({
  selector: 'app-meetings',
  imports: [
    AdvisorsListComponent
  ],
  templateUrl: './meetings.component.html',
  standalone: true,
  styleUrl: './meetings.component.css'
})
export class MeetingsComponent {
}
