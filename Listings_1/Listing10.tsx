import { fireEvent, render, screen } from '@testing-library/react';
import BookingsList from './BookingsList';

describe('BookingsList', () => {
  it('should render a List with 3 Bookings on 2 different days', () => {
    render(<BookingsList />);

    const projects = screen.getAllByTestId('project');
    expect(projects[0]).toHaveTextContent('Frühstück');
    expect(projects[1]).toHaveTextContent('Mittagessen');
    expect(projects[2]).toHaveTextContent('Frühstück');

    const sums = screen.getAllByTestId('sum');
    expect(sums[0]).toHaveTextContent('02:00');
    expect(sums[1]).toHaveTextContent('01:30');
  });

  it('should correctly delete a booking', () => {
    render(<BookingsList />);

    fireEvent.click(screen.getAllByTestId('delete-button')[0]);

    expect(screen.getAllByTestId('project')).toHaveLength(2);
  });
});
