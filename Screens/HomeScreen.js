import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import db from '../config';
import firebase from 'firebase';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],
    };
  }
  componentDidMount = async () => {
    const query = await db.collection('Requested_items').get();
    query.docs.map((doc) => {
      this.setState({
        items: [...this.state.items, doc.data()],
      });
    });
    console.log(this.state.items);
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.subheader}>Home</Text>
        <Text style={styles.subr}>Requests</Text>
        <FlatList
          data={this.state.items}
          renderItem={({ item }) => (
            <View
              style={{
                borderBottomWidth: 2,
                marginTop: 20,
                borderColor: '#66FCF1',
              }}>
              <Text style={styles.subr}>{'Request  : ' + item.name}</Text>
              <Text style={styles.subr}>
                {'Description  : ' + item.description}
              </Text>
              <TouchableOpacity
                onPress={()=>{this.props.navigation.navigate(
                  'ReceiverDetailsScreen' 
                )}}>
                <Text>View</Text> 
              </TouchableOpacity>
            </View> 
          )}
          keyExtractor={(item, index) => index.toString()}
        />
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
  subheader: {
    fontSize: 35,
    textAlign: 'center',
    color: '#66FCF1',
    fontFamily: 'Courier',
  },
  subr: {
    fontSize: 20,
    textAlign: 'center',
    color: '#66FCF1',
    fontFamily: 'Courier',
  },
});
