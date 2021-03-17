import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Note from './pages/note';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/note">
          <Note />
        </Route>
      </Switch>
      <Redirect to="/note" />
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

// 模块热更新
if (module.hot) {
  module.hot.accept();
}
