import { NgModule } from '@angular/core';
import { ToggledropdownDirective } from './toggledropdown.directive';
import { CommonModule } from '@angular/common';

@NgModule({
declarations:[
    ToggledropdownDirective
],
exports:[
    CommonModule,
    ToggledropdownDirective
]

})
export class SharedModule{
}