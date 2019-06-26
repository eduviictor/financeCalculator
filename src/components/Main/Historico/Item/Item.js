import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Item = ({ item, handleClickItem }) => {

    renderItem = () => {
        if(item.tipo === 'JS' || item.tipo === 'JC'){
            return (
                <View style={styles.itemContainer}>
                    <View style={{ flexDirection: 'column' }}>
                        <View style={styles.viewItem}>
                            <Text style={styles.label}>Tipo: </Text>
                            <Text style={styles.value}>{item.tipo}</Text>
                        </View>
                        <View style={styles.viewItem}>
                            <Text style={styles.label}>Capital: </Text>
                            <Text style={styles.value}>R$ {item.capital != null ? item.capital : '?'}</Text>
                        </View>
                        
                        <View style={styles.viewItem}>
                            <Text style={styles.label}>Montante: </Text>
                            <Text style={styles.value}>R$ {item.montante != null ? item.montante : '?'}</Text>
                        </View>
                        
                    </View>
                    <View>
                        <View style={styles.viewItem}>
                            <Text style={styles.label}>Tempo: </Text>
                            <Text style={styles.value}>{item.tempo != null ? item.tempo : '?'} {item.escTempo}(s)</Text>
                        </View>
                            
                        <View style={styles.viewItem}>
                            <Text style={styles.label}>Taxa: </Text>
                            <Text style={styles.value}>{item.taxa != null ? item.taxa : '?'}% ao {item.escTaxa}</Text>
                        </View>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={styles.itemContainer}>
                    <View style={{ flexDirection: 'column' }}>
                        <View style={styles.viewItem}>
                            <Text style={styles.label}>Tipo: </Text>
                            <Text style={styles.value}>{item.tipo}</Text>
                        </View>
                        <View style={styles.viewItem}>
                            <Text style={styles.label}>Nominal: </Text>
                            <Text style={styles.value}>R$ {item.nominal != null ? item.nominal : '?'}</Text>
                        </View>
                        
                        <View style={styles.viewItem}>
                            <Text style={styles.label}>Atual: </Text>
                            <Text style={styles.value}>R$ {item.atual != null ? item.atual : '?'}</Text>
                        </View>
                        
                    </View>
                    <View>
                        <View style={styles.viewItem}>
                            <Text style={styles.label}>Tempo: </Text>
                            <Text style={styles.value}>{item.tempo != null ? item.tempo : '?'} {item.escTempo}(s)</Text>
                        </View>
                            
                        <View style={styles.viewItem}>
                            <Text style={styles.label}>Taxa: </Text>
                            <Text style={styles.value}>{item.taxa != null ? item.taxa : '?'}% ao {item.escTaxa}</Text>
                        </View>
                    </View>
                </View>
            );
        }
    }

    return (
        <TouchableOpacity onPress={() => handleClickItem(item)}>
            {this.renderItem()}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
		flex: 1,
		justifyContent: 'space-between',
		flexDirection: 'row',
        color: '#FFF',
        borderWidth: 1,
        borderColor: '#8a2be2',
        borderRadius: 5,
        padding: 20,
        marginBottom: 20
	},
	viewItem: {
		flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        fontSize: 16
    },
    label: {
        fontWeight: 'bold',
    }
});

export default Item;