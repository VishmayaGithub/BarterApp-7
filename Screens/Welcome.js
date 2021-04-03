import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Modal,
} from 'react-native';
import db from '../config';
import firebase from 'firebase';

export default class Welcome extends React.Component {
  constructor() {
    super();
    this.state = {
      emailId: '',
      password: '',
      isModalVisible: false,
      firstName: '',
      lastName: '',
      confirmPassword: '',
      address: '',
      Mnumber: '',
    };
  }
   userLogUp = (emailId, password, confirmPassword) => {
    if (password !== confirmPassword) {
      return Alert.alert('Password does not match');
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(emailId, password)
        .then(() => {
          db.collection('User').add({
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            address: this.state.address,
            email_id: this.state.emailId,
            mobile_number: this.state.Mnumber,
          });
          return Alert.alert('User added Successfully', '', [
            {
              text: 'ok', 
              onPress: () =>
                this.setState({
                  isModalVisible: false,
                }),
            },
          ]);
        })
        .catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          // ..
          return Alert.alert(errorMessage);
        });
    }
  };
  

  userLogIn = (emailId, password) => {
    
    firebase
      .auth()
      .signInWithEmailAndPassword(emailId, password)
      .then(() => {
        this.props.navigation.navigate('RequestScreen');
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        return alert(errorMessage);
      });
  };

  showModal = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={this.state.isModalVisible}>
      <View>
        <ScrollView style={{ width: '100%' }}>
          <KeyboardAvoidingView style={styles.keyView}>
            <Text style={styles.subheader}>Register</Text>
            <TextInput
              placeholderTextColor="#C5C6C7"
              style={styles.box}
              placeholder={'First Name'}
              maxLength={10}
              onChangeText={(text) => {
                this.setState({
                  firstName: text,
                });
              }}
            />
            <TextInput
              style={styles.box}
              placeholderTextColor="#C5C6C7"
              placeholder={'Last Name'}
              maxLength={10}
              onChangeText={(text) => {
                this.setState({
                  lastName: text,
                });
              }}
            />
            <TextInput
              style={styles.box}
              placeholder="Address"
              placeholderTextColor="#C5C6C7"
              onChangeText={(text) => {
                this.setState({
                  address: text,
                });
              }}
              multiline={true}></TextInput>

            <TextInput
              style={styles.box}
              placeholder="Mobile Number"
              placeholderTextColor="#C5C6C7"
              maxLength={10}
             keyboardType='numeric'
              onChangeText={(text) => {
                this.setState({
                  Mnumber: text,
                });
              }}></TextInput>

            <TextInput
              style={styles.box}
              placeholderTextColor="#C5C6C7"
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(text) => {
                this.setState({
                  password: text,
                });
              }}></TextInput>

            <TextInput
              style={styles.box}
              placeholder=" Confirm Password"
              placeholderTextColor="#C5C6C7"
              secureTextEntry={true}
              onChangeText={(text) => {
                this.setState({
                  confirmPassword: text,
                });
              }}></TextInput>

            <View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  this.userLogUp(
                    this.state.emailId,
                    this.state.password,
                    this.state.confirmPassword
                  );
                }}>
                <Text>Register</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  this.setState({
                    isModalVisible: false,
                  });
                }}>
                <Text>Cancel</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </Modal>
  );

  render() {
    return (
      <View style={styles.container}>
        <View>{this.showModal()}</View>

        <View>
          <Text style={styles.header}>Barter App</Text>
        </View>
        <Text>heo</Text>

        <Image
          source={require('../assets/barter.gif')}
          style={{
            borderWidth: 2,
            width: 200,
            height: 200,
            borderRadius: 10,
            marginTop: 20,
          }}
        />

        <TextInput
          style={styles.box}
          placeholder="Email"
          placeholderTextColor="#C5C6C7"
          onChangeText={(text) => { 
            this.setState({
              emailId: text,
            });
          }}></TextInput>
        <TextInput
          style={styles.box}
          placeholder="Password"
          placeholderTextColor="#C5C6C7"
          secureTextEntry={true}
          onChangeText={(text) => {
            this.setState({
              password: text,
            });
          }}></TextInput>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.setState({
              isModalVisible: true,
            });
          }}>
          <Text>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.userLogIn(this.state.emailId, this.state.password);
          }}>
          <Text>Log In</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: '#1F2833',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
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
  header: {
    fontSize: 30,
    textAlign: 'center',
    color: '#66FCF1',
    
  },
  subheader: {
    fontSize: 25,
    textAlign: 'center',
    color: '#66FCF1',
    
  },
  keyView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0B0C10',
    borderWidth: 2,
    borderRadius: 20,
    width: '100%',
    alignSelf: 'center',
    marginTop: 20,
  },
});
