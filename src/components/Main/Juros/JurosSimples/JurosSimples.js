import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, Picker, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native';
import db from '../../../services/db';

export default class JurosSimples extends Component {

    state = {
        inputCapital: '',
        inputTaxa: '',
        escTaxa: '',
        inputTempo: '',
        escTempo: '',
        inputMontante: ''
    }

    componentDidMount() {
        if(this.props.navigation.state.params !== undefined){
            const item = this.props.navigation.state.params;
            this.setState({
                inputCapital: item.capital != null ? item.capital.toString() : '',
                inputTaxa: item.taxa != null ? item.taxa.toString() : '',
                escTaxa: item.escTaxa,
                inputTempo: item.tempo != null ? item.tempo.toString() : '',
                escTempo: item.escTempo,
                inputMontante: item.montante != null ? item.montante.toString() : ''
            })
        }else{
            this.setState({
                escTaxa: 'dia',
                escTempo: 'dia'
            })
        }
    }

    static navigationOptions = {
        title: 'Juros Simples',
        headerStyle: {
            backgroundColor: '#efdcd5',
        },
        headerTintColor: 'black',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    }

    onChangeInput = (input, esc) => {
        switch (esc) {
            case 'capital':
                this.setState({ inputCapital: input });
                break;
            case 'taxa':
                this.setState({ inputTaxa: input });
                break;
            case 'tempo':
                this.setState({ inputTempo: input });
                break;
            case 'montante':
                this.setState({ inputMontante: input });
                break;
            case 'escTaxa':
                this.setState({ escTaxa: input });
                break;
            case 'escTempo':
                this.setState({ escTempo: input });
                break;
            default:
                return;
        }
    }

    onSubmit = () => {
        if (this.state.inputMontante === '' && this.state.inputCapital != '' && this.state.inputTaxa != '' && this.state.inputTempo != '') {
            let taxa;
            if (this.state.escTaxa != this.state.escTempo) {
                if (this.state.escTaxa === 'dia' && this.state.escTempo === 'mes') {
                    taxa = this.state.inputTaxa * 30;
                } else if (this.state.escTaxa === 'ano' && this.state.escTempo === 'mes') {
                    taxa = this.state.inputTaxa / 12;
                } else if (this.state.escTaxa === 'dia' && this.state.escTempo === 'ano') {
                    taxa = this.state.inputTaxa * 360;
                } else if (this.state.escTaxa === 'mes' && this.state.escTempo === 'ano') {
                    taxa = this.state.inputTaxa * 12;
                } else if (this.state.escTaxa === 'mes' && this.state.escTempo === 'dia') {
                    taxa = this.state.inputTaxa / 30;
                } else if (this.state.escTaxa === 'ano' && this.state.escTempo === 'dia') {
                    taxa = this.state.inputTaxa / 360;
                } else {
                    taxa = this.state.inputTaxa;
                }

            } else {
                taxa = this.state.inputTaxa;
            }
            let montante = this.state.inputCapital * (1 + (taxa / 100) * this.state.inputTempo);
            Alert.alert('Resultado:', 'Montante: R$' + montante.toFixed(2) + '\nJuros: R$' + (montante - this.state.inputCapital).toFixed(2));
            db.transaction((tx) => {
                tx.executeSql(`INSERT INTO juros(capital, taxa, escTaxa, tempo, escTempo, montante, tipo) VALUES(${this.state.inputCapital != '' ? this.state.inputCapital : null}, ${this.state.inputTaxa != '' ? this.state.inputTaxa : null}, '${this.state.escTaxa}', ${this.state.inputTempo != '' ? this.state.inputTempo : null}, '${this.state.escTempo}', ${this.state.inputMontante != '' ? this.state.inputMontante : null}, 'JS');`, [], (tx, results) => {
                    console.log(results);
                });
            });

        } else if (this.state.inputMontante != '' && this.state.inputCapital === '' && this.state.inputTaxa != '' && this.state.inputTempo != '') {

            let taxa, tempo;
            if (this.state.escTaxa != this.state.escTempo) {
                if (this.state.escTaxa === 'dia' && this.state.escTempo === 'mes') {
                    taxa = this.state.inputTaxa * 30;
                } else if (this.state.escTaxa === 'ano' && this.state.escTempo === 'mes') {       
                    taxa = this.state.inputTaxa / 12;
                } else if (this.state.escTaxa === 'dia' && this.state.escTempo === 'ano') {
                    taxa = this.state.inputTaxa * 360;
                } else if (this.state.escTaxa === 'mes' && this.state.escTempo === 'ano') {
                    taxa = this.state.inputTaxa * 12;
                } else if (this.state.escTaxa === 'mes' && this.state.escTempo === 'dia') {
                    taxa = this.state.inputTaxa / 30;
                } else if (this.state.escTaxa === 'ano' && this.state.escTempo === 'dia') {
                    taxa = this.state.inputTaxa / 360;
                } else {
                    taxa = this.state.inputTaxa;
                }
            } else {
                taxa = this.state.inputTaxa;
            }

            let capital = this.state.inputMontante / (1 + ((taxa / 100) * this.state.inputTempo));
            Alert.alert('Resultado: ', 'Capital: R$' + capital.toFixed(2) + '\nJuros: R$' + (this.state.inputMontante - capital).toFixed(2));
            db.transaction((tx) => {
                tx.executeSql(`INSERT INTO juros(capital, taxa, escTaxa, tempo, escTempo, montante, tipo) VALUES(${this.state.inputCapital != '' ? this.state.inputCapital : null}, ${this.state.inputTaxa != '' ? this.state.inputTaxa : null}, '${this.state.escTaxa}', ${this.state.inputTempo != '' ? this.state.inputTempo : null}, '${this.state.escTempo}', ${this.state.inputMontante != '' ? this.state.inputMontante : null}, 'JS');`, [], (tx, results) => {
                    console.log(results);
                });
            });

        } else if (this.state.inputMontante != '' && this.state.inputCapital != '' && this.state.inputTaxa === '' && this.state.inputTempo != '') {

            let tempo, taxa;

            if (this.state.escTaxa != this.state.escTempo) {
                if (this.state.escTempo === 'dia' && this.state.escTaxa === 'mes') {
                    tempo = this.state.inputTempo / 30;
                } else if (this.state.escTempo === 'ano' && this.state.escTaxa === 'mes') {
                    tempo = this.state.inputTempo * 12;
                } else if (this.state.escTempo === 'mes' && this.state.escTaxa === 'dia') {
                    tempo = this.state.inputTempo * 30;
                } else if (this.state.escTempo === 'ano' && this.state.escTaxa === 'dia') {
                    tempo = (this.state.inputTempo * 12) * 30;
                } else if (this.state.escTempo === 'mes' && this.state.escTaxa === 'ano') {
                    tempo = this.state.inputTempo / 12;
                } else if (this.state.escTempo === 'dia' && this.state.escTaxa === 'ano') {
                    tempo = (this.state.inputTempo / 30) / 12;
                } else {
                    tempo = this.state.inputTempo;
                }

                taxa = (this.state.inputMontante - this.state.inputCapital) / (this.state.inputCapital * tempo);
            } else {
                taxa = (this.state.inputMontante - this.state.inputCapital) / (this.state.inputCapital * this.state.inputTempo);
            }

            Alert.alert('Resultado: ', 'Taxa: ' + (taxa * 100).toFixed(3) + '%');
            db.transaction((tx) => {
                tx.executeSql(`INSERT INTO juros(capital, taxa, escTaxa, tempo, escTempo, montante, tipo) VALUES(${this.state.inputCapital != '' ? this.state.inputCapital : null}, ${this.state.inputTaxa != '' ? this.state.inputTaxa : null}, '${this.state.escTaxa}', ${this.state.inputTempo != '' ? this.state.inputTempo : null}, '${this.state.escTempo}', ${this.state.inputMontante != '' ? this.state.inputMontante : null}, 'JS');`, [], (tx, results) => {
                    console.log(results);
                });
            });

        } else if (this.state.inputMontante != '' && this.state.inputCapital != '' && this.state.inputTaxa != '' && this.state.inputTempo === '') {

            let tempo;

            if (this.state.escTaxa != this.state.escTempo) {
                tempo = (this.state.inputMontante - this.state.inputCapital) / (this.state.inputCapital * (this.state.inputTaxa / 100));
                
                if (this.state.escTaxa === 'dia' && this.state.escTempo === 'mes') {
                    tempo = tempo / 30;
                } else if (this.state.escTaxa === 'ano' && this.state.escTempo === 'mes') {
                    tempo = tempo * 12;
                } else if (this.state.escTaxa === 'dia' && this.state.escTempo === 'ano') {
                    tempo = tempo / 360;
                } else if (this.state.escTaxa === 'mes' && this.state.escTempo === 'ano') {
                    tempo = tempo / 12;
                } else if (this.state.escTaxa === 'mes' && this.state.escTempo === 'dia') {
                    tempo = tempo * 30;
                } else if (this.state.escTaxa === 'ano' && this.state.escTempo === 'dia') {
                    tempo = tempo * 360;
                }
            } else {
                tempo = (this.state.inputMontante - this.state.inputCapital) / (this.state.inputCapital * (this.state.inputTaxa / 100));
            }

            Alert.alert('Resultado: ', 'Tempo: ' + tempo.toFixed(3));
            db.transaction((tx) => {
                tx.executeSql(`INSERT INTO juros(capital, taxa, escTaxa, tempo, escTempo, montante, tipo) VALUES(${this.state.inputCapital != '' ? this.state.inputCapital : null}, ${this.state.inputTaxa != '' ? this.state.inputTaxa : null}, '${this.state.escTaxa}', ${this.state.inputTempo != '' ? this.state.inputTempo : null}, '${this.state.escTempo}', ${this.state.inputMontante != '' ? this.state.inputMontante : null}, 'JS');`, [], (tx, results) => {
                    console.log(results);
                });
            });
        } else if (this.state.inputMontante != '' && this.state.inputCapital != '' && this.state.inputTaxa != '' && this.state.inputTempo != '') {
            let juros = this.state.inputMontante - this.state.inputCapital;
            Alert.alert('Resultado: ', 'Juros: ' + juros.toFixed(2));
            db.transaction((tx) => {
			tx.executeSql(`INSERT INTO juros(capital, taxa, escTaxa, tempo, escTempo, montante, tipo) VALUES(${this.state.inputCapital != '' ? this.state.inputCapital : null}, ${this.state.inputTaxa != '' ? this.state.inputTaxa : null}, '${this.state.escTaxa}', ${this.state.inputTempo != '' ? this.state.inputTempo : null}, '${this.state.escTempo}', ${this.state.inputMontante != '' ? this.state.inputMontante : null}, 'JS');`, [], (tx, results) => {
                console.log(results);
            });
        });
        } else {
            Alert.alert("Deixe no máximo um campo em vazio!");
        }
    }

    render() {
        console.log(this.state);
        return (
            <View style={styles.container}>
                <KeyboardAvoidingView behavior="padding">
                    <View style={styles.row}>
                        <Text style={styles.label}>Capital (C):   </Text>
                        <TextInput
                            placeholder='Capital (C)'
                            style={styles.inputCapital}
                            keyboardType='numeric'
                            value={this.state.inputCapital}
                            onChangeText={(text) => this.onChangeInput(text, 'capital')}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Taxa (i):   </Text>
                        <TextInput
                            placeholder='Taxa (i)'
                            style={styles.inputTaxa}
                            keyboardType='numeric'
                            value={this.state.inputTaxa}
                            onChangeText={(text) => this.onChangeInput(text, 'taxa')}
                        />
                        <Picker
                            selectedValue={this.state.escTaxa}
                            style={{ height: 50, width: 100 }}
                            onValueChange={(text) => this.onChangeInput(text, 'escTaxa')}>
                            <Picker.Item label="Dia" value="dia" />
                            <Picker.Item label="Mês" value="mes" />
                            <Picker.Item label="Ano" value="ano" />
                        </Picker>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Tempo (t):   </Text>
                        <TextInput
                            placeholder='Tempo (t)'
                            style={styles.inputTempo}
                            keyboardType='numeric'
                            value={this.state.inputTempo}
                            onChangeText={(text) => this.onChangeInput(text, 'tempo')}
                        />

                        <Picker
                            selectedValue={this.state.escTempo}
                            style={{ height: 50, width: 100 }}
                            onValueChange={(text) => this.onChangeInput(text, 'escTempo')}>
                            <Picker.Item label="Dia" value="dia" />
                            <Picker.Item label="Mês" value="mes" />
                            <Picker.Item label="Ano" value="ano" />
                        </Picker>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Montante (M):   </Text>
                        <TextInput
                            placeholder='Montante (M)'
                            style={styles.inputMontante}
                            keyboardType='numeric'
                            value={this.state.inputMontante}
                            onChangeText={(text) => this.onChangeInput(text, 'montante')}
                        />
                    </View>
                    <View style={styles.rowSubmit}>
                        <TouchableOpacity style={styles.buttonSubmit} onPress={() => this.onSubmit()}>
                            <Text style={styles.textSubmit}>Calcular!</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#efdcd5',
        padding: 20
    },
    row: {
        flex: 0.2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    },
    inputCapital: {
        width: '70%',
        borderColor: '#FFFFFF',
        backgroundColor: 'transparent',
        borderColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        padding: 0
    },
    inputTaxa: {
        width: '40%',
        borderColor: '#FFFFFF',
        backgroundColor: 'transparent',
        borderColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        padding: 0
    },
    inputTempo: {
        width: '40%',
        borderColor: '#FFFFFF',
        backgroundColor: 'transparent',
        borderColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        padding: 0
    },
    inputMontante: {
        width: '60%',
        borderColor: '#FFFFFF',
        backgroundColor: 'transparent',
        borderColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        padding: 0
    },
    rowSubmit: {
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: 2,
    },
    buttonSubmit: {
        padding: 10,
        backgroundColor: 'white',
        borderColor: 'black',
        borderRadius: 4
    },
    textSubmit: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'black'
    }
})