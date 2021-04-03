import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import db from '../config';
import firebase from 'firebase';

export default class RequestScreen extends React.Component {
  constructor() {
    super();
    this.state = { 
      description: '', 
      itemName: '',
      userId: firebase.auth().currentUser.email,
    };
  }
   createUniqueId(){
    return Math.random().toString(36).substring(7);
  }

  addItem = async (description, itemName) => {
    var userName = this.state.userName
   var exchangeId=this.createUniqueId()
    db.collection('Requested_items').add({
      name: this.state.itemName,
      description: this.state.description,
      userId: this.state.userId,
      exchangeId  : exchangeId
    }); 
    this.setState({
      description: '',
      itemName: '',
    });
    return Alert.alert(
      'Item Ready To Exchange',
      ''[
        {
          text: 'OK',
          onPress: () => {
            this.props.navigation.navigate('HomeScreen');
          },
        }
      ]
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.subheader}>Request Items</Text>
        <TextInput
          style={styles.box}
          placeholder ={"Item Name"}
          maxLength ={12}
          onChangeText={(text)=>{
            this.setState({
              itemName: text
            })
          }}
          value={this.state.itemName}
        />
        <TextInput
          multiline
          numberOfLines={4}
          style={[styles.box2,{height:100}]}
          placeholder ={"Description"}
          onChangeText={(text)=>{
            this.setState({
              description: text
            })
          }}
          value={this.state.description}

        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.addItem(this.state.description, this.state.itemName);
          }}><Text>submit</Text></TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1F2833',
  },
  box: {
    borderColor: '#66FCF1',
    width: 300,
    height: 40,
    borderBottomWidth: 2.5,
    color: 'white',
    fontSize: 20,
    margin: 10,
    paddingLeft: 10,
    fontFamily: 'Courier',
  },
   box2: {
    borderColor: '#66FCF1',
    width: 300,
    height: 40,
    borderWidth: 2.5,
    color: 'white',
    fontSize: 20,
    margin: 10,
    paddingLeft: 10,
    fontFamily: 'Courier',
  },
  button: {
    backgroundColor: '#66FCF1',
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 20,
    shadowColor: '#66fcf1',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 16,
    padding: 10,
    alignSelf: 'center',
  },
   subheader: {
    fontSize: 35,
    textAlign: 'center',
    color: '#66FCF1',
    fontFamily: 'Courier',
  },
});
