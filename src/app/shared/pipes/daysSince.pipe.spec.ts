import { DaysSincePipe } from './daysSince.pipe';

describe('DaysSincePipe', () => {
  let pipe: DaysSincePipe;

  beforeEach(() => {
    pipe = new DaysSincePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return 0 for null or undefined input', () => {
    expect(pipe.transform(null as any)).toBe(0);
    expect(pipe.transform(undefined as any)).toBe(0);
  });

  it('should return the correct number of days since a given date string', () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 10);
    const pastDateString = pastDate.toISOString();
    expect(pipe.transform(pastDateString)).toBe(10);
  });

  it('should return the correct number of days since a given Date object', () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 5);
    expect(pipe.transform(pastDate)).toBe(5);
  });
});
