import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { Container, Content, Card, CardItem, Text, Body, ListItem, List } from 'native-base'
import CheckBox from '@react-native-community/checkbox';
import firebase from 'firebase'
import logo from '../asset/blood-clipart.svg';
import { connect } from 'react-redux'

class MedicalHistory extends React.Component {
    constructor(props) {
        super(props)
    }

    changeValue = (stateValue) => {
        firebase.database().ref('users').once('value', snapshot => {
            let data = snapshot.val()
            let newData = Object.keys(data).filter(a => { if (data[a].email === this.props.email) { return data } })
            let setObj = data[newData[0]]
            let medical = setObj.medicalHistory
            if (stateValue === 'Alergy') {
                medical = {
                    ...medical,
                    hasAlergy: !medical.hasAlergy
                }
                setObj.medicalHistory = medical
                this.props.changeMedicalHistory(medical)
                firebase.database().ref('users/' + newData[0]).set(setObj)
            } else if (stateValue === 'Colestrol') {
                medical = {
                    ...medical,
                    hasColestrol: !medical.hasColestrol
                }
                setObj.medicalHistory = medical
                this.props.changeMedicalHistory(medical)
                firebase.database().ref('users/' + newData[0]).set(setObj)

            }
            else if (stateValue === 'Asthma') {
                medical = {
                    ...medical,
                    hasAsthma: !medical.hasAsthma
                }
                setObj.medicalHistory = medical
                this.props.changeMedicalHistory(medical)
                firebase.database().ref('users/' + newData[0]).set(setObj)
            }
            else if (stateValue === 'HeartDisease') {
                medical = {
                    ...medical,
                    hasHeartDisease: !medical.hasHeartDisease
                }
                setObj.medicalHistory = medical
                this.props.changeMedicalHistory(medical)
                firebase.database().ref('users/' + newData[0]).set(setObj)
            }

        })
    }
    render() {
        console.log('state', this.props.medicalHistory)
        return (
            <Container>
                <Content>
                    <Card>
                        <CardItem header>
                            <Text style={{ fontWeight: "bold", fontSize: 30 }}>{this.props.name}</Text>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <View style={style.container}>
                                    <Text style={style.bodyText}>Age : {this.props.age}</Text>
                                    <Text style={style.bodyText}>Blood Group : {this.props.bloodGroup}</Text>
                                </View>
                                <Text style={style.bodyText}>Number : {this.props.number}</Text>
                                <Text style={style.bodyText}>Email : {this.props.email}</Text>
                                <Text style={style.bodyText}>Last Blood Date: {this.props.medicalHistory.lastBloodDonateDate}</Text>

                                <Text style={style.bodyText}>
                                    Medical History
                                </Text>

                                <List>
                                    <ListItem>
                                        <Text style={style.checkText}>Any Alergy</Text>
                                        <CheckBox
                                            disabled={false}
                                            value={this.props.medicalHistory.hasAlergy}
                                            onValueChange={() => this.changeValue('Alergy')}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <Text style={style.checkText}>Colestrol</Text>
                                        <CheckBox
                                            disabled={false}
                                            value={this.props.medicalHistory.hasColestrol}
                                            onValueChange={() => this.changeValue('Colestrol')}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <Text style={style.checkText}>Asthma</Text>
                                        <CheckBox
                                            disabled={false}
                                            value={this.props.medicalHistory.hasAsthma}
                                            onValueChange={() => this.changeValue('Asthma')}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <Text style={style.checkText}>Any HeartDisease</Text>
                                        <CheckBox
                                            disabled={false}
                                            value={this.props.medicalHistory.hasHeartDisease}
                                            onValueChange={() => this.changeValue('HeartDisease')}
                                        />
                                    </ListItem>
                                </List>
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    name: state.name,
    email: state.email,
    number: state.number,
    age: state.age,
    bloodGroup: state.bloodGroup,
    medicalHistory: state.medicalHistory

})

const mapDispatchToProps = dispatch => ({
    changeMedicalHistory: (data) => dispatch({ type: 'MedicalHistoryChange', payload: data })
})


export default connect(mapStateToProps, mapDispatchToProps)(MedicalHistory)

const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        flexWrap: 'wrap'
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
    },
    bodyText: { fontSize: 25, margin: 10 },
    checkText: { fontSize: 22 }
})