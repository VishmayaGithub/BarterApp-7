import React, { Component } from 'react';
import { Image, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import firebase from 'firebase';

export default class CustomSideDrawer extends React.Component {
  render() {
    return (
     
        <View style={styles.container}>
          <DrawerItems {...this.props} style={styles.drawer}></DrawerItems>
       
       
          <TouchableOpacity
          style={styles.button}
            onPress={() => {
              this.props.navigation.navigate('Welcome');
              firebase.auth().signOut();
            }}>
            <Text>Log Out</Text>
          </TouchableOpacity>

        </View>
        
     
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',

    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  drawer: {
    flex: 0.8,
  },
  button:{
    marginTop:20,
    borderWidth:2,
    width:100,
    height:30
  }
});
