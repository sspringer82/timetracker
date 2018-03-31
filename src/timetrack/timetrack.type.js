import PropTypes from 'prop-types';

export const timetrackShape = PropTypes.shape({
  start: PropTypes.number,
  end: PropTypes.number,
  project: PropTypes.string,
  task: PropTypes.string,
});
