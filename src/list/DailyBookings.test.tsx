import { render, screen } from "@testing-library/react";
import { addHours, addMinutes, format, getTime } from "date-fns";
import { Booking } from "../Booking";
import DailyBookings from "./DailyBookings";

describe("DailyBookings", () => {
  it("should show the two items and calculate the sum", () => {
    const bookings: Booking[] = [
      {
        id: 1,
        start: 1627798500000,
        end: 1627806600000,
        project: "Frühstück",
      },
      {
        id: 2,
        start: 1627812000000,
        end: 1627815600000,
        project: "Mittagessen",
      },
    ];

    render(
      <DailyBookings
        bookings={bookings}
        onDelete={jest.fn()}
        onSave={jest.fn()}
        editMode={null}
        setEditMode={jest.fn()}
      />
    );

    expect(screen.getByTestId("day")).toHaveTextContent("01.08.2021");
    expect(screen.getAllByTestId("project")).toHaveLength(2);
    expect(screen.getByTestId("sum")).toHaveTextContent("03:15");
  });

  const data = [
    {
      color: "green",
      hours: 7,
      minutes: 55,
    },
    {
      color: "green",
      hours: 8,
      minutes: 5,
    },
    {
      color: "orange",
      hours: 7,
      minutes: 25,
    },
    {
      color: "orange",
      hours: 8,
      minutes: 35,
    },
    {
      color: "red",
      hours: 6,
      minutes: 55,
    },
    {
      color: "red",
      hours: 9,
      minutes: 5,
    },
  ];
  describe.each(data)("sum styling", ({ color, hours, minutes }) => {
    it(`should be ${color} for ${hours}:${minutes}`, () => {
      const start = new Date("2022-08-01T06:15:00.000Z");
      const end = addMinutes(addHours(start, hours), minutes);
      const bookings: Booking[] = [
        {
          id: 1,
          start: getTime(start),
          end: getTime(end),
          project: "Frühstück",
        },
      ];
      render(
        <DailyBookings
          bookings={bookings}
          onDelete={jest.fn()}
          onSave={jest.fn()}
          editMode={null}
          setEditMode={jest.fn()}
        />
      );
      expect(screen.getByTestId("daily-sum")).toHaveStyle(`color: ${color}`);
    });
  });
});
