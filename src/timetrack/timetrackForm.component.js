import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { timetrackShape } from './timetrack.type';

const Label = styled.label`
  display: block;
  margin: 5px 0;
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 10px;
`;

const Form = styled.form`
  width: 50%;
  margin: 15px auto;
`;

const Submit = styled.button`
  margin: 5px 0;
`;

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
      <Form onSubmit={e => this.handleSubmit(e)}>
        <div>
          <Label htmlFor="start">Start:</Label>
          <Input
            type="text"
            id="start"
            name="start"
            onChange={e => this.handleChange(e)}
            value={this.state.start}
          />
        </div>
        <div>
          <Label htmlFor="end">Ende:</Label>
          <Input
            type="text"
            id="end"
            name="end"
            onChange={e => this.handleChange(e)}
            value={this.state.end}
          />
        </div>
        <div>
          <Label htmlFor="project">Projekt:</Label>
          <Input
            type="text"
            id="project"
            name="project"
            onChange={e => this.handleChange(e)}
            value={this.state.project}
          />
        </div>
        <div>
          <Label htmlFor="task">Task:</Label>
          <Input
            type="text"
            id="task"
            name="task"
            onChange={e => this.handleChange(e)}
            value={this.state.task}
          />
        </div>

        <Submit>submit</Submit>
      </Form>
    );
  }
}

TimetrackForm.propTypes = {
  onCreate: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  timetrack: timetrackShape,
};
