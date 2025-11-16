import { createPitModel, PitDto } from './pit.factory';

const validPitDto: PitDto = {
  width: 1000,
  height: 800,
  zones: [
    { id: 'zone1', type: 'LOAD', bounds: { x: 0, y: 0, width: 500, height: 400 } },
    { id: 'zone2', type: 'DUMP', bounds: { x: 500, y: 0, width: 500, height: 400 } },
  ],
  vehicles: [
    {
      id: 'veh1',
      type: 'Truck',
      bounds: { x: 100, y: 100, width: 50, height: 30 },
      status: 'IDLE',
    },
  ],
};

describe('createPitModel', () => {
  // baseline test with known good data
  it('should create a PitModel from a valid PitDto', () => {
    // arrange
    const dto = validPitDto;

    // act
    const model = createPitModel(dto);

    // assert
    expect(model).toBeDefined();
  });

  // vehicle tests
  it('should throw an error if there are duplicate Vehicle IDs', () => {
    // arrange
    const vehicle = validPitDto.vehicles[0];
    const dto: PitDto = {
      ...validPitDto,
      vehicles: [vehicle, vehicle], // duplicate
    };

    // act & assert
    expect(() => createPitModel(dto)).toThrowError('Pit must not have Duplicate Vehicle IDs');
  });

  it('should throw an error if any Vehicle exceeds Pit bounds', () => {
    const vehicle = {
      ...validPitDto.vehicles[0],
      bounds: { x: 950, y: 780, width: 100, height: 50 }, // exceeds pit bounds
    };

    // arrange
    const dto: PitDto = {
      ...validPitDto,
      vehicles: [{ ...vehicle }],
    };

    // act & assert
    expect(() => createPitModel(dto)).toThrowError(
      'All Vehicles must be contained within Pit bounds: Vehicle Id - veh1'
    );
  });

  // zone tests
  it('should throw an error if there are no Load zones', () => {
    // arrange
    const dto: PitDto = {
      ...validPitDto,
      zones: validPitDto.zones.filter((z) => z.type !== 'LOAD'),
    };
    // act & assert
    expect(() => createPitModel(dto)).toThrowError('Pit must have at least one LOAD zone');
  });

  it('should throw an error if there are no Dump zones', () => {
    // arrange
    const dto: PitDto = {
      ...validPitDto,
      zones: validPitDto.zones.filter((z) => z.type !== 'DUMP'),
    };
    // act & assert
    expect(() => createPitModel(dto)).toThrowError('Pit must have at least one DUMP zone');
  });

  it('should throw an error if there are duplicate Zone Ids', () => {
    const zoneId = validPitDto.zones[0].id;
    // arrange
    const zone = validPitDto.zones[0];
    const dto: PitDto = {
      ...validPitDto,
      zones: validPitDto.zones.map((z) => ({ ...z, id: zoneId })), // duplicate Ids regardless of type
    };

    // act & assert
    expect(() => createPitModel(dto)).toThrowError('Pit must not have Duplicate Zone IDs');
  });

  it('should throw an error if any Zone exceeds Pit bounds', () => {
    const zone = {
      ...validPitDto.zones[0],
      bounds: { x: 900, y: 700, width: 200, height: 150 }, // exceeds pit bounds
    };
    const dto: PitDto = {
      ...validPitDto,
      zones: [validPitDto.zones[1], zone],
    };

    // act & assert
    expect(() => createPitModel(dto)).toThrowError(
      'All Zones must be contained within Pit bounds: Zone Id - zone1'
    );
  });
});
