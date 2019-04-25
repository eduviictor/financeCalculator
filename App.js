import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";

import './src/config/StatusBarConfig';

// Components
import Main from './src/components/Main/Main';
import JurosSimples from './src/components/Juros/JurosSimples/JurosSimples';
import JurosCompostos from './src//components/Juros/JurosCompostos/JurosCompostos';


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
  JurosSimples: JurosSimples,
  JurosCompostos: JurosCompostos
},{
  initialRouteName: "Home",
}
);

export default createAppContainer(AppNavigator);