import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import NotFound from './pages/NotFound';

class App extends React.Component {
  state = {
    Log: false,
  };

  loginIn = () => {
    this.setState({
      Log: true,
    }); console.log(Log);
  };

  render() {
    const { Log } = this.state;
    return (
      <p id="Routes">
        <h1>TrybeTunes</h1>
        <Switch>
          <Route exact path="/">
            {' '}
            { Log ? <Redirect to="/search" />
              : <Login loginIn={ this.loginIn } /> }
            {' '}
          </Route>
          <Route exact path="/search" component={ Search } />
          <Route exact path="/album/:id" component={ Album } />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/Profile/edit" component={ ProfileEdit } />
          <Route exact path="*" component={ NotFound } />
        </Switch>
      </p>
    );
  }
}
export default App;
