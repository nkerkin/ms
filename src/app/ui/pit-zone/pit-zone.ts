import { Component, computed, input } from '@angular/core';
import { PitZoneModel } from '../../../domain/models/pitZone.model';

const pitZoneConfigs = {
  LOAD: {
    backgroundColor: 'bg-red-400',
    label: 'Loading Zone',
  },
  DUMP: {
    backgroundColor: 'bg-blue-400',
    label: 'Dumping Zone',
  },
};

@Component({
  selector: 'ms-pit-zone',
  standalone: true,
  imports: [],
  template: `
    <p
      class="{{
        config().backgroundColor
      }} absolute text-white p-2 rounded-md text-center content-center"
      [style.width.px]="pitZone().bounds.width"
      [style.height.px]="pitZone().bounds.height"
      [style.left.px]="pitZone().bounds.x"
      [style.top.px]="pitZone().bounds.y"
    >
      {{ config().label }}
    </p>
  `,
})
export class PitZone {
  readonly pitZone = input.required<PitZoneModel>();
  readonly config = computed(() => pitZoneConfigs[this.pitZone().type]);
}
