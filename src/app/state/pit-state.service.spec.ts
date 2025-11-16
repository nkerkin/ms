import { fakeAsync, tick } from '@angular/core/testing';

import { INITIAL_PIT_STATE, PitStateService } from './pit-state.service';

describe('PitStateService', () => {
  let service: PitStateService;

  beforeEach(() => {
    // ideally we would use a builder pattern to create the base state, but for now we'll just re-use the initial state
    const baseState = INITIAL_PIT_STATE;
    service = new PitStateService(baseState);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should emit the initial pit state immediately on subscription', (done) => {
    // act
    service.pitState$.subscribe((pitState) => {
      // assert
      expect(pitState).toBeDefined();
      done();
    });
  });

  it('should emit a new state after the interval (2000ms)', fakeAsync(() => {
    // arrange
    const emissions: any[] = [];

    // act
    service.pitState$.subscribe((pitState) => {
      emissions.push(pitState);
    });

    tick(2000);

    // assert
    expect(emissions.length).toBe(2); // initial + one after interval
    expect(emissions[0]).not.toBe(emissions[1]); // different object references
  }));
});
