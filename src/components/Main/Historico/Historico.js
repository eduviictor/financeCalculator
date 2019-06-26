import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import db from '../../services/db';

import Item from './Item/Item';


export default class Historico extends Component {

    state = {
        juros: null,
        // desconto: []
    }

    static navigationOptions = {
        title: 'Histórico',
        headerStyle: {
            backgroundColor: '#8c7b75',
        },
        headerTintColor: 'black',
        headerTitleStyle: {
            fontWeight: 'bold',
        }
    }

    // ALTER TABLE juros juros ADD tipo TEXT
    componentDidMount() {
		db.transaction((tx) => {
            // tx.executeSql("DROP TABLE juros", [], (tx, results) => {
            //     console.log(results)
            // });
            // tx.executeSql("DELETE FROM juros", [], (tx, results) => {
            //     console.log(results)
            // });
            // tx.executeSql("ALTER TABLE juros AUTOINCREMENT = 1", [], () => {});
            // tx.executeSql("CREATE TABLE if not exists desconto(id integer primary key autoincrement, nominal real, taxa real, escTaxa text, tempo real, escTempo, atual real, tipo text)", [], (tx, results) => {
            //     console.log('teste', results);
            // });

            tx.executeSql("SELECT * FROM desconto", [], (tx, results) => {
                let itens = [];

				for (let i = 0; i < results.rows.length; i++) {
                    // console.log('teste', results.rows.item(i).capital);
					itens.push({
						...results.rows.item(i),
					});
                };
				this.setState({
                    desconto: itens
                });
            });
            
			tx.executeSql("SELECT * FROM juros", [], (tx, results) => {
                let itens = [];

				for (let i = 0; i < results.rows.length; i++) {
                    // console.log('teste', results.rows.item(i).capital);
					itens.push({
						...results.rows.item(i),
					});
                };
				this.setState({
                    juros: itens
                });
            });

			// tx.executeSql("INSERT INTO juros(capital, taxa, escTaxa, tempo, escTempo, montante) VALUES(1000, 5, 'mes', 2, 'mes', 2000);", [], (tx, results) => {
			// 	console.log(results);
			// });
        });

		// console.log(test)
		// console.log(db);

		// db.transaction((tx, results) => {
		// 	tx.executeSql("SELECT * FROM juros");
		// 	console.log('resutados', results);
        // })
        
    }

    handleClickItem = (item) => {
        if(item.tipo === 'JS'){
            this.props.navigation.push('JurosSimples', item);
        } else if (item.tipo === 'JC'){
            this.props.navigation.push('JurosCompostos', item);
        } else if (item.tipo === 'DSC' || item.tipo === 'DSR'){
            this.props.navigation.push('DescontoSimples', item);
        } else if (item.tipo === 'DCC' || item.tipo === 'DCR'){
            this.props.navigation.push('DescontoComposto', item);
        }
    }
    
    renderItem = ({ item }) => {
        return (
            <Item handleClickItem={this.handleClickItem} item={item}/>
        )
    }

    render() {
        return (
            <View>
                <FlatList 
                    data={this.state.desconto}
                    keyExtractor={item => item.id.toString()}
                    renderItem={this.renderItem}
                    contentContainerStyle={styles.list} 
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#ccc',
    },
    list: {
		padding: 10
	},
});