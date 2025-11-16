import { Brand, Rect } from './types';

// Vehicle ID
type VehicleId = Brand<string, 'VehicleId'>;
export function makeVehicleId(value: string): VehicleId {
  return value as VehicleId;
}

// Vehicle Types
const VehicleTypes = {
  Truck: 'TRUCK',
  // Shovel: 'Shovel',
  // Excavator: 'Excavator',
  // etc
} as const;
export type VehicleType = keyof typeof VehicleTypes;

export function parseVehicleType(value: string): VehicleType {
  const vehicleTypeSet = new Set(Object.keys(VehicleTypes));
  if (vehicleTypeSet.has(value as VehicleType)) {
    return value as VehicleType;
  }
  throw new Error(`Invalid Vehicle Type: ${value}`);
}

// Vehicle Statuses
// TODO: should define based on VehicleType
const VehicleStatuses = {
  LOADING: 'LOADING',
  HAULING: 'HAULING',
  DUMPING: 'DUMPING',
  IDLE: 'IDLE',
} as const;
export type VehicleStatus = keyof typeof VehicleStatuses;

export function parseVehicleStatus(value: string): VehicleStatus {
  const statusSet = new Set(Object.keys(VehicleStatuses));
  if (statusSet.has(value as VehicleStatus)) {
    return value as VehicleStatus;
  }
  throw new Error(`Invalid Vehicle Status: ${value}`);
}

// Vehicle Model
export interface VehicleModel {
  id: VehicleId;
  type: VehicleType;
  bounds: Rect;
  status: VehicleStatus;
}
