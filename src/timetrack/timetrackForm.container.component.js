import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { TimetrackForm } from './timetrackForm.component';
import { addTimetrack, updateTimetrack } from './timetrack.action';

const mapStateToProps = (state, props) => {
  const { id } = props.match.params;
  return {
    timetrack: state.timetrack.find(
      timetrack => parseInt(timetrack.id, 10) === parseInt(id, 10),
    ),
  };
};
const mapDispatchToProps = dispatch => ({
  onCreate: timetrack => dispatch(addTimetrack(timetrack)),
  onUpdate: timetrack => dispatch(updateTimetrack(timetrack)),
});

export const TimetrackFormContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TimetrackForm),
);
