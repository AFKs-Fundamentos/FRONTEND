import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SidebarComponent} from './public/sidebar/sidebar.component';
import { AuthenticationSectionComponent } from "./iam/components/authentication-section/authentication-section.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, AuthenticationSectionComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PCMASTER';
}
