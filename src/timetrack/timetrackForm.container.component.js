import { connect } from 'react-redux';
import { TimetrackForm } from './timetrackForm.component';
import { addTimetrack } from './timetrack.action';

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => ({
  onCreate: timetrack => dispatch(addTimetrack(timetrack)),
});

export const TimetrackFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TimetrackForm);
