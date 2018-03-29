import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Td = styled.td`
  border-bottom: 1px solid #dee2e6;
  padding: 10px;
`;

const Black = styled.span`
  color: black;
`;

const Tr = styled.tr`
  &:hover {
    background-color: lightgrey;
  }
`;

const Delete = styled.div`
  cursor: pointer;
`;

export const TimetrackItem = ({ item, handleDelete }) => {
  return (
    <Tr>
      <Td>{item.start}</Td>
      <Td>{item.end}</Td>
      <Td>{item.end - item.start}</Td>
      <Td>{item.project}</Td>
      <Td>{item.task}</Td>
      <Td>
        <Delete onClick={() => handleDelete(item)}>
          <i className="fas fa-trash" />
        </Delete>
      </Td>
      <Td>
        <Link to={`/edit/${item.id}`}>
          <Black>
            <i className="fas fa-edit" />
          </Black>
        </Link>
      </Td>
    </Tr>
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
