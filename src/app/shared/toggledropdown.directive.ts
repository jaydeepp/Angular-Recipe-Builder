import { Directive, HostListener, ElementRef, Renderer2, HostBinding } from '@angular/core';

@Directive({
  selector: '[appToggledropdown]'
})
export class ToggledropdownDirective {

  @HostBinding('class.open') isOpen = false;

  @HostListener('click') mouseclick(event: Event) {

    this.isOpen = !this.isOpen;

  }

  constructor(private elRef:ElementRef,private renderer:Renderer2) { }

}
