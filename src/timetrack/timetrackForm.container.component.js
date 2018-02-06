import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { TimetrackForm } from './timetrackForm.component';
import { addTimetrack } from './timetrack.action';

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
});

export const TimetrackFormContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TimetrackForm),
);
