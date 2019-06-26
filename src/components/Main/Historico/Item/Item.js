import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Item = ({ item, handleClickItem }) => {



    return (
        <TouchableOpacity onPress={() => handleClickItem(item)}>
            <View style={styles.itemContainer}>
                <View style={{ flexDirection: 'column' }}>
                    <View style={styles.viewItem}>
                        <Text style={styles.label}>Tipo: </Text>
                        <Text style={styles.value}>{item.tipo}</Text>
                    </View>
                    {item.capital != null ? 
                        <View style={styles.viewItem}>
                            <Text style={styles.label}>Capital: </Text>
                            <Text style={styles.value}>R${item.capital}</Text>
                        </View> : null
                    }
                    {item.montante != null ?
                        <View style={styles.viewItem}>
                            <Text style={styles.label}>Montante: </Text>
                            <Text style={styles.value}>R${item.montante}</Text>
                        </View>: null
                    }
                </View>
                <View>
                    {item.tempo != null ?
                        <View style={styles.viewItem}>
                            <Text style={styles.label}>Tempo: </Text>
                            <Text style={styles.value}>{item.tempo} {item.escTempo}(s)</Text>
                        </View> : null
                    }
                    {item.taxa != null ? 
                        <View style={styles.viewItem}>
                            <Text style={styles.label}>Taxa: </Text>
                            <Text style={styles.value}>{item.taxa}% ao {item.escTaxa}</Text>
                        </View> : null
                    }
                </View>
                
            </View>
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