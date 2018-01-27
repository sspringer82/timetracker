import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { configureStore } from './app/configureStore';
import { TimetrackTableContainer } from './timetrack/timetrackTable.container.component';
import { TimetrackForm } from './timetrack/timetrackForm.component';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" render={() => <Redirect to="/list" />} />
        <Route path="/list" component={TimetrackTableContainer} />
        <Route path="/form" component={TimetrackForm} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
