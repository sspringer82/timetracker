import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const TimetrackItem = ({ item, handleDelete }) => {
  return (
    <tr>
      <td>{item.start}</td>
      <td>{item.end}</td>
      <td>{item.end - item.start}</td>
      <td>{item.project}</td>
      <td>{item.task}</td>
      <td>
        <button onClick={() => handleDelete(item)}>delete</button>
      </td>
      <td>
        <Link to={`/edit/${item.id}`}>edit</Link>
      </td>
    </tr>
  );
};

TimetrackItem.propTypes = {
  item: PropTypes.shape({
    start: PropTypes.number,
    end: PropTypes.number,
    project: PropTypes.string,
    task: PropTypes.string,
  }).isRequired,
  handleDelete: PropTypes.func.isRequired,
};
