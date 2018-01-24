import React from 'react';

class TimetrackForm extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      start: 0,
      end: 0,
      project: '',
      task: '',
    };
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState(prev => {
      return { ...prev, [name]: value };
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onCreateEntry(this.state);
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
