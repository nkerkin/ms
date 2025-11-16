import { PitZoneModel } from './pitZone.model';
import { PositiveNumber } from './types';
import { VehicleModel } from './vehicle.model';

export interface PitModel {
  width: PositiveNumber;
  height: PositiveNumber;
  zones: PitZoneModel[];
  vehicles: VehicleModel[];
}
