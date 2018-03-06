import React from 'react';
import PropTypes from 'prop-types';

export class TimetrackForm extends React.Component {
  constructor(props) {
    super(props);
    if (!props.timetrack) {
      this.state = {
        id: 0,
        start: 0,
        end: 0,
        project: '',
        task: '',
      };
    } else {
      this.state = {
        ...props.timetrack,
      };
    }
  }

  componentWillReceiveProps({ timetrack }) {
    this.setState({ ...timetrack });
  }

  handleChange({ target: { name, value } }) {
    this.setState(prev => ({ ...prev, [name]: value }));
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.id === 0) {
      this.props.onCreate(this.state);
    } else {
      this.props.onUpdate(this.state);
    }
  }

  render() {
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        <div>
          <label htmlFor="start">Start:</label>
          <input
            type="text"
            id="start"
            name="start"
            onChange={e => this.handleChange(e)}
            value={this.state.start}
          />
        </div>
        <div>
          <label htmlFor="end">Ende:</label>
          <input
            type="text"
            id="end"
            name="end"
            onChange={e => this.handleChange(e)}
            value={this.state.end}
          />
        </div>
        <div>
          <label htmlFor="project">Projekt:</label>
          <input
            type="text"
            id="project"
            name="project"
            onChange={e => this.handleChange(e)}
            value={this.state.project}
          />
        </div>
        <div>
          <label htmlFor="task">Task:</label>
          <input
            type="text"
            id="task"
            name="task"
            onChange={e => this.handleChange(e)}
            value={this.state.task}
          />
        </div>

        <button>submit</button>
      </form>
    );
  }
}

TimetrackForm.props = {
  onCreate: PropTypes.func,
  onUpdate: PropTypes.func,
  timetrack: PropTypes.any,
};
