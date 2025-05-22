import {Component, OnInit} from '@angular/core';
import {BaseFormComponent} from "../../../shared/components/base-form.component";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {SignUpRequest} from "../../model/sign-up.request";
import {NgIf} from "@angular/common";
import {Router} from '@angular/router';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DividerModule, ButtonModule, InputTextModule,SelectModule, MultiSelectModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent extends BaseFormComponent implements OnInit {
  roles: any[] | undefined;
  form!: FormGroup;
  submitted = false;

  selectedRole: any;
  constructor(private builder: FormBuilder, private authenticationService: AuthenticationService,
    private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.roles = [
      { value: 'ROLE_TECHNICIAN', label: 'TÉCNICO' },
      { value: 'ROLE_CLIENT', label: 'CLIENTE' },
    ];

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

  }

  navigateToSignIn() {
        this.router.navigate(['/sign-in']);
      }
}
