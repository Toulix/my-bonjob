import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LayoutComponent } from './components/layout/layout.component';



@NgModule({
  declarations: [
    SpinnerComponent,
    ToolbarComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SpinnerComponent
  ]
})
export class SharedModule { }
