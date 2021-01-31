import React from "react";
import { Button, Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import firebase from 'firebase'
import logo from '../asset/blood-clipart.svg';
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';

class HomeScreen extends React.Component {
    componentDidMount() {
        let func = async () => {
            console.log('email', this.props.email)
            if (this.props.email === '') {
                let getLocalFromStorage = await this.getItemsFromStorage()
                this.props.loadDataToRedux(getLocalFromStorage)
            }
        }
        func()
    }
    getItemsFromStorage = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('userData')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.log(e)
        }
    }

    onButtonPress = (option) => {
        firebase.database().ref('users').once('value', snapshot => {
            let data = snapshot.val()
            let newData = Object.keys(data).filter(a => { if (data[a].email === this.props.email) { return data } })
            let setObj = data[newData[0]]
            if (option === 'donor') {
                if (setObj.isDonor === true && setObj.isAcceptor === true || setObj.isAcceptor === true) {
                    setObj = {
                        ...setObj,
                        isDonor: true,
                        isAcceptor: true,
                    }

                }
                else {
                    setObj = {
                        ...setObj,
                        isDonor: true,
                        isAcceptor: false,
                    }
                }
            } else {
                if (setObj.isDonor === true && setObj.isAcceptor === true || setObj.isDonor === true) {
                    setObj = {
                        ...setObj,
                        isDonor: true,
                        isAcceptor: true,
                    }

                }
                else {
                    setObj = {
                        ...setObj,
                        isDonor: false,
                        isAcceptor: true,
                    }
                }
            }
            firebase.database().ref('users/' + newData[0]).set(setObj)
            this.props.ButtonPress(setObj)
            this.props.navigation.navigate(option)
        })
    }

    render() {
        return (
            <View style={style.container}>
                <TouchableOpacity style={[style.button, style.buttonView]} onPress={() => this.onButtonPress('donor')}>
                    <Image source={require('../asset/Donor.jpg')} style={style.image} />
                    <Text style={{ margin: 20, fontSize: 16 }}>Become Donor</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[style.button, style.buttonView]} onPress={() => this.onButtonPress('acceptor')}>
                    <Image source={require('../asset/Acceptor.jpg')} style={style.image} />
                    <Text style={{ margin: 20, fontSize: 16 }}>Become Acceptor</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
const mapStateToProps = (state) => ({
    email: state.email
})

const mapDispatchToProps = dispatch => ({
    ButtonPress: (option) => dispatch({ type: 'USERTYPEPRESS', payload: option }),
    loadDataToRedux: (data) => dispatch({ type: 'USERDATA', payload: data })
})


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#d9847e'
    },
    loader: {
        margin: "10%"
    },
    image: {
        height: 100,
        width: 100,
        marginRight: 20,
        marginLeft: 20
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        margin: 20
    },
    buttonView: {
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        display: 'flex',
        alignItems: 'center',
        borderRadius: 20
    }

})