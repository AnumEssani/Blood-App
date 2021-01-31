/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image
} from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider, useSelector } from "react-redux";
import Reducer from './Store/Reducer';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import * as firebase from 'firebase';
import LoadingScreen from './Screens/LoadingScreen'
import HomeScreen from './Screens/HomeScreen'
import LoginScreen from './Screens/LoginScreen'
import RegisterScreen from './Screens/RegisterScreen'
import BecomeAcceptor from './Screens/BecomeAcceptor'
import BecomeDonor from './Screens/BecomeDonor'
import AcceptorRequest from './Screens/AcceptorRequest'
import MedicalHistory from './Screens/MedicalHistory'

import logo from './asset/Logo.png';

const firebaseConfig = {
  apiKey: "AIzaSyD1GD1nkLiCvclAb5P7r2o99zhF5d1HGfc",
    authDomain: "stop-watch-assign-8.firebaseapp.com",
    databaseURL: "https://stop-watch-assign-8.firebaseio.com",
    projectId: "stop-watch-assign-8",
    storageBucket: "stop-watch-assign-8.appspot.com",
    messagingSenderId: "404413070803",
    appId: "1:404413070803:web:8ad66da8d92f6d2f070326",
    measurementId: "G-697K9SJD8V"
}

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


// For Middleware
const middleWare = [thunk];
// Initial State
const initialState = {
  name: '',
  email: '',
  number: '',
  bloodGroup: '',
  age: '',
  isDonor: false,
  isAcceptor: false,
  medicalHistory: [],
  donorList: [],
  donorKey: [],
  isLogin: false
}
// Compose
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Store Created
const store = createStore(
  Reducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleWare))
);

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator()
const MainButton = ({ navigator }) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text} onPress={() => navigator.openDrawer()} >≡</Text>
      </View>
    </>
  )
}
const MainContainer = (props) => {

  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{ gestureEnabled: false }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation, route }) => ({
          title: "Blood App",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "red" },
          headerTintColor: "white",
          headerLeft: props => <MainButton style={styles.drawer} navigator={navigation} {...props} />,
        })}
        {...props}
      />
      <Stack.Screen
        name="donor"
        component={BecomeDonor}
        options={({ navigation, route }) => ({
          title: "Become Donor",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "red" },
          headerTintColor: "white",
        })}
        {...props}
      />
      <Stack.Screen
        name="acceptor"
        component={BecomeAcceptor}
        options={({ navigation, route }) => ({
          title: "Become Acceptor",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "red" },
          headerTintColor: "white",
        })}
        {...props}
      />
      <Stack.Screen
        name="MedicalHistory"
        component={MedicalHistory}
        options={({ navigation, route }) => ({
          title: "Medical History",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "red" },
          headerTintColor: "white",
        })}
        {...props}
      />
      <Stack.Screen
        name="AcceptorRequest"
        component={AcceptorRequest}
        options={({ navigation, route }) => ({
          title: "Acceptor Request",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "red" },
          headerTintColor: "white",
        })}
        {...props}
      />

    </Stack.Navigator>
  )
}



function CustomDrawerContent(props) {
  const { name } = useSelector(state => {
    return (
      {
        name: state.name
      }
    )
  })

  const removeAsyncStorage = async () => {
    try {
      await AsyncStorage.removeItem("userData");
      firebase.auth().signOut()
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <DrawerContentScrollView {...props}>
      <View>
        <View style={styles.closeContainer}>
          <Image source={logo} style={styles.drawerImg} />
          <Text style={{ fontSize: 20, margin: 10 }}>{name}</Text>
        </View>
      </View>
      <DrawerItemList {...props} />

      <DrawerItem label="Logout" onPress={() => removeAsyncStorage()} />
    </DrawerContentScrollView>
  );
}

const AppContainer = (data) => {
  return (
    <Provider store={store}>
      <NavigationContainer >
        <Drawer.Navigator initialRouteName="Home" drawerContent={props => <CustomDrawerContent {...data} {...props} />} >
          <Drawer.Screen name="Home" component={MainContainer} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

const AuthContainer = (props) => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ gestureEnabled: false }}
        >

          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: "Blood App",
              headerStyle: { backgroundColor: 'red' },
              headerTitleAlign: "center",
              headerTintColor: "white",
            }}
            {...props}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              title: "SIGNUP",
              headerStyle: { backgroundColor: 'red' },
              headerTitleAlign: "center",
              headerTintColor: "white",
            }}
            {...props}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}


export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppContainer,
      Auth: AuthContainer
    },
    {
      initalRouteName: "Loading"
    }
  )
)


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 20
  },
  containerRight: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginRight: 15,
    alignItems: "center",
    // marginLeft: 20
  },
  btn: {
    width: 10,
    fontSize: 40,
  },
  text: {
    fontSize: 50,
    color: "#fff",

  },

  closeText: {
    textAlign: "left",
    fontSize: 45,
    margin: 0,
    padding: 0,
    marginLeft: 5,
  },
  closeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: "center",
    marginBottom: 10,
  },
  drawerImg: {
    height: 70,
    width: 70,
    marginRight: 15,
  },
  mainImg: {
    height: 70,
    width: 70,
    marginRight: 15,

  },

  mainImgRight: {
    height: 70,
    width: 70,
    marginLeft: 10,

  },
  textRight: {
    fontSize: 40,
    color: "#fff",

  },
  drawer: {
    marginLeft: 20
  }
});
