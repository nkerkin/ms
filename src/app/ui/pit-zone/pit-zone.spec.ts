import { ComponentFixture, TestBed } from '@angular/core/testing';

import { makePitZoneId } from '../../../domain/models/pitZone.model';
import { makeRect } from '../../../domain/models/types/rect';
import { PitZone } from './pit-zone';

describe('PitZone', () => {
  let component: PitZone;
  let fixture: ComponentFixture<PitZone>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PitZone],
    }).compileComponents();

    fixture = TestBed.createComponent(PitZone);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('pitZone', {
      id: makePitZoneId('zone-1'),
      type: 'LOAD',
      bounds: makeRect(0, 0, 100, 100),
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render "Loading Zone" label for LOAD type', () => {
    fixture.componentRef.setInput('pitZone', {
      id: makePitZoneId('zone-1'),
      type: 'LOAD',
      bounds: makeRect(0, 0, 100, 100),
    });

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const paragraph = compiled.querySelector('p');

    expect(paragraph.textContent.trim()).toBe('Loading Zone');
  });

  it('should render "Dumping Zone" label for DUMP type', () => {
    fixture.componentRef.setInput('pitZone', {
      id: makePitZoneId('zone-2'),
      type: 'DUMP',
      bounds: makeRect(0, 0, 100, 100),
    });

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const paragraph = compiled.querySelector('p');

    expect(paragraph.textContent.trim()).toBe('Dumping Zone');
  });
});
