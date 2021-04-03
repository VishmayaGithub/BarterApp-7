import React from 'react';
import { Image ,Text} from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeScreen from '../Screens/HomeScreen';
import RequestScreen from '../Screens/RequestScreen';



export const AppTabNavigator = createBottomTabNavigator({
  HomeScreen : {
    screen: HomeScreen,
    navigationOptions :{
      tabBarIcon : <Image source={{uri:'https://media.gettyimages.com/photos/stack-of-books-picture-id157482029?s=612x612'}} style={{width:20, height:20}}/>,
      tabBarLabel : "Donate Books",
    }
  },
  RequestScreen: {
    screen: RequestScreen,
    navigationOptions :{
      tabBarIcon : <Image source={{uri:'https://media.gettyimages.com/photos/stack-of-books-picture-id157482029?s=612x612'}} style={{width:20, height:20}}/>,
      tabBarLabel : "Book Request",
    }
  }
});
