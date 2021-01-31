import React from "react";
import { Button, Text, StyleSheet, View, Image, ActivityIndicator } from 'react-native'
import firebase from 'firebase'
// import Fire from './fire'
import logo from '../asset/Logo.png';

export default class LoadingScreen extends React.Component {

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? "App" : "Auth");
        })
    }

    render() {
        return (
            <View style={style.container}>
                <Image source={logo} style={style.image} />
                <View style={style.loader}>
                    <ActivityIndicator color="white" size="large"></ActivityIndicator>
                </View>
            </View>
        );
    }
}
const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'gray'
    },
    loader: {
        margin: "10%"
    },
    image: {
        height: 100,
        width: 100
    }

})