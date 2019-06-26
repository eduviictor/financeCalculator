import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Button } from 'react-native';

export default class Main extends Component {

	static navigationOptions = ({ navigation }) => {
		return {
			title: 'Calculadora Financeira',
			headerStyle: {
				backgroundColor: '#bcaaa4',
			},
			headerTintColor: 'black',
			headerTitleStyle: {
				fontWeight: 'bold',
			},
			headerRight: (
				<Button
					onPress={() => navigation.push('Historico')}
					title="+1"
					color="#fff"
				/>
			)
		}
	}

	renderMenu = ({ item }) => {
		<View>
			<Text>{item.id}</Text>
		</View>
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.row}>
					<TouchableOpacity
						onPress={() => { this.props.navigation.push('JurosSimples') }}
						style={Object.assign({
							backgroundColor: '#efdcd5'
						}, styles.button)}
					>
						<Text style={styles.textButton}>Juros Simples</Text>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => { this.props.navigation.push('JurosCompostos') }}
						style={Object.assign({
							backgroundColor: '#8c7b75'
						}, styles.button)}
					>
						<Text style={styles.textButton}>Juros Compostos</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.row}>
					<TouchableOpacity
						onPress={() => { this.props.navigation.push('DescontoSimples') }}
						style={Object.assign({
							backgroundColor: '#8c7b75'
						}, styles.button)}
					>
						<Text style={styles.textButton}>Desconto Simples</Text>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => { this.props.navigation.push('DescontoComposto') }}
						style={Object.assign({
							backgroundColor: '#efdcd5'
						}, styles.button)}
					>
						<Text style={styles.textButton}>Desconto Composto</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		// alignItems: 'stretch',
		backgroundColor: '#ccc',
	},
	row: {
		flex: 1,
		flexDirection: 'row'
	},
	button: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		// borderColor: 'black',
		// borderWidth: 1,
		width: '50%',
	},
	textButton: {
		fontWeight: 'bold',
		color: 'black',
		fontSize: 18
	}
});