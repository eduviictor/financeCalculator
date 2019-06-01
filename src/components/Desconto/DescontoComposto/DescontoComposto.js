import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, Picker, TouchableOpacity } from 'react-native';

export default class DescontoComposto extends Component {

    state = {
        escDesconto: '',
        inputNominal: '',
        inputTaxa: '',
        escTaxa: '',
        inputTempo: '',
        escTempo: '',
        inputAtual: ''
    }

    static navigationOptions = {
        title: 'Desconto Composto',
        headerStyle: {
            backgroundColor: '#efdcd5',
        },
        headerTintColor: 'black',
        headerTitleStyle: {
            fontWeight: 'bold',
        }
    }

    componentDidMount() {
        this.setState({
            escTaxa: 'dia',
            escTempo: 'dia',
            escDesconto: 'comercial'
        })
    }

    onChangeInput = (input, esc) => {
        switch (esc) {
            case 'escDesconto':
                this.setState({ escDesconto: input });
            case 'nominal':
                this.setState({ inputNominal: input });
                break;
            case 'taxa':
                this.setState({ inputTaxa: input });
                break;
            case 'tempo':
                this.setState({ inputTempo: input });
                break;
            case 'atual':
                this.setState({ inputAtual: input });
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
        if (this.state.escDesconto === 'comercial') {
            if (this.state.inputNominal === '' && this.state.inputAtual != '' && this.state.inputTaxa != '' && this.state.inputTempo != '') {
                let taxa, tempo;
                if (this.state.escTaxa != this.state.escTempo) {
                    if (this.state.escTaxa === 'dia') {
                        taxa = this.state.inputTaxa * 30;
                    } else if (this.state.escTaxa === 'ano') {
                        taxa = this.state.inputTaxa / 12;
                    } else {
                        taxa = this.state.inputTaxa;
                    }

                    if (this.state.escTempo === 'dia') {
                        tempo = this.state.inputTempo / 30;
                    } else if (this.state.escTempo === 'ano') {
                        tempo = this.state.inputTempo * 12;
                    } else {
                        tempo = this.state.inputTempo;
                    }
                } else {
                    taxa = this.state.inputTaxa;
                    tempo = this.state.inputTempo;
                }

                let nominal = this.state.inputAtual / Math.pow((1 - (taxa / 100)), tempo);
                alert('Nominal: R$' + nominal);

            } else if (this.state.inputNominal != '' && this.state.inputAtual === '' && this.state.inputTaxa != '' && this.state.inputTempo != '') {

                let taxa, tempo;
                if (this.state.escTaxa != this.state.escTempo) {
                    if (this.state.escTaxa === 'dia') {
                        taxa = this.state.inputTaxa * 30;
                    } else if (this.state.escTaxa === 'ano') {
                        taxa = this.state.inputTaxa / 12;
                    } else {
                        taxa = this.state.inputTaxa;
                    }

                    if (this.state.escTempo === 'dia') {
                        tempo = this.state.inputTempo / 30;
                    } else if (this.state.escTempo === 'ano') {
                        tempo = this.state.inputTempo * 12;
                    } else {
                        tempo = this.state.inputTempo;
                    }
                } else {
                    taxa = this.state.inputTaxa;
                    tempo = this.state.inputTempo;
                }

                let atual = this.state.inputNominal * Math.pow((1 - (taxa / 100)), tempo);
                alert('Após desconto: R$' + atual);

            } else if (this.state.inputNominal != '' && this.state.inputAtual != '' && this.state.inputTaxa === '' && this.state.inputTempo != '') {

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

                    taxa = 1 - (Math.pow(this.state.inputAtual / this.state.inputNominal, 1/tempo))
                } else {
                    tempo = this.state.inputTempo;
                    taxa = 1 - (Math.pow(this.state.inputAtual / this.state.inputNominal, 1/tempo))
                }
                alert('Taxa: ' + taxa * 100 + '%');

            } else if (this.state.inputNominal != '' && this.state.inputAtual != '' && this.state.inputTaxa != '' && this.state.inputTempo === '') {

                let taxa, tempo;

                if (this.state.escTaxa != this.state.escTempo) {
                    if (this.state.escTempo === 'dia' && this.state.escTaxa === 'mes') {
                        taxa = Math.pow(1 + (this.state.inputTaxa / 100), 1 / 30) - 1;
                    } else if (this.state.escTempo === 'ano' && this.state.escTaxa === 'mes') {
                        taxa = Math.pow(1 + (this.state.inputTaxa / 100), 12) - 1;
                    } else if (this.state.escTempo === 'mes' && this.state.escTaxa === 'dia') {
                        taxa = Math.pow(1 + (this.state.inputTaxa / 100), 30) - 1;
                    } else if (this.state.escTempo === 'ano' && this.state.escTaxa === 'dia') {
                        taxa = Math.pow(1 + (this.state.inputTaxa / 100), 360) - 1;
                    } else if (this.state.escTempo === 'mes' && this.state.escTaxa === 'ano') {
                        taxa = Math.pow(1 + (this.state.inputTaxa / 100), 1 / 12) - 1;
                    } else if (this.state.escTempo === 'dia' && this.state.escTaxa === 'ano') {
                        taxa = Math.pow(1 + (this.state.inputTaxa / 100), 1 / 360) - 1;
                    } else {
                        taxa = this.state.inputTaxa;
                    }
                    // console.log(this.state);
                    // console.log('log 1', Math.log(this.state.inputAtual / this.state.inputNominal));
                    // let log2 = Math.log(taxa / 100); //Ta dando número negativo ao querer dia/ano, mes/ano
                    // console.log('log 2', log2);
                    tempo = Math.log(1 - (this.state.inputAtual / this.state.inputNominal)) / Math.log(taxa / 100);
                } else {
                    taxa = this.state.inputTaxa / 100;
                    // let log2 = Math.log(taxa); //Ta dando número negativo ao querer dia/ano, mes/ano
                    // console.log('log 2', log2);
                    tempo = Math.log(1 - (this.state.inputAtual / this.state.inputNominal)) / Math.log(taxa);
                }

                alert('Tempo: ' + tempo);
            }
        } else if (this.state.escDesconto === 'racional') {
            if (this.state.inputNominal === '' && this.state.inputAtual != '' && this.state.inputTaxa != '' && this.state.inputTempo != '') {
                let taxa, tempo;
                if (this.state.escTaxa != this.state.escTempo) {
                    if (this.state.escTaxa === 'dia') {
                        taxa = this.state.inputTaxa * 30;
                    } else if (this.state.escTaxa === 'ano') {
                        taxa = this.state.inputTaxa / 12;
                    } else {
                        taxa = this.state.inputTaxa;
                    }

                    if (this.state.escTempo === 'dia') {
                        tempo = this.state.inputTempo / 30;
                    } else if (this.state.escTempo === 'ano') {
                        tempo = this.state.inputTempo * 12;
                    } else {
                        tempo = this.state.inputTempo;
                    }
                } else {
                    taxa = this.state.inputTaxa;
                    tempo = this.state.inputTempo;
                }

                let nominal = this.state.inputAtual * (1 + (taxa / 100) * tempo);
                alert('Nominal: R$' + nominal);

            } else if (this.state.inputNominal != '' && this.state.inputAtual === '' && this.state.inputTaxa != '' && this.state.inputTempo != '') {

                let taxa, tempo;
                if (this.state.escTaxa != this.state.escTempo) {
                    if (this.state.escTaxa === 'dia') {
                        taxa = this.state.inputTaxa * 30;
                    } else if (this.state.escTaxa === 'ano') {
                        taxa = this.state.inputTaxa / 12;
                    } else {
                        taxa = this.state.inputTaxa;
                    }

                    if (this.state.escTempo === 'dia') {
                        tempo = this.state.inputTempo / 30;
                    } else if (this.state.escTempo === 'ano') {
                        tempo = this.state.inputTempo * 12;
                    } else {
                        tempo = this.state.inputTempo;
                    }
                } else {
                    taxa = this.state.inputTaxa;
                    tempo = this.state.inputTempo;
                }

                let atual = this.state.inputNominal / (1 + (taxa / 100) * tempo);
                alert('Após desconto: R$' + atual);

            } else if (this.state.inputNominal != '' && this.state.inputAtual != '' && this.state.inputTaxa === '' && this.state.inputTempo != '') {

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

                    taxa = ((this.state.inputNominal / this.state.inputAtual) - 1) / tempo;
                } else {
                    tempo = this.state.inputTempo;
                    taxa = ((this.state.inputNominal / this.state.inputAtual) - 1) / tempo;
                }
                alert('Taxa: ' + taxa * 100 + '%');

            } else if (this.state.inputNominal != '' && this.state.inputAtual != '' && this.state.inputTaxa != '' && this.state.inputTempo === '') {

                let taxa, tempo;

                if (this.state.escTaxa != this.state.escTempo) {
                    if (this.state.escTempo === 'dia' && this.state.escTaxa === 'mes') {
                        taxa = this.state.inputTaxa / 30;
                    } else if (this.state.escTempo === 'ano' && this.state.escTaxa === 'mes') {
                        taxa = this.state.inputTaxa * 12;
                    } else if (this.state.escTempo === 'mes' && this.state.escTaxa === 'dia') {
                        taxa = this.state.inputTaxa * 30;
                    } else if (this.state.escTempo === 'ano' && this.state.escTaxa === 'dia') {
                        taxa = (this.state.inputTaxa * 12) * 30;
                    } else if (this.state.escTempo === 'mes' && this.state.escTaxa === 'ano') {
                        taxa = this.state.inputTaxa / 12;
                    } else if (this.state.escTempo === 'dia' && this.state.escTaxa === 'ano') {
                        taxa = (this.state.inputTaxa / 30) / 12;
                    } else {
                        taxa = this.state.inputTaxa;
                    }

                    tempo = ((this.state.inputNominal / this.state.inputAtual) - 1) / (taxa / 100);
                } else {
                    taxa = this.state.inputTaxa / 100;
                    tempo = ((this.state.inputNominal / this.state.inputAtual) - 1) / taxa;
                }

                alert('Tempo: ' + tempo);
            }
        }

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <Text style={styles.label}>Desconto: </Text>
                    <Picker
                        selectedValue={this.state.escDesconto}
                        style={{ height: 50, width: '70%' }}
                        onValueChange={(text) => this.onChangeInput(text, 'escDesconto')}>
                        <Picker.Item label="Comercial" value="comercial" />
                        <Picker.Item label="Racional" value="racional" />
                    </Picker>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Nominal (N): </Text>
                    <TextInput
                        placeholder='Nominal (N)'
                        style={styles.inputNominal}
                        keyboardType='numeric'
                        onChangeText={(text) => this.onChangeInput(text, 'nominal')}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Taxa (i):   </Text>
                    <TextInput
                        placeholder='Taxa (i)'
                        style={styles.inputTaxa}
                        keyboardType='numeric'
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
                    <Text style={styles.label}>Após desconto (A): </Text>
                    <TextInput
                        placeholder='Após desconto (A)'
                        style={styles.inputAtual}
                        keyboardType='numeric'
                        onChangeText={(text) => this.onChangeInput(text, 'atual')}
                    />
                </View>
                <View style={styles.rowSubmit}>
                    <TouchableOpacity style={styles.buttonSubmit} onPress={() => this.onSubmit()}>
                        <Text style={styles.textSubmit}>Calcular!</Text>
                    </TouchableOpacity>
                </View>
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
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        // backgroundColor: 'orange',
        margin: 2,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    },
    inputNominal: {
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
    inputAtual: {
        width: '53%',
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
        margin: 2,
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