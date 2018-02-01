import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TimetrackTable } from './timetrackTable.component';
import { deleteTimetrack } from './timetrack.action';

const mapStateToProps = state => ({
  items: state.timetrack.items,
});
const mapDispatchToProps = dispatch => ({
  handleDelete: bindActionCreators(deleteTimetrack, dispatch),
});

export const TimetrackTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TimetrackTable);
