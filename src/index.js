import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Redirect } from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';
import { configureStore, history } from './app/configureStore';
import { TimetrackTableContainer } from './timetrack/timetrackTable.container.component';
import { TimetrackFormContainer } from './timetrack/timetrackForm.container.component';
import './index.css';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Route exact path="/" render={() => <Redirect to="/list" />} />
        <Route path="/list" component={TimetrackTableContainer} />
        <Route path="/form" component={TimetrackFormContainer} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
