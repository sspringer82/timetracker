import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { TimetrackItem } from './timetrackItem.component';

export const TimetrackTable = ({ items, handleDelete }) => {
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
          {items.map(item => (
            <TimetrackItem
              key={item.id}
              item={item}
              handleDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
      <Link to="/new">Form</Link>
    </div>
  );
};

TimetrackTable.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      start: PropTypes.number,
      end: PropTypes.number,
      project: PropTypes.string,
      task: PropTypes.string,
    }),
  ).isRequired,
  handleDelete: PropTypes.func.isRequired,
};
