import { Component, input } from '@angular/core';

import { PitModel } from '../../../domain/models/pit.model';
import { PitZone } from '../pit-zone/pit-zone';
import { Vehicle } from '../vehicle/vehicle';

@Component({
  selector: 'ms-pit',
  standalone: true,
  imports: [PitZone, Vehicle],
  template: `
    <div
      class="relative bg-green-100 rounded-lg shadow-lg"
      [style.width.px]="pit().width"
      [style.height.px]="pit().height"
    >
      @for (zone of pit().zones; track zone.id) {
      <ms-pit-zone [pitZone]="zone"></ms-pit-zone>
      } @for (vehicle of pit().vehicles; track vehicle.id) {
      <ms-vehicle [vehicle]="vehicle"></ms-vehicle>
      }
    </div>
  `,
})
export class Pit {
  readonly pit = input.required<PitModel>();
}
