import { addMinutes, parseISO } from 'date-fns';
import sumBookings from './sumBookings';
describe('sumBookings', () => {
  it('should sum up an array of Bookings', () => {
    const bookings = [
      {
        id: 1,
        start: 1627884000000,
        end: 1627889400000,
        project: 'Frühstück',
      },
      {
        id: 2,
        start: 1627797600000,
        end: 1627801200000,
        project: 'Frühstück',
      },
      {
        id: 3,
        start: 1627812000000,
        end: 1627815600000,
        project: 'Mittagessen',
      },
    ];
    const result = sumBookings(bookings);
    const expected = addMinutes(parseISO('2021-01-01'), 210);
    expect(result).toStrictEqual(expected);
  });
});
