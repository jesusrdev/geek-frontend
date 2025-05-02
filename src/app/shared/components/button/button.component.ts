import { Component, input, output } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
  imports: [NgClass]
})
export class ButtonComponent {
  public readonly text = input<string>('');

  public readonly color = input<string>('primary');

  public readonly class = input<string>('');

  public readonly disabled = input<boolean>(false);

  public readonly type = input<string>('button');

  public readonly handleClick = output();

  clickEmit() {
    this.handleClick.emit();
  }
}
