import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";

import './src/config/StatusBarConfig';

// Components
import Main from './src/components/Main/Main';
import JurosSimples from './src/components/Main/Juros/JurosSimples/JurosSimples';
import JurosCompostos from './src//components/Main/Juros/JurosCompostos/JurosCompostos';
import DescontoSimples from './src/components/Main/Desconto/DescontoSimples/DescontoSimples';
import DescontoComposto from './src/components/Main/Desconto/DescontoComposto/DescontoComposto';
import Historico from './src/components/Main/Historico/Historico';

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
  DescontoComposto,
  Historico
},{
  initialRouteName: "Main",
}
);

export default createAppContainer(AppNavigator);