import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import App from './App';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { BookingsProvider } from './BookingsContext';
import BookingsList from './list/BookingsList';

declare let global: any;

describe('App', () => {
  it('renders', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => {
          return Promise.resolve([]);
        },
      })
    );

    await act(async () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>
      );
    });
    const headline = screen.queryByText('Timetracker');
    expect(headline).toBeInTheDocument();

    const sum = screen.queryByTestId('filter-submit');
    expect(sum).toBeInTheDocument();

    const notfound = screen.queryByText('Not Found');
    expect(notfound).not.toBeInTheDocument();
  });

  it('renders not found for invalid path', () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => {
          return Promise.resolve([]);
        },
      })
    );
    render(
      <MemoryRouter initialEntries={['/xxx/yyy']}>
        <App />
      </MemoryRouter>
    );
    const headline = screen.getByText('Timetracker');
    expect(headline).toBeInTheDocument();

    const sum = screen.queryByTestId('filter-submit');
    expect(sum).not.toBeInTheDocument();

    const notfound = screen.queryByText('Not Found');
    expect(notfound).toBeInTheDocument();
  });

  it('should create a new entry', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => {
          return Promise.resolve([]);
        },
      })
    );
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/create']}>
          <App />
        </MemoryRouter>
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
          return Promise.resolve([]);
        },
      })
    );

    await act(async () => {
      fireEvent.click(screen.getByTestId('form-submit'));
    });

    expect(global.fetch.mock.calls[0][1].method).toBe('POST');

    const body = JSON.parse(global.fetch.mock.calls[0][1].body);
    expect(body.start).toBe(1609486200000);
    expect(body.end).toBe(1609493400000);
    expect(body.project).toBe('arbeiten');
  });

  it('edit a booking via router', async () => {
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
            {
              id: 3,
              start: 1627812000000,
              end: 1627815600000,
              project: 'Abendessen',
            },
          ]);
        },
      })
    );

    await act(async () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>
      );
    });

    act(() => {
      fireEvent.click(screen.getByTestId('edit-link-2'));
    });

    expect(screen.getByTestId('form-start')).toHaveValue('2021-08-01T08:00');
    expect(screen.getByTestId('form-end')).toHaveValue('2021-08-01T09:00');
    expect(screen.getByTestId('form-project')).toHaveValue('Mittagessen');
  });

  it('open edit dialog via router', async () => {
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
            {
              id: 3,
              start: 1627812000000,
              end: 1627815600000,
              project: 'Abendessen',
            },
          ]);
        },
      })
    );

    await act(async () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>
      );
    });

    expect(screen.queryByTestId('edit-dialog')).not.toBeInTheDocument();

    act(() => {
      fireEvent.click(screen.getByTestId('open-link-2'));
    });

    expect(screen.queryByTestId('edit-dialog')).toBeInTheDocument();

    expect(screen.getByTestId('form-start')).toHaveValue('2021-08-01T08:00');
    expect(screen.getByTestId('form-end')).toHaveValue('2021-08-01T09:00');
    expect(screen.getByTestId('form-project')).toHaveValue('Mittagessen');
  });
});
