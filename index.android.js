import {Provider} from 'react-redux';
import store from './src/redux/store';
import AppViewContainer from './src/modules/AppViewContainer';
import React, {Component} from 'react';
import {AppRegistry, BackHandler} from 'react-native';
import {NavigationActions} from 'react-navigation';

class PepperoniAppTemplate extends Component {
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.navigateBack);
  }

  navigateBack() {
    const {navigatorState} = store.getState();

    const {index} = navigatorState.routes;
    const currentTab = navigatorState.routes[index];

    // if we are in the beginning of our tab stack
    if (currentTab !== 0 || index !== 0) {
      store.dispatch(NavigationActions.back());
      return true;
    }
    // otherwise let OS handle the back button action
    return false;
  }

  render() {
    return (
      <Provider store={store}>
        <AppViewContainer />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('PepperoniAppTemplate', () => PepperoniAppTemplate);
