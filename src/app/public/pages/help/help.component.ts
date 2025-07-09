import { Component, OnInit } from '@angular/core';
import { PanelModule } from 'primeng/panel';
@Component({
  selector: 'app-help',
  imports: [PanelModule],
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
