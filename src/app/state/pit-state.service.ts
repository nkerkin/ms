import { interval, map, Observable, scan, shareReplay, startWith } from 'rxjs';

import { createPitModel } from '../../domain/factories/pit.factory';
import { PitModel } from '../../domain/models/pit.model';
import { updatedVehicle } from '../../domain/utils/vehicle-movement.utils';

const CHANGE_INTERVAL_MS = 2000;

// Create an initial Pit state, usually this would come from an API call
export const INITIAL_PIT_STATE: PitModel = createPitModel({
  width: 1000,
  height: 800,
  zones: [
    { id: 'zone1', type: 'LOAD', bounds: { x: 50, y: 50, width: 100, height: 100 } }, // top-left
    { id: 'zone2', type: 'DUMP', bounds: { x: 750, y: 650, width: 80, height: 80 } }, // bottom-right
  ],
  vehicles: [
    {
      id: 'T-001',
      type: 'Truck',
      status: 'IDLE',
      bounds: { x: 200, y: 200, width: 50, height: 50 },
      speed: 0,
    },
    {
      id: 'T-002',
      type: 'Truck',
      status: 'IDLE',
      bounds: { x: 600, y: 600, width: 50, height: 50 },
      speed: 0,
    },
  ],
});

export class PitStateService {
  private readonly random$ = interval(CHANGE_INTERVAL_MS).pipe(
    startWith(0),
    map(() => Math.random())
  );

  readonly pitState$: Observable<PitModel>;

  // Service provided via factory in app.config.ts
  constructor(initialState: PitModel = INITIAL_PIT_STATE) {
    this.pitState$ = this.random$.pipe(
      scan<number, PitModel>((currentPit, rnd) => {
        const updatedVehicles = currentPit.vehicles.map((vehicle) =>
          updatedVehicle(rnd, vehicle, currentPit)
        );
        return { ...currentPit, vehicles: updatedVehicles };
      }, initialState),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }
}
