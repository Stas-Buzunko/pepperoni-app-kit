import {Provider} from 'react-redux';
import store from './src/redux/store';
import AppViewContainer from './src/modules/AppViewContainer';
import React, {Component} from 'react';
import {AppRegistry, BackAndroid} from 'react-native';
import {NavigationActions} from 'react-navigation';

class PepperoniAppTemplate extends Component {
  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.navigateBack);
  }

  navigateBack() {
    // const navigationState = store.getState().navigationState;

    // const tabs = navigationState.tabs;
    // const tabKey = tabs.routes[tabs.index].key;
    // const currentTab = navigationState[tabKey];

    // // if we are in the beginning of our tab stack
    // if (currentTab.index === 0) {

    //   // if we are not in the first tab, switch tab to the leftmost one
    //   if (tabs.index !== 0) {
    //     store.dispatch(NavigationStateActions.switchTab(0));
    //     return true;
    //   }

    //   // otherwise let OS handle the back button action
    //   return false;
    const navigatorState = store.getState().get('navigatorState');

    const currentStackScreen = navigatorState.get('index');
    const currentTab = navigatorState.getIn(['routes', 0, 'index']);

    if (currentTab !== 0 || currentStackScreen !== 0) {
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
