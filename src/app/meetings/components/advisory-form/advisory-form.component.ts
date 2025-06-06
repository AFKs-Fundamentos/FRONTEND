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
import {AdvisorService} from '../../services/advisor.service';

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
  providers: [AdvisorService],
  standalone: true,
  templateUrl: './advisory-form.component.html',
  styleUrl: './advisory-form.component.css',
})
export class AdvisoryFormComponent {
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
    },
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


  constructor(  private advisorService: AdvisorService) {
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
    console.log(this.advisoryForm.value);
    this.formSent.emit();
  }

}
