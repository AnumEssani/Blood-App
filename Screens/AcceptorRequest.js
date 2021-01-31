import React from "react";
import { StyleSheet, View, Image, TouchableOpacity,ScrollView } from 'react-native'
import { Content, Card, CardItem, Text, Body, Left, Right, Button } from 'native-base'
import { connect } from 'react-redux'
import firebase from 'firebase'

class AcceptorRequest extends React.Component {
    state = {
        acceptordata: []
    }
    componentDidMount() {
        firebase.database().ref('users').on('value', snapshot => {
            let obj = Object.values(snapshot.val())
            let userData = obj.filter(data => { if (data.email === this.props.email) { if (data.acceptorRequest) { return data.acceptorRequest } else { return null } } })
            let aceptorEmail = []
            if (userData.length > 0) {
                obj.map(data => {
                    userData[0].acceptorRequest.map(req => {
                        if (req === data.email) {
                            aceptorEmail.push(data)
                        }
                    })
                })
            }
            this.setState({ acceptordata: aceptorEmail })
        })
    }
    render() {
        console.log(this.state.acceptordata)
        return (
            <View style={style.container}>
<ScrollView>
                {this.state.acceptordata.length > 0 ? this.state.acceptordata.map((data, i) => {
                    return (
                        <Card key={i}>
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
                        </Card>
                    )
                }) : <Text>No Request Exist</Text>}
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

})


export default connect(mapStateToProps, mapDispatchToProps)(AcceptorRequest)

const style = StyleSheet.create({
    container: {
        flex: 1,
    }
}
)
