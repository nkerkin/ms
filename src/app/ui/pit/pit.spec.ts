import { ComponentFixture, TestBed } from '@angular/core/testing';

import { makePitZoneId } from '../../../domain/models/pitZone.model';
import { makeNonNegativeNumber } from '../../../domain/models/types/nonNegativeNumber';
import { makePositiveNumber } from '../../../domain/models/types/positiveNumber';
import { makeRect } from '../../../domain/models/types/rect';
import { makeVehicleId } from '../../../domain/models/vehicle.model';
import { Pit } from './pit';

describe('Pit', () => {
  let component: Pit;
  let fixture: ComponentFixture<Pit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pit],
    }).compileComponents();

    fixture = TestBed.createComponent(Pit);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('pit', {
      width: 800,
      height: 600,
      zones: [],
      vehicles: [],
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render zones and vehicles', () => {
    fixture.componentRef.setInput('pit', {
      width: makePositiveNumber(800),
      height: makePositiveNumber(600),
      zones: [
        {
          id: makePitZoneId('zone-1'),
          type: 'LOAD',
          bounds: makeRect(50, 50, 100, 100),
        },
        {
          id: makePitZoneId('zone-2'),
          type: 'DUMP',
          bounds: makeRect(200, 200, 100, 100),
        },
      ],
      vehicles: [
        {
          id: makeVehicleId('vehicle-1'),
          type: 'Truck',
          bounds: makeRect(100, 100, 50, 50),
          status: 'IDLE',
          speed: makeNonNegativeNumber(10),
        },
      ],
    });

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const zones = compiled.querySelectorAll('ms-pit-zone');
    const vehicles = compiled.querySelectorAll('ms-vehicle');

    expect(zones.length).toBe(2);
    expect(vehicles.length).toBe(1);
  });
});
