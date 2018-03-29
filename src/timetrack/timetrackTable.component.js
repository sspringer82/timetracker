import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { TimetrackItem } from './timetrackItem.component';

const Table = styled.table`
  border-spacing: 0;
  margin: 0 auto;
`;

const Th = styled.th`
  background-color: #212529;
  color: white;
  padding: 10px;
`;

const CenterDiv = styled.div`
  text-align: center;
`;

export const TimetrackTable = ({ items, handleDelete }) => {
  return (
    <CenterDiv>
      <Table>
        <thead>
          <tr>
            <Th>From</Th>
            <Th>Until</Th>
            <Th>Diff</Th>
            <Th>Project</Th>
            <Th>Task</Th>
            <Th />
            <Th />
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
      </Table>
      <Link to="/new">
        <i className="far fa-file-alt" />
      </Link>
    </CenterDiv>
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
