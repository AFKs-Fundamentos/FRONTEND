import {Component, OnInit} from '@angular/core';
import {BaseFormComponent} from "../../../shared/components/base-form.component";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {SignUpRequest} from "../../model/sign-up.request";
import {NgIf} from "@angular/common";
import {Router} from '@angular/router';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { MultiSelectModule } from 'primeng/multiselect';
import {InputGroup} from 'primeng/inputgroup';
import {InputGroupAddon} from 'primeng/inputgroupaddon';
import { PasswordModule } from 'primeng/password';
import {SelectButton} from 'primeng/selectbutton';




@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DividerModule, ButtonModule, InputTextModule, SelectModule, MultiSelectModule, InputGroup, InputGroupAddon,
    ReactiveFormsModule, PasswordModule, SelectButton, FormsModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent extends BaseFormComponent implements OnInit {
  roles: any[] = [
    { value: 'ROLE_TECHNICIAN', label: 'TÉCNICO' },
    { value: 'ROLE_CLIENT', label: 'CLIENTE' },
  ]

  form!: FormGroup;
  submitted = false;
  stateOptions: any[] = [{ label: 'One-Way', value: 'one-way' },{ label: 'Return', value: 'return' }];
  selectedRole: any;
  constructor(private builder: FormBuilder, private authenticationService: AuthenticationService,
    private router: Router) {
    super();
  }

  ngOnInit(): void {

    this.form = this.builder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      selectedRole: [[],Validators.required]
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    let username = this.form.value.username;
    let password = this.form.value.password;
    const selectedRole = [this.form.value.selectedRole.value];

    const signUpRequest = new SignUpRequest(username, password,selectedRole);
    this.authenticationService.signUp(signUpRequest);

    this.submitted = true;
    this.router.navigate(['/sign-in']);
  }

  navigateToSignIn() {
        this.router.navigate(['/sign-in']);
      }

}
