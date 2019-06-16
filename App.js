import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";

import './src/config/StatusBarConfig';

// Components
import Main from './src/components/Main/Main';
import JurosSimples from './src/components/Juros/JurosSimples/JurosSimples';
import JurosCompostos from './src//components/Juros/JurosCompostos/JurosCompostos';
import DescontoSimples from './src/components/Desconto/DescontoSimples/DescontoSimples';
import DescontoComposto from './src/components/Desconto/DescontoComposto/DescontoComposto';

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
  Main,
  JurosSimples,
  JurosCompostos,
  DescontoSimples,
  DescontoComposto
},{
  initialRouteName: "DescontoComposto",
}
);

export default createAppContainer(AppNavigator);