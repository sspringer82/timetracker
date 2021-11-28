import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { BookingsProvider } from '../BookingsContext';
import BookingsList from './BookingsList';

describe('BookingsList', () => {
  it.skip('should render a List with 3 Bookings on 2 different days', () => {
    render(<BookingsList />);

    const projects = screen.getAllByTestId('project');
    expect(projects[0]).toHaveTextContent('Frühstück');
    expect(projects[1]).toHaveTextContent('Mittagessen');
    expect(projects[2]).toHaveTextContent('Frühstück');

    const sums = screen.getAllByTestId('sum');
    expect(sums[0]).toHaveTextContent('02:00');
    expect(sums[1]).toHaveTextContent('01:30');
  });

  it.skip('should correctly delete a booking', () => {
    render(<BookingsList />);

    fireEvent.click(screen.getAllByTestId('delete-button')[0]);

    expect(screen.getAllByTestId('project')).toHaveLength(2);
  });

  beforeEach(() => {
    fetch.mockReset && fetch.mockReset();
  });

  it('should load data from the server', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => {
          return Promise.resolve([
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
          ]);
        },
      }),
    );

    await act(async () => {
      render(
        <BookingsProvider>
          <BookingsList />
        </BookingsProvider>,
      );
    });

    const result = await screen.getAllByTestId('project');
    expect(result).toHaveLength(3);
  });

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
      render(
        <BookingsProvider>
          <BookingsList />
        </BookingsProvider>,
      );
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
