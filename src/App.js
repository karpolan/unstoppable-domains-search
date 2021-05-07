import React, { Component } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import { Main } from './views';
import AppStore from './store/AppStore';
import AppThemeProvider from './theme';

/**
 * Entry point of the Application
 * Configures Axios object to use as shared API across the app, see './api/index.js'
 * Renders "Login" or "Main" view depending on presence of "token" value in local store
 * Contains "token" and "currentUser" states
 * Provides onLogout() and onSetToken() callbacks
 * Adds Material UI provider with Light/Dark themes
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: 'exist',
      currentUser: {},
    };
  }

  onSetToken = (newToken) => {
    log.warn(`App.onSetToken(${newToken})`);
    this.setToken(newToken);
  };

  onLogout = () => {
    this.setToken(null);
  };

  render() {
    const { token, currentUser } = this.state;
    return (
      <AppStore>
        <ErrorBoundary name="App">
          <AppThemeProvider /* Material UI part of application */>
            <Main currentUser={currentUser} onLogout={this.onLogout} />
          </AppThemeProvider>
        </ErrorBoundary>
      </AppStore>
    );
  }
}

export default App;
