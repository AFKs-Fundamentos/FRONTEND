import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Advisor} from '../../model/advisor.entity';
import {CommonModule} from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {IftaLabel} from 'primeng/iftalabel';
import {Fluid} from 'primeng/fluid';
import {AdvisorService} from '../../services/advisor.service';
import {AuthenticationService} from '../../../iam/services/authentication.service';
import {CardComponent} from '../../../shared/components/card/card.component';

@Component({
  selector: 'app-edit-profile',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InputText,
    IftaLabel,
    Fluid,
    CardComponent,
  ],
  providers: [AdvisorService],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {

  @Input() profile?: Advisor;
  @Output() profileUpdated = new EventEmitter<Advisor>();
  editMode = false;

  // Form controls
  firstName = new FormControl('', Validators.required);
  lastName = new FormControl('');
  phone = new FormControl('', [Validators.pattern(/^[0-9\-\+]{9,15}$/)]);

  profileForm = new FormGroup({
    firstName: this.firstName,
    lastName: this.lastName,
    phone: this.phone,
  });

  constructor(private profileService: AdvisorService, private authenticationService: AuthenticationService ) {
  }

  ngOnInit() {
    const userId = this.authenticationService.getCurrentUserId;
    this.profileService.getById(userId).subscribe((profile) => {
      this.profile = profile;
      this.profileForm.patchValue({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        phone: profile.phone || ''
      });
    });
  }


  toggleEditMode() {
    this.editMode = !this.editMode;
    if (this.editMode && this.profile) {
      this.profileForm.patchValue({
        firstName: this.profile.firstName || '',
        lastName: this.profile.lastName || '',
        phone: this.profile.phone || ''
      });
    }
  }
  onSubmit() {
    console.log(this.authenticationService.getCurrentUserId);

    if (this.profileForm.invalid) {
      console.error('Formulario inválido');
      return;
    }
    console.log(this.authenticationService.getCurrentUserId);

    const updatedProfile: Advisor = {
      id: this.profile?.id ?? this.authenticationService.getCurrentUserId,
      firstName: this.firstName.value ?? '',
      lastName: this.lastName.value ?? '',
      phone: this.phone.value ?? ''
    };

    this.profileService.update(this.profile?.id ?? this.authenticationService.getCurrentUserId, updatedProfile).subscribe((response) => {
      console.log('Perfil actualizado exitosamente:', response);
      this.profile = response;
      this.profileUpdated.emit(response);
      this.editMode = false;
    });
  }


}
