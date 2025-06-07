import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DatePicker} from 'primeng/datepicker';
import {SelectButton} from 'primeng/selectbutton';
import {InputText} from 'primeng/inputtext';
import {Textarea} from 'primeng/textarea';
import {Fluid} from 'primeng/fluid';
import {IftaLabel} from 'primeng/iftalabel';
import {Button} from 'primeng/button';
import {Advisor} from '../../model/advisor.entity';
import {Advisory} from '../../model/advisory.entity';
import {AdvisoryService} from '../../services/advisory.service';
import {AuthenticationService} from '../../../iam/services/authentication.service';

@Component({
  selector: 'app-advisory-form',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    DatePicker,
    SelectButton,
    InputText,
    Textarea,
    Fluid,
    IftaLabel,
    Button,
  ],
  standalone: true,
  templateUrl: './advisory-form.component.html',
  styleUrl: './advisory-form.component.css',
})
export class AdvisoryFormComponent {

  advisory: Advisory | undefined

  @Input() advisor?:Advisor;
  @Output() formSent = new EventEmitter();
  op  = {
    email: {
      id: 'userEmail',
      label: 'Email',
      controlName: 'userEmail',

    },
    description: {
      id: 'description',
      label: 'Description',
      controlName: 'advisoryDescription',
    },
    date: {
      label: 'Date',
      controlName: 'advisoryDate',
      placeholder: 'DD/MM/YYYY',
      format: 'dd.mm.yy',
    },
    time: {
      label: 'Time',
      controlName: 'advisoryTime',
      placeholder: 'HH:MM',
      format: 'HH:MM',
    },// TODO: usar solo datetime, no date y time por separado
    meetingType: {
      id: 'MeetingType',
      label: 'MeetingType',
      controlName: 'meetingType',
      options: [
        { label: 'Presencial', value: 'IN_PERSON' },
        { label: 'Virtual', value: 'VIRTUAL' }
      ]
    },
    location: {
      id: 'location',
      label: 'Location',
      controlName: 'location',
    }
  }

  advisoryForm: FormGroup;
  advisoryDescription:FormControl;
  advisoryTime:FormControl;
  advisoryDate:FormControl;
  userEmail:FormControl;
  meetingType:FormControl;
  location:FormControl;


  constructor(  private advisoryService: AdvisoryService, private authenticationService: AuthenticationService) {

    this.advisoryDescription = new FormControl('');
    this.advisoryDate = new FormControl('');
    this.advisoryTime = new FormControl('');
    this.meetingType = new FormControl('');
    this.userEmail = new FormControl('');
    this.location = new FormControl('');
    this.advisoryForm = new FormGroup({
      advisoryDescription: this.advisoryDescription,
      advisoryDate: this.advisoryDate,
      advisoryTime: this.advisoryTime,
      meetingType: this.meetingType,
      userEmail: this.userEmail,
      location: this.location
    })
  }

  OnSubmit() {
    if (this.advisoryForm.invalid) {
      console.error('Invalid data in form');

      return;
    }

    const formValues = this.advisoryForm.value;

    const rawDate = new Date(formValues.advisoryDate);
    const advisoryDate = rawDate.toISOString().split('T')[0];

    let advisoryTime = '';

    const rawTime = formValues.advisoryTime;

    if (rawTime instanceof Date) {
      const hours = rawTime.getHours().toString().padStart(2, '0');
      const minutes = rawTime.getMinutes().toString().padStart(2, '0');
      advisoryTime = `${hours}:${minutes}:00`;
    } else if (typeof rawTime === 'string') {
      const [hours, minutes] = rawTime.split(':');
      advisoryTime = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:00`;
    } else {
      console.error('Formato de hora no reconocido:', rawTime);
    }

    const advisory: Advisory = {
      id: 0,
      advisoryType: formValues.meetingType,
      advisoryStatus: 'PENDING',
      advisorId: this.advisor?.id ?? 0,
      customerId: this.authenticationService.getCurrentUserId,
      advisoryDate: advisoryDate,
      advisoryTime: advisoryTime,
      meetUrl: '', // TODO: Implementar URL de reunión si es virtual y que retorne el url tambien
      clientEmail: formValues.userEmail,
      advisoryDescription: formValues.advisoryDescription,
      location: formValues.location
    };

    this.advisoryService.create(advisory).subscribe((newAdvisory) => {
      this.advisory = newAdvisory;
      console.log('Advisory created successfully:', newAdvisory);
      this.formSent.emit(newAdvisory);
    });
  }


}
