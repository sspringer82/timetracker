import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
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

const Button = styled.button`
  margin: 5px 0;
  border-radius: 6px;
  padding: 5px;
`;

const Submit = Button.extend``;

const Cancel = Button.extend`
  margin-left: 10px;
`;

export class TimetrackForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.timetrack,
    };
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

        <Link to="/list" href="/list">
          <Cancel>cancel</Cancel>
        </Link>
      </Form>
    );
  }
}

TimetrackForm.defaultProps = {
  timetrack: {
    start: 0,
    end: 0,
    project: '',
    task: '',
  },
};

TimetrackForm.propTypes = {
  onCreate: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  timetrack: timetrackShape,
};
