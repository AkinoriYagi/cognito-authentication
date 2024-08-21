import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageModalComponent } from './message-modal/message-modal.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    MessageModalComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    MessageModalComponent
  ]
})
export class ComponentsModule { }
