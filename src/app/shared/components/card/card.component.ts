import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Button} from 'primeng/button';
import {Card} from 'primeng/card';

@Component({
  selector: 'app-card',
  imports: [
    Button,
    Card
  ],
  templateUrl: './card.component.html',
  standalone: true,
  styleUrl: './card.component.css'
})
export class CardComponent {

  @Input() contentTitle: string = '';
  @Input() contentSubtitle: string = '';

  @Output() cancelClicked = new EventEmitter<void>();
  @Output() saveClicked = new EventEmitter<void>();

  onCancel() {
    this.cancelClicked.emit();
  }

  onSave() {
    this.saveClicked.emit();
  }

}
