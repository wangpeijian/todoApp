import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	Button,
	Text,
	View
} from 'react-native';



export default class extends Component<{}> {
	static navigationOptions = ({navigation, navigationOptions }) =>{
		return {
			title: '登录',
		}
	};
	
	render() {
		
		//const { params } = this.props.navigation.state;
		
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text>登录雅</Text>
				
				<Button
					title="Go back"
					onPress={() => this.props.navigation.goBack()}
				/>
			</View>
		);
	}
}