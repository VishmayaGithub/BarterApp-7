import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

export default class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      first_name: '',
      last_name: '',
      contact: '',
      address: '',
      emailId: '',
      docId: '',
    };
  }
  getUserDetails = () => {
    var email = firebase.auth().currentUser.email;
    db.collection('User')
      .where('email_id', '==', email)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          {
            var data = doc.data();
            this.setState({
              emailId: data.email_id,
              first_name: data.first_name,
              last_name: data.last_name,
              address: data.address,
              contact: data.mobile_number,
              docId: doc.id,
            });
          }
        });
      });
  };
  componentDidMount() {
    this.getUserDetails();
  }
  updateUserDetails() {
    db.collection('User').doc(this.state.docId).update({
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      mobile_number: this.state.contact,
      address: this.state.address,
    });
    Alert.alert('User details updated successfully');
  }
  render() {
    return (
      <View style={styles.container}>
      
        <TextInput
          placeholder="First Name"
          style={styles.box}
          maxLength={10}
           onChangeText={(text) => {
            this.setState({
              first_name: text,
            });
          }}
          value={this.state.first_name}
        /> 
        <TextInput
          placeholder="Last Name"
          style={styles.box}
          maxLength={10}
          onChangeText={(text) => {
            this.setState({ last_name: text });
          }}
          value={this.state.last_name}
        />
        <TextInput
          placeholder="Contact"
          style={styles.box}
          maxLength={10}
          keyboardType="numeric"
          onChangeText={(text) => {
            this.setState({ contact: text });
          }}
          value={this.state.contact}
        />
        <TextInput
          placeholder="Address"
          style={styles.box}
          multiLine={true}
          onChangeText={(text) => {
            this.setState({ address: text });
          }}
          value={this.state.address}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.updateUserDetails();
          }}>
          <Text>Save</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2833',
    alignItems: 'center',
    justifyContent: 'center',
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
  button: {
    backgroundColor: '#66FCF1',
    width: 100,
    height: 40,
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
});
