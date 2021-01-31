import React from "react";
import { StyleSheet, View, Dimensions,ScrollView } from 'react-native'
import { Content, Card, CardItem, Text, Body, Left, Right, Button } from 'native-base'
import firebase from 'firebase'
import logo from '../asset/blood-clipart.svg';
import { connect } from 'react-redux'
import { sub } from "react-native-reanimated";

class BecomeAcceptor extends React.Component {
    componentDidMount() {
        firebase.database().ref('users').on('value', snapshot => {
            let keys = Object.keys(snapshot.val())
            let obj = Object.values(snapshot.val())
            this.props.DonorDetail({ obj, keys })
        })
    }
    submit = (key) => {
        firebase.database().ref(`users/${key}`).once('value', snapshot => {
            let data = snapshot.val()

            if (data.length>0 && data.acceptorRequest) {
                data = {
                    ...data,
                    acceptorRequest: [...acceptorRequest, this.props.email]
                }
            } else {
                data = {
                    ...data,
                    acceptorRequest: [this.props.email]
                }
            }
            console.log(data)
            firebase.database().ref(`users/${key}`).set(data)
        })
    }

    render() {
        return (
            <View style={style.container}>

               <ScrollView>
               {this.props.donorList ? this.props.donorList.map((data, i) => {
                    if (data.isDonor) {
                        return (
                            <Card key={this.props.donorKey[i]}>
                                <CardItem header>
                                    <Left>
                                        <Text>Name: {data.name}  </Text>
                                    </Left>
                                    <Right>
                                        <Text>Blood Group: {data.bloodGroup}</Text>
                                    </Right>
                                </CardItem>
                                <CardItem>
                                    <Body>
                                        <Text>Other Detail</Text>
                                        <Text>age : {data.age}</Text>
                                        <Text>email : {data.email}</Text>
                                        <Text>Phone Number : {data.number}</Text>
                                    </Body>
                                </CardItem>
                                <CardItem footer>
                                    <View>
                                        <Text>Medical History</Text>
                                        <Text>Alergy : {data.medicalHistory.hasAlergy ? "Yes" : "No"}</Text>
                                        <Text>Asthma : {data.medicalHistory.hasAsthma ? "Yes" : "No"}</Text>
                                        <Text>Colestrol : {data.medicalHistory.hasColestrol ? "Yes" : "No"}</Text>
                                        <Text>Heart Disease : {data.medicalHistory.hasHeartDisease ? "Yes" : "No"}</Text>
                                        <Text>Last Blood Donate : {data.medicalHistory.lastBloodDonateDate}</Text>
                                    </View>
                                </CardItem>
                                <CardItem footer>
                                    <Button
                                        style={{ width: Dimensions.get('screen').width - 50, marginTop: 30, alignSelf: "center", backgroundColor: 'red' }}
                                        onPress={() => this.submit(this.props.donorKey[i])}
                                    >
                                        <Text style={{ width: '100%', textAlign: 'center' }}> Send Request </Text>
                                    </Button>
                                </CardItem>
                            </Card>
                        )
                    }
                }) : null}
               </ScrollView>
            </View>
        );
    }
}
const mapStateToProps = (state) => ({
    name: state.name,
    email: state.email,
    number: state.number,
    age: state.age,
    bloodGroup: state.bloodGroup,
    medicalHistory: state.medicalHistory,
    donorList: state.donorList,
    donorKey: state.donorKey

})

const mapDispatchToProps = dispatch => ({
    DonorDetail: (data) => dispatch({ type: 'Donor', payload: data })
})


export default connect(mapStateToProps, mapDispatchToProps)(BecomeAcceptor)
const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    foter: {
        flex: 1,
        flexDirection: 'row'
    }

})