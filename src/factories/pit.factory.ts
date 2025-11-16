import { PitModel } from '../models/pit.model';
import { makePitZoneId, parsePitZoneType, PitZoneModel } from '../models/pitZone.model';
import { makeNonNegativeNumber, makePositiveNumber, makeRect, rectContains } from '../models/types';
import {
  makeVehicleId,
  parseVehicleStatus,
  parseVehicleType,
  VehicleModel,
} from '../models/vehicle.model';

// DTO objects, typically received from API responses, hence the plain primitive types.
export interface PitDto {
  width: number;
  height: number;
  zones: PitZoneDto[];
  vehicles: VehicleDto[];
}

export interface PitZoneDto {
  id: string;
  type: string;
  bounds: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface VehicleDto {
  id: string;
  type: string;
  bounds: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  status: string;
}

export function createPitModel(dto: PitDto): PitModel {
  const vehicles: VehicleModel[] = dto.vehicles.map((vehicle) => ({
    id: makeVehicleId(vehicle.id),
    type: parseVehicleType(vehicle.type),
    bounds: {
      x: makeNonNegativeNumber(vehicle.bounds.x),
      y: makeNonNegativeNumber(vehicle.bounds.y),
      width: makePositiveNumber(vehicle.bounds.width),
      height: makePositiveNumber(vehicle.bounds.height),
    },
    status: parseVehicleStatus(vehicle.status),
  }));

  if (vehicles.map((v) => v.id).length !== new Set(vehicles.map((v) => v.id)).size) {
    throw new Error('Pit must not have Duplicate Vehicle IDs');
  }

  //   vehicles must be contained within pit bounds
  const pitBounds = makeRect(0, 0, dto.width, dto.height);
  vehicles.every((vehicle) =>
    (rectContains(pitBounds, vehicle.bounds)
      ? () => true
      : () => {
          throw new Error(
            `All Vehicles must be contained within Pit bounds: Vehicle Id - ${vehicle.id}`
          );
        })()
  );

  // Pit Zones
  const zones: PitZoneModel[] = dto.zones.map((zone) => ({
    id: makePitZoneId(zone.id),
    type: parsePitZoneType(zone.type),
    bounds: {
      x: makeNonNegativeNumber(zone.bounds.x),
      y: makeNonNegativeNumber(zone.bounds.y),
      width: makePositiveNumber(zone.bounds.width),
      height: makePositiveNumber(zone.bounds.height),
    },
  }));

  // No duplicate Zone Ids
  if (zones.map((z) => z.id).length !== new Set(zones.map((z) => z.id)).size) {
    throw new Error('Pit must not have Duplicate Zone IDs');
  }

  // Must have at least one Load and one Dump zone
  if (!zones.find((z) => z.type === 'LOAD')) {
    throw new Error('Pit must have at least one LOAD zone');
  }

  if (!zones.find((z) => z.type === 'DUMP')) {
    throw new Error('Pit must have at least one DUMP zone');
  }

  // Zones must be contained within pit bounds
  zones.every((zone) =>
    (rectContains(pitBounds, zone.bounds)
      ? () => true
      : () => {
          throw new Error(`All Zones must be contained within Pit bounds: Zone Id - ${zone.id}`);
        })()
  );

  // Construct and return PitModel
  return {
    width: makePositiveNumber(dto.width),
    height: makePositiveNumber(dto.height),
    zones,
    vehicles,
  };
}
