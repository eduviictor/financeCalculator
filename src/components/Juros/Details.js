import React, { Component } from 'react';
import { Text, View } from 'react-native';

class DetailsScreen extends React.Component {
    render() {
        return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>Details Screen</Text>
        </View>
        );
    }
}

// const AppNavigator = createStackNavigator(
//     {
//         Details: DetailsScreen
//     }
// );

export default DetailsScreen;