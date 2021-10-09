import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import BookingsList from './BookingsList';

describe('BookingsList', () => {
  beforeEach(() => {
    fetch.mockReset && fetch.mockReset();
  });

  it('should load data from the server', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
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
          ]),
      }),
    );

    await act(async () => {
      render(<BookingsList />);
    });

    const result = await screen.getAllByTestId('project');
    expect(result).toHaveLength(3);
  });
});
