import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, Picker, TouchableOpacity } from 'react-native';
// import { Icon } from 'react-native-vector-icons';
// import { Input } from 'react-native-elements';

export default class JurosSimples extends Component {

    state = {
        inputCapital: '',
        inputTaxa: '',
        escTaxa: '',
        inputTempo: '',
        escTempo: '',
        inputMontante: ''
    }

    componentDidMount(){
        this.setState({
            escTaxa: 'dia',
            escTempo: 'dia'
        })
    }

    static navigationOptions = {
        title: 'Juros Simples',
        headerStyle: {
          backgroundColor: '#1a237e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
    }

    onChangeInput = (input, esc) => {
        switch(esc){
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
        console.log('state', this.state);
        if(this.state.inputMontante === '' && this.state.inputCapital != '' && this.state.inputTaxa != '' && this.state.inputTempo != ''){
            let taxa, tempo;
            if(this.state.escTaxa === 'dia'){
                taxa = this.state.inputTaxa * 30;
            }else if(this.state.escTaxa === 'ano'){
                taxa = this.state.inputTaxa / 12;
            }else{
                taxa = this.state.inputTaxa;
            }

            if(this.state.escTempo === 'dia'){
                tempo = this.state.inputTempo * 30;
            }else if(this.state.escTempo === 'ano'){
                tempo = this.state.inputTempo / 12;
            }else{
                tempo = this.state.inputTempo;
            }

            let montante = this.state.inputCapital * (1 + (taxa/100) * tempo);
            alert('Montante: R$' + montante);

        }else if(this.state.inputMontante != '' && this.state.inputCapital === '' && this.state.inputTaxa != '' && this.state.inputTempo != ''){

            let taxa, tempo;

            if(this.state.escTaxa === 'dia'){
                taxa = this.state.inputTaxa * 30;
            }else if(this.state.escTaxa === 'ano'){
                taxa = this.state.inputTaxa / 12;
            }else{
                taxa = this.state.inputTaxa;
            }

            if(this.state.escTempo === 'dia'){
                tempo = this.state.inputTempo / 30.417;
            }else if(this.state.escTempo === 'ano'){
                tempo = this.state.inputTempo * 12;
            }else{
                tempo = this.state.inputTempo;
            }
            
            let capital = this.state.inputMontante/(1 + ((taxa/100) * tempo));
            alert('Capital: R$' + capital);

        }else if(this.state.inputMontante != '' && this.state.inputCapital != '' && this.state.inputTaxa === '' && this.state.inputTempo != ''){

            let tempo;


            if(this.state.escTempo === 'dia'){
                tempo = this.state.inputTempo / 30.417;
            }else if(this.state.escTempo === 'ano'){
                tempo = this.state.inputTempo * 12;
            }else{
                tempo = this.state.inputTempo;
            }
            
            let taxa = (this.state.inputMontante - this.state.inputCapital)/(this.state.inputCapital * tempo);

            if(this.state.escTaxa === 'dia'){
                taxa = taxa * 30;
            }else if(this.state.escTaxa === 'ano'){
                taxa = taxa / 12;
            }

            alert('Taxa: ' + taxa * 100 + '%');

        }else if(this.state.inputMontante != '' && this.state.inputCapital != '' && this.state.inputTaxa != '' && this.state.inputTempo === ''){

            let taxa;

            if(this.state.escTaxa === 'dia'){
                taxa = this.state.inputTaxa * 30;
            }else if(this.state.escTaxa === 'ano'){
                taxa = this.state.inputTaxa / 12;
            }else{
                taxa = this.state.inputTaxa;
            }

            let tempo = (this.state.inputMontante - this.state.inputCapital)/(this.state.inputCapital * (taxa/100));
            
            if(this.state.escTempo === 'dia'){
                tempo = tempo / 30.417;
            }else if(this.state.escTempo === 'ano'){
                tempo = tempo * 12;
            }

            alert('Tempo: ' + tempo);
        }

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <Text style={styles.label}>Capital (C):   </Text>
                    <TextInput
                    placeholder='Capital (C)'
                    style={styles.inputCapital}
                    keyboardType='numeric'
                    onChangeText={(text) => this.onChangeInput(text, 'capital')}
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
                    style={{height: 50, width: 100}}
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
                    style={{height: 50, width: 100}}
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
                    onChangeText={(text) => this.onChangeInput(text, 'montante')}
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
        backgroundColor: '#ccc',
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