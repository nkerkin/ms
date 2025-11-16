import { DecimalPipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { VehicleModel } from '../../../domain/models/vehicle.model';

const vehicleConfigs = {
  Truck: {
    backgroundColor: 'bg-red-400',
  },
} as const;

const vehicleStatusConfigs = {
  IDLE: {
    backgroundColor: 'bg-gray-600',
  },
  LOADING: {
    backgroundColor: 'bg-orange-900',
  },
  HAULING: {
    backgroundColor: 'bg-green-900',
  },
  DUMPING: {
    backgroundColor: 'bg-blue-900',
  },
} as const;

@Component({
  selector: 'ms-vehicle',
  standalone: true,
  imports: [DecimalPipe],
  template: `
    <div
      class="absolute transition-all duration-2000 ease-linear flex gap-2"
      [style.left.px]="vehicle().bounds.x"
      [style.top.px]="vehicle().bounds.y"
    >
      <div
        class="text-xs {{
          statusConfig().backgroundColor
        }} text-white p-2 rounded-full text-center content-center text-xs"
        [style.width.px]="vehicle().bounds.width"
        [style.height.px]="vehicle().bounds.height"
      >
        {{ vehicle().id }}
      </div>
      <div class="text-xs bg-white p-2 rounded-sm  text-xs shadow-md">
        <ol>
          <li>
            <span class="font-bold">Status: </span>
            <span>{{ vehicle().status }}</span>
          </li>
          <li>
            <span class="font-bold">Type: </span>
            <span>{{ vehicle().type }}</span>
          </li>
          <li>
            <span class="font-bold">Speed: </span>
            <span>{{ vehicle().speed | number : '1.2-2' }} km/h</span>
          </li>
        </ol>
      </div>
    </div>
  `,
})
export class Vehicle {
  readonly vehicle = input.required<VehicleModel>();
  readonly config = computed(() => vehicleConfigs[this.vehicle().type]);
  readonly statusConfig = computed(() => vehicleStatusConfigs[this.vehicle().status]);
}
