import React, { Component } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import { Main } from './views';
import AppStore from './store/AppStore';
import AppThemeProvider from './theme';

/**
 * Entry point of the Application
 */
class App extends Component {
  render() {
    return (
      <AppStore>
        <ErrorBoundary name="App">
          <AppThemeProvider /* Material UI part of application */>
            <Main />
          </AppThemeProvider>
        </ErrorBoundary>
      </AppStore>
    );
  }
}

export default App;
