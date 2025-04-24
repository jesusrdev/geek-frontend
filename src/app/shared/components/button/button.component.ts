import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrl: './button.component.css',
    standalone: false
})
export class ButtonComponent {
  @Input()
  public text: string = '';

  @Input()
  public color: string = 'primary';

  @Input()
  public class: string = '';

  @Input()
  public disabled: boolean = false;

  @Input()
  public type: string = 'button';

  @Output()
  public handleClick: EventEmitter<any> = new EventEmitter();

  clickEmit() {
    this.handleClick.emit();
  }
}
