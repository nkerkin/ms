import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { PitStateService } from './state/pit-state.service';
import { Pit } from './ui/pit/pit';

@Component({
  selector: 'ms-root',
  standalone: true,
  imports: [Pit],
  template: `
    <div
      class="flex flex-col items-center justify-center h-screen w-screen bg-gradient-to-b from-gray-200 to-blue-100 gap-4"
    >
      <h1 class="text-2xl font-bold">{{ title() }}!</h1>
      <ms-pit [pit]="pit()"></ms-pit>
    </div>
  `,
  styles: [],
})
export class App {
  protected readonly title = signal('Mine Site Truck Tracking System');
  private readonly pitStateService = inject(PitStateService);
  protected readonly pit = toSignal(this.pitStateService.pitState$, { requireSync: true });
}
