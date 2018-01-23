import React from 'react';

export const TimetrackItem = ({ item }) => {
  return (
    <tr>
      <td>{item.start}</td>
      <td>{item.end}</td>
      <td>{item.end - item.start}</td>
      <td>{item.project}</td>
      <td>{item.task}</td>
    </tr>
  );
};
