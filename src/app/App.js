import React, { Component } from 'react';
import { TimetrackTable } from '../timetrack/timetrackTable.component';

const items = [
  {
    id: 1,
    start: 1516705200000,
    end: 1516708800000,
    project: 'Test project',
    task: 'Test task',
  },
];

class App extends Component {
  render() {
    return <TimetrackTable items={items} />;
  }
}

export default App;
