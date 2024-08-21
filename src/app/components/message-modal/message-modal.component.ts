import { Component, EventEmitter, Input, input, Output } from '@angular/core';

@Component({
  selector: 'app-message-modal',
  standalone: true,
  imports: [],
  templateUrl: './message-modal.component.html',
  styleUrl: './message-modal.component.scss'
})
export class MessageModalComponent {

  @Input() message : string = '';
  @Output() modalClose = new EventEmitter<boolean>;

  constructor(){
  }

  ngOnInit(): void {
  }

  modalCloseClicked() {
    this.modalClose.emit(true);
  }

}
