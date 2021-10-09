import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import BookingsList from './BookingsList';

describe('BookingsList', () => {
  it('should delete data from the server', async () => {
    global.fetch = jest.fn((url, options) => {
      if (options && options.method === 'delete') {
        return Promise.resolve();
      } else {
        return Promise.resolve({
          json: () => {
            return Promise.resolve([
              {
                id: 4,
                start: 1627884000000,
                end: 1627889400000,
                project: 'Frühstück',
              },
            ]);
          },
        });
      }
    });

    await act(async () => {
      render(<BookingsList />);
    });

    await act(async () => {
      fireEvent.click(screen.getByTestId('delete-button'));
    });

    expect(global.fetch).toHaveBeenNthCalledWith(
      2,
      'http://localhost:3001/bookings/4',
      { method: 'delete' },
    );
  });
});
