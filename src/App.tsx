import React, { useState } from 'react';
import './App.css';
import Form from './Form';
import List from './List';
import Log from './Log';
import { logContext } from './logContext';

function App() {
  const [logs, setLogs] = useState<Log[]>([]);
  return (
    <logContext.Provider value={[logs, setLogs]}>
      <h1>Time tracker</h1>
      <Form />
      <List />
    </logContext.Provider>
  );
}

export default App;
