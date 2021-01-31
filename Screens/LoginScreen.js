import React from 'react'
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Toast } from 'native-base';
import { Image, Dimensions, TouchableOpacity } from 'react-native'
import * as firebase from 'firebase';
import { useDispatch } from 'react-redux';
import logo from '../asset/Logo.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = (props) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const dispatch = useDispatch()
    const onSubmit = () => {
        if (email !== "" && password !== "") {
            firebase.database().ref('users').once('value', snapshot => {
                let data = Object.values(snapshot.val())
                let newData = data.filter(filterData => { if (filterData.email === email && filterData.password === password) { return filterData } })
                console.log('newData', newData)
                if (newData.length > 0) {
                    console.log(newData)
                    dispatch({ type: 'USERLOGIN', payload: newData })

                    setItemsInStorage(newData[0])
                } else {
                    return
                }
            })
            firebase.auth().signInWithEmailAndPassword(email, password).then(res => {

            }).catch(err => setError(err.message))

        }
    }
    const setItemsInStorage = async (value) => {
        try {
            const data = JSON.stringify(value)
            await AsyncStorage.setItem('userData', data)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Container>
            <Content>
                <Image source={logo} style={{ marginTop: 40, alignSelf: "center", height: 200, width: 200 }} />
                <Text>{error}</Text>
                <Form>
                    <Item floatingLabel>
                        <Label>Username</Label>
                        <Input textContentType="emailAddress" onChangeText={text => setEmail(text)} autoCapitalize="none" value={email} />
                    </Item>
                    <Item floatingLabel last>
                        <Label>Password</Label>
                        <Input textContentType="password" secureTextEntry onChangeText={text => setPassword(text)} autoCapitalize="none" value={password} />
                    </Item>
                    <Button
                        style={{ width: Dimensions.get('screen').width - 50, marginTop: 30, alignSelf: "center", backgroundColor: 'red' }}
                        onPress={onSubmit}
                    >
                        <Text style={{ width: '100%', textAlign: 'center' }}> Sign In </Text>
                    </Button>

                </Form>
                <TouchableOpacity style={{ alignSelf: "center", marginTop: 32 }} onPress={() => props.navigation.navigate("Register")}>
                    <Text style={{ color: "#414959", fontSize: 13 }}>New To Blood App?<Text style={{ fontWeight: "500", color: "red" }}> Sign Up</Text></Text>
                </TouchableOpacity>
            </Content>
        </Container>
    )
}

export default LoginScreen