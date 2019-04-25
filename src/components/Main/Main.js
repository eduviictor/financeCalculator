import React, { Component } from 'react';
import { FlatList, Text, View, Button, StyleSheet, TouchableOpacity } from 'react-native';

// const initialState = {
//   0: {
//     title: 'Juros Simples'
//   },
//   1: {
//     title: 'Juros Compostos'
//   }
// }

export default class Main extends Component {

  // componentDidMount(){
  //   this.setState({
  //     itensMenu: initialState
  //   })
  // }

  static navigationOptions = {
    title: 'Calculadora Financeira',
    headerStyle: {
      backgroundColor: '#1a237e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }

  renderMenu = ({ item }) => {
    <View>
      <Text>{item.id}</Text>
    </View>
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity 
          onPress={() => {this.props.navigation.push('JurosSimples')}}
          style={styles.button}
        >
          <Text style={styles.textButton}>Juros Simples</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => {this.props.navigation.push('JurosSimples')}}
          style={styles.button}
        >
          <Text style={styles.textButton}>Juros Compostos</Text>
        </TouchableOpacity>
      </View>
      // <FlatList 
      // data={this.state.itensMenu}
      // renderItem={() => this.renderMenu()}
      
      // />
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
  },
  button: {
    backgroundColor: '#534bae',
    padding: 10,
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
    width: 150,
    marginTop: 10
  },
  textButton: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16
  }
});