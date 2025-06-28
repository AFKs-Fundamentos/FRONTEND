import {ChangeDetectorRef, Component, EventEmitter, Output} from '@angular/core';
import {EditProfileComponent} from '../../components/edit-profile/edit-profile.component';
import {SchedulesFormComponent} from '../../components/schedules-form/schedules-form.component';
import {Schedule} from '../../model/schedule.entity';
import {SchedulingService} from '../../services/scheduling.service';
import {AuthenticationService} from '../../../iam/services/authentication.service';
import {SchedulesComponent} from '../../components/schedules/schedules.component';
import {CardComponent} from '../../../shared/components/card/card.component';
import {Button} from 'primeng/button';
import {DialogComponent} from '../../../shared/components/dialog/dialog.component';
import {Card} from 'primeng/card';
import {Dialog} from 'primeng/dialog';

@Component({
  selector: 'app-profiles-page',
  imports: [
    EditProfileComponent,
    SchedulesFormComponent,
    SchedulesComponent,
    Button,
  ],
  providers: [SchedulingService],
  templateUrl: './profiles-page.component.html',
  styleUrl: './profiles-page.component.css'
})
export class ProfilesPageComponent {

  scheduleResponse: Schedule[] = [];
  showForm = false;
  selectedAdvisorId?: number ;



  constructor(
    private availabilityService: SchedulingService,
    private authenticationService: AuthenticationService,
    private cd: ChangeDetectorRef
  ){}
  ngOnInit(): void {
    this.loadSchedules();
  }


  toggleForm() {
    this.showForm = !this.showForm;
  }

  loadSchedules() {
    this.availabilityService.getAll().subscribe((data) => {
      this.scheduleResponse = data;
    });
    this.selectedAdvisorId = this.authenticationService.getCurrentUserId;
  }
  handleCreated(newSchedule: Schedule) {

    this.scheduleResponse.push(newSchedule);
    this.showForm= false;
  }

  onDialogClosed() {
    console.log('Formulario cerrado');
  }

}
