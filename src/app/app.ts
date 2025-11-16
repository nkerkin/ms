import { Component, signal } from '@angular/core';

@Component({
  selector: 'ms-root',
  imports: [],
  template: `
    <h1>Welcome to {{ title() }}!</h1>

    
  `,
  styles: [],
})
export class App {
  protected readonly title = signal('mstts');
}
