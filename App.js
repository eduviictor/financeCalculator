import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";

import './src/config/StatusBarConfig';

// Components
import Main from './src/components/Main/Main';
import JurosSimples from './src/components/Juros/JurosSimples/JurosSimples';


class App extends Component {

  render() {
    return (
      <View style={styles.container}>
        {/* <Main {...this.props} /> */}
      </View>
    );
  }
}


const AppNavigator = createStackNavigator({
  Home: Main,
  JurosSimples: JurosSimples
},{
  initialRouteName: "JurosSimples"
}
);

export default createAppContainer(AppNavigator);