import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	Button,
	Text,
	View
} from 'react-native';



export default class extends Component<{}> {
	static navigationOptions = {
	
	};
	
	render() {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text>哈哈哈我是首页</Text>
				
				<Button
					title="Me"
					onPress={() =>
						this.props.navigation.navigate('Me', { name: 'wpj' })
					}
				/>
				
				<Button
					title="Login"
					onPress={() =>
						this.props.navigation.navigate('Login', { name: 'wpj' })
					}
				/>
			</View>
		);
	}
}