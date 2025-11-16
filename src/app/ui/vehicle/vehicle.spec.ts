import { ComponentFixture, TestBed } from '@angular/core/testing';

import { makeNonNegativeNumber } from '../../../domain/models/types/nonNegativeNumber';
import { makeRect } from '../../../domain/models/types/rect';
import { makeVehicleId, VehicleModel } from '../../../domain/models/vehicle.model';
import { Vehicle } from './vehicle';

const baseVehicle: VehicleModel = {
  id: makeVehicleId('vehicle-1'),
  type: 'Truck',
  status: 'IDLE',
  speed: makeNonNegativeNumber(0),
  bounds: makeRect(0, 0, 40, 40),
};

describe('Vehicle', () => {
  let component: Vehicle;
  let fixture: ComponentFixture<Vehicle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Vehicle],
    }).compileComponents();

    fixture = TestBed.createComponent(Vehicle);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('vehicle', baseVehicle);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render vehicle id', () => {
    fixture.componentRef.setInput('vehicle', {
      ...baseVehicle,
      id: makeVehicleId('truck-123'),
    });

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('truck-123');
  });

  it('should render vehicle status', () => {
    fixture.componentRef.setInput('vehicle', {
      ...baseVehicle,
      status: 'HAULING',
    });

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Status:');
    expect(compiled.textContent).toContain('HAULING');
  });

  it('should render vehicle type', () => {
    fixture.componentRef.setInput('vehicle', {
      ...baseVehicle,
      type: 'Truck',
    });

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Type:');
    expect(compiled.textContent).toContain('Truck');
  });

  it('should render vehicle speed', () => {
    fixture.componentRef.setInput('vehicle', {
      ...baseVehicle,
      speed: makeNonNegativeNumber(25.5),
    });

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Speed:');
    expect(compiled.textContent).toContain('25.50 km/h');
  });

  it('should apply bg-gray-600 class for IDLE status', () => {
    fixture.componentRef.setInput('vehicle', {
      ...baseVehicle,
      status: 'IDLE',
    });

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const vehicleCircle = compiled.querySelector('.bg-gray-600');
    expect(vehicleCircle).toBeTruthy();
  });

  it('should apply bg-orange-900 class for LOADING status', () => {
    fixture.componentRef.setInput('vehicle', {
      ...baseVehicle,
      status: 'LOADING',
    });

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const vehicleCircle = compiled.querySelector('.bg-orange-900');
    expect(vehicleCircle).toBeTruthy();
  });

  it('should apply bg-green-900 class for HAULING status', () => {
    fixture.componentRef.setInput('vehicle', {
      ...baseVehicle,
      status: 'HAULING',
    });

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const vehicleCircle = compiled.querySelector('.bg-green-900');
    expect(vehicleCircle).toBeTruthy();
  });

  it('should apply bg-blue-900 class for DUMPING status', () => {
    fixture.componentRef.setInput('vehicle', {
      ...baseVehicle,
      status: 'DUMPING',
    });

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const vehicleCircle = compiled.querySelector('.bg-blue-900');
    expect(vehicleCircle).toBeTruthy();
  });
});
