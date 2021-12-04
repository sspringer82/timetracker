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

  it('should work with a filter activated', async () => {
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

    fireEvent.change(screen.getByTestId('filter-input'), {
      target: { value: 'Mittagessen' },
    });
    fireEvent.click(screen.getByTestId('filter-submit'));

    const result = await screen.getAllByTestId('project');
    expect(result).toHaveLength(1);
    expect(result[0]).toHaveTextContent('Mittagessen');
  });

  it('should create a new entry', async () => {
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

    await act(async () => {
      fireEvent.change(screen.getByTestId('form-start'), {
        target: {
          value: '2021-01-01T08:30',
        },
      });
      fireEvent.change(screen.getByTestId('form-end'), {
        target: {
          value: '2021-01-01T10:30',
        },
      });
      fireEvent.change(screen.getByTestId('form-project'), {
        target: {
          value: 'arbeiten',
        },
      });
    });

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => {
          return Promise.resolve({
            id: 3,
            start: 1609486200000,
            end: 1609493400000,
            project: 'arbeiten',
          });
        },
      }),
    );

    await act(async () => {
      fireEvent.click(screen.getByTestId('form-submit'));
    });

    expect(global.fetch.mock.calls[0][1].method).toBe('POST');

    const body = JSON.parse(global.fetch.mock.calls[0][1].body);
    expect(body.start).toBe(1609486200000);
    expect(body.end).toBe(1609493400000);
    expect(body.project).toBe('arbeiten');

    const result = await screen.getAllByTestId('project');
    expect(result).toHaveLength(3);
  });
});
