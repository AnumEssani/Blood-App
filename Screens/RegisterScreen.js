import React from 'react'
import { Container, Content, Form, Item, Input, Label, Button, Text } from 'native-base';
import { Dimensions, Image } from 'react-native'
import { useDispatch } from 'react-redux';
import * as firebase from 'firebase';
import logo from '../asset/Logo.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = (props) => {
    const [name, setName] = React.useState('');
    const [number, setNumber] = React.useState('');
    const [bloodGroup, setBloodGroup] = React.useState('');
    const [age, setAge] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [cpass, setcPass] = React.useState('');
    const [error, setError] = React.useState('');
    const dispatch = useDispatch();

    const onSubmit = () => {
        const SignUpData = {
            name, number, email, password, bloodGroup, age,
            isDonor: false,
            isAcceptor: false,
            medicalHistory: {
                hasAlergy: false,
                hasColestrol: false,
                hasHeartDisease: false,
                hasAsthma: false,
                lastBloodDonateDate: 'Never'
            },
        }
        if (password === cpass) {
            firebase.database().ref('users').push(SignUpData).then(data => data).catch(err => setError(err))
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(user => user)
                .catch(err => setError(err));
            dispatch({ type: 'USERDATARIGESTOR', payload: SignUpData })
            setItemsInStorage(SignUpData)
            props.navigation.navigate('Login')
        } else {
            setError('Password did not Match')
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
                        <Label>Name</Label>
                        <Input textContentType="name" onChangeText={text => setName(text)} autoCapitalize="none" value={name} />
                    </Item>
                    <Item floatingLabel last>
                        <Label>Phone Number</Label>
                        <Input textContentType="name" onChangeText={text => setNumber(text)} autoCapitalize="none" value={number} />
                    </Item>
                    <Item floatingLabel last>
                        <Label>Blood Group</Label>
                        <Input textContentType="name" onChangeText={text => setBloodGroup(text)} autoCapitalize="none" value={bloodGroup} />
                    </Item>
                    <Item floatingLabel last>
                        <Label>Age</Label>
                        <Input textContentType="name" onChangeText={text => setAge(text)} autoCapitalize="none" value={age} />
                    </Item>
                    <Item floatingLabel last>
                        <Label>Email Address</Label>
                        <Input textContentType="emailAddress" onChangeText={text => setEmail(text)} autoCapitalize="none" value={email} />
                    </Item>
                    <Item floatingLabel last>
                        <Label>Password</Label>
                        <Input textContentType="password" secureTextEntry onChangeText={text => setPassword(text)} autoCapitalize="none" value={password} />
                    </Item>
                    <Item floatingLabel last>
                        <Label>Confirm Password</Label>
                        <Input textContentType="password" secureTextEntry onChangeText={text => setcPass(text)} autoCapitalize="none" value={cpass} />
                    </Item>
                    <Button danger
                        style={{ width: Dimensions.get('screen').width - 50, marginTop: 30, alignSelf: "center" }}
                        onPress={onSubmit}
                    >
                        <Text style={{ width: '100%', textAlign: 'center' }}> Register </Text>
                    </Button>
                </Form>
            </Content>
        </Container>
    )
}

export default LoginScreen