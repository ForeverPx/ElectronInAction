import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import JsonFile from './pages/jsonFile';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/jsonfile">
          <JsonFile />
        </Route>
        <Route path="/indexDB">
          <JsonFile />
        </Route>
      </Switch>
      <Redirect to="/jsonfile" />
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

// 模块热更新
if (module.hot) {
  module.hot.accept();
}
