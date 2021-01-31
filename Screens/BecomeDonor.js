import React from "react";
import { Button, Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import firebase from 'firebase'
import logo from '../asset/blood-clipart.svg';
import { connect } from 'react-redux'

class BecomeDonor extends React.Component {

    render() {
        return (
            <View style={style.container}>
                <TouchableOpacity style={[style.button, style.buttonView]} onPress={() => this.props.navigation.navigate('MedicalHistory')}>
                    <Image source={require('../asset/MedicalHistory.png')} style={style.image} />
                    <Text style={{ margin: 20, fontSize: 16 }}>Medical History</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[style.button, style.buttonView]} onPress={() => this.props.navigation.navigate('AcceptorRequest')}>
                    <Image source={require('../asset/Acceptor.jpg')} style={style.image} />
                    <Text style={{ margin: 20, fontSize: 16 }}>Acceptor Request</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    email: state.email
})

const mapDispatchToProps = dispatch => ({

})


export default connect(mapStateToProps, mapDispatchToProps)(BecomeDonor)

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