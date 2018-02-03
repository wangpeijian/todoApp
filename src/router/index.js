import React from 'react';
import {StackNavigator, TabNavigator, TabBarBottom} from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import {
	Image,
	StyleSheet,
	Text,
} from 'react-native';

import {THEME_COLOR, THEME_COLOR_DISABLE, THEME_COLOR_WHITE} from '../config'


const ICON_HOME = require('../img/homeTab/home.png');
const ICON_HOME_ACTIVE = require('../img/homeTab/home-active.png');
const ICON_ME = require('../img/homeTab/me.png');
const ICON_ME_ACTIVE = require('../img/homeTab/me-active.png');

import Home from '../view/Home'
import Me from '../view/Me'
import Login from '../view/Login'


const styles = StyleSheet.create({
	tabIcon: {
		width: 30,
		height: 30
	}
});


const HomeTab = TabNavigator({
	Home: {
		screen: Home,
		navigationOptions: {
			header: null,
			tabBarLabel: '首页',
			tabBarIcon: ({focused, tintColor}) => (
				<Image style={styles.tabIcon} source={focused ? ICON_HOME_ACTIVE : ICON_HOME}/>
			)
		}
	},
	Me: {
		screen: Me,
		navigationOptions: {
			header: null,
			tabBarLabel: '我',
			tabBarIcon: ({focused, tintColor}) => (
				<Image style={styles.tabIcon} source={focused ? ICON_ME_ACTIVE : ICON_ME}/>
			)
		}
	},
}, {
	tabBarComponent: TabBarBottom,
	tabBarPosition: 'bottom',
	lazy: true,
	tabBarOptions:{
		activeTintColor:THEME_COLOR,
		inactiveTintColor:THEME_COLOR_DISABLE,
	}
});


export default StackNavigator({
		Home: {
			screen: HomeTab,
		},
		Login: {
			screen: Login,
		}
	},
	{
		initialRouteName: 'Home',
		navigationOptions: {
			headerStyle: {
				backgroundColor: THEME_COLOR,
			},
			headerTintColor: THEME_COLOR_WHITE,
			headerTitleStyle: {
				fontWeight: 'bold',
				alignSelf: 'center'
			},
			headerRight: <Text/>
		},
		transitionConfig: () => {
			return {
				screenInterpolator: CardStackStyleInterpolator.forHorizontal,
			}
		},
		
	});