it('should be possible to delete an item', () => {
  const handleDelete = jest.fn();

  render(<BookingItem booking={booking} onDelete={handleDelete} />);

  fireEvent.click(screen.getByTestId('delete-button'));

  expect(handleDelete).toHaveBeenCalledWith(1);
});
