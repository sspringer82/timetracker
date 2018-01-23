import { connect } from 'react-redux';
import { TimetrackTable } from './timetrackTable.component';

const mapStateToProps = state => ({
  items: state.timetrack.items,
});
const mapDispatchToProps = dispatch => ({});

export const TimetrackTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TimetrackTable);
