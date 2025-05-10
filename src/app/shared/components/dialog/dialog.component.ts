import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Button} from 'primeng/button';
import {Card} from 'primeng/card';
import {Dialog} from 'primeng/dialog';

@Component({
  selector: 'app-dialog',
  imports: [
    Button,
    Card,
    Dialog
  ],
  templateUrl: './dialog.component.html',
  standalone: true,
  styleUrl: './dialog.component.css'
})
export class DialogComponent implements OnChanges{
  @Input() dialogTitle: string = '';
  @Input() visibleFromFather: boolean = false;
  @Output() dialogClosed = new EventEmitter<void>();
  @Output() visibleFromFatherChange = new EventEmitter<boolean>();
  visible: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visibleFromFather']) {
      this.visible = changes['visibleFromFather'].currentValue;
    }
  }
  onVisibleChange(v: boolean) {
    this.visibleFromFather = v;
    this.visibleFromFatherChange.emit(v);
    if (!v) {
      this.dialogClosed.emit();
    }
  }

}
