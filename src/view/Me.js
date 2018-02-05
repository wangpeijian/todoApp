import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	Button,
	Text,
	View
} from 'react-native';



export default class extends Component<> {
	static navigationOptions = {
	
	};
	
	render() {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text>哈哈哈是我123呀,1231 </Text>
				
				<Button
					title="Go back"
					onPress={() => this.props.navigation.goBack()}
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