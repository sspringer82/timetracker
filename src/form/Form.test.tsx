import {
  act,
  findByText,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import Form from './Form';

describe('Form', () => {
  it('should create a new dataset', async () => {
    const onSave = jest.fn();

    await act(async () => {
      await render(<Form onSave={onSave} />);
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
    await act(async () => {
      fireEvent.click(screen.getByTestId('form-submit'));
    });

    expect(onSave).toHaveBeenCalledWith({
      start: 1609486200000,
      end: 1609493400000,
      project: 'arbeiten',
    });
  });

  it('should edit an existing dataset', async () => {
    const onSave = jest.fn();

    const existing = {
      id: 42,
      start: 1609486200000,
      end: 1609493400000,
      project: 'arbeiten',
    };

    await act(async () => {
      await render(<Form onSave={onSave} booking={existing} />);
    });

    await act(async () => {
      fireEvent.change(screen.getByTestId('form-project'), {
        target: {
          value: 'schlafen',
        },
      });
    });
    await act(async () => {
      fireEvent.click(screen.getByTestId('form-submit'));
    });

    expect(onSave).toHaveBeenCalledWith({
      id: 42,
      start: 1609486200000,
      end: 1609493400000,
      project: 'schlafen',
    });
  });

  it('should validate correctly', async () => {
    const onSave = jest.fn();

    await act(async () => {
      await render(<Form onSave={onSave} />);
    });

    await act(async () => {
      fireEvent.change(screen.getByTestId('form-start'), {
        target: {
          value: '2021-01-01T08:30',
        },
      });
      fireEvent.change(screen.getByTestId('form-end'), {
        target: {
          value: '2021-01-01T07:30',
        },
      });
    });

    await act(async () => {
      fireEvent.click(screen.getByTestId('form-submit'));
    });

    expect(onSave).not.toHaveBeenCalled();
    expect(
      await screen.findByText('Ende darf nicht vor Start liegen'),
    ).toBeInTheDocument();
    expect(
      await screen.findByText('Projekt ist ein Pflichtfeld'),
    ).toBeInTheDocument();
  });
});
