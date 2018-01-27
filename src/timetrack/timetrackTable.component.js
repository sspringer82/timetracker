import React from 'react';

import { Link } from 'react-router-dom';

import { TimetrackItem } from './timetrackItem.component';

export const TimetrackTable = ({ items }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>From</th>
            <th>Until</th>
            <th>Diff</th>
            <th>Project</th>
            <th>Task</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => <TimetrackItem key={item.id} item={item} />)}
        </tbody>
      </table>
      <Link to="/form">Form</Link>
    </div>
  );
};
