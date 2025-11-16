import { PitModel } from '../models/pit.model';
import { makeNonNegativeNumber, NonNegativeNumber, Rect, rectIntersects } from '../models/types';
import { VehicleModel } from '../models/vehicle.model';

// Some utils purely for generating random data for this exercise. Not particularly useful for a real application, and hence no tests are provided

const CHANGE_INTERVAL_MS = 2000;

// Calculate speed in units per second based on position change
export function calculateSpeed(
  oldBounds: Rect,
  newBounds: { x: NonNegativeNumber; y: NonNegativeNumber }
): NonNegativeNumber {
  const deltaX = newBounds.x - oldBounds.x;
  const deltaY = newBounds.y - oldBounds.y;
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  const timeIntervalSeconds = CHANGE_INTERVAL_MS / 1000;
  return makeNonNegativeNumber(distance / timeIntervalSeconds);
}

// always move towards the target zone, with randomized X/Y steps for non-uniform path
export function newCoordsTowardsZone(
  rnd: number,
  source: Rect,
  target: Rect
): { x: NonNegativeNumber; y: NonNegativeNumber } {
  const deltaX = target.x - source.x;
  const deltaY = target.y - source.y;
  const stepSize = 100; // max step size per update
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

  if (distance === 0) {
    return { x: source.x, y: source.y }; // already at target, prevent division by zero
  }

  // Derive two different random values from the single rnd parameter for non-uniform movement
  const rndX = rnd;
  const rndY = (rnd * 7.919) % 1;
  const stepX = (deltaX / distance) * stepSize * rndX;
  const stepY = (deltaY / distance) * stepSize * rndY;
  return { x: makeNonNegativeNumber(source.x + stepX), y: makeNonNegativeNumber(source.y + stepY) };
}

// Generate a new position and status based on a random number
// Expects a single Load and Dump zone in the Pit
export function updatedVehicle(rnd: number, vehicle: VehicleModel, pit: PitModel): VehicleModel {
  const loadZone = pit.zones.find((zone) => zone.type === 'LOAD')!;
  const dumpZone = pit.zones.find((zone) => zone.type === 'DUMP')!;

  // use the vehicle id to get a different random number
  const vehicleHash = vehicle.id
    .split('')
    .reduce((sum, char, idx) => sum + char.charCodeAt(0) * (idx + 1), 0);
  const vehicleRnd = (rnd * vehicleHash) % 1;

  const actions: { [key: string]: () => VehicleModel } = {
    IDLE: () => {
      // Reach load zone, change to Loading
      // Not exactly realistic but sufficient for demo
      if (rectIntersects(vehicle.bounds, loadZone.bounds))
        return { ...vehicle, status: 'LOADING', speed: makeNonNegativeNumber(0) };
      // generally move towards load zone
      const updated = newCoordsTowardsZone(vehicleRnd, vehicle.bounds, loadZone.bounds);
      const speed = calculateSpeed(vehicle.bounds, updated);
      return { ...vehicle, bounds: { ...vehicle.bounds, ...updated }, speed };
    },
    LOADING: () => {
      // 30% chance to switch to Hauling
      if (rnd < 0.3) return { ...vehicle, status: 'HAULING' };
      return vehicle;
    },
    HAULING: () => {
      // Reach dump zone, change to Dumping
      if (rectIntersects(vehicle.bounds, dumpZone.bounds))
        return { ...vehicle, status: 'DUMPING', speed: makeNonNegativeNumber(0) };
      // generally move towards dump zone
      const updated = newCoordsTowardsZone(vehicleRnd, vehicle.bounds, dumpZone.bounds);
      const speed = calculateSpeed(vehicle.bounds, updated);
      return { ...vehicle, bounds: { ...vehicle.bounds, ...updated }, speed };
    },
    DUMPING: () => {
      // 50% chance to switch to Idle
      if (rnd < 0.5) return { ...vehicle, status: 'IDLE' };
      return vehicle;
    },
  };

  // apply
  return actions[vehicle.status]();
}
