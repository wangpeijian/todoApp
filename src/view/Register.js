import React, {Component} from 'react';
import {
	StyleSheet,
	TouchableHighlight,
	Text,
	View,
	TextInput,
	Alert,
} from 'react-native';

import {THEME_COLOR, BUTTON_PRESS_COLOR, THEME_COLOR_WHITE} from '../config'
import StatusModal from '../component/public/StatusModal'

const styles = StyleSheet.create({
	page: {
		flex: 1,
		alignItems: 'center',
		paddingTop: 50
	},
	
	input: {
		height: 40,
		width: 300,
		marginBottom: 30,
		fontSize: 14,
	},
	
	loginBtn: {
		marginTop: 20,
		width: 300,
		height: 40,
		backgroundColor: THEME_COLOR,
		borderRadius: 20,
	},
	
	loginText: {
		color: THEME_COLOR_WHITE,
		textAlign: 'center',
		lineHeight: 40,
	},
	
});

export default class extends Component<> {
	static navigationOptions = ({navigation, navigationOptions}) => {
		return {
			title: '注册',
		}
	};
	
	constructor(props) {
		super(props);
		
		this.state = {
			phone: "",
			password: "",
			passwordTwo: '',
		};
	}
	
	componentDidMount() {
	
	}
	
	async register() {
		if(!this.state.phone || !this.state.password || !this.state.passwordTwo){
			Alert.alert("提示","请输入信息");
			return;
		}
		
		if(this.state.password !== this.state.passwordTwo){
			Alert.alert("提示","两次密码不一致");
			return;
		}
		
		let res = await this.$post("user/register", this.state);
		if (res.code === 0) {
			this.refs.statusModal.setModalVisible({
				visible: true,
				type: 'success',
				text: '成功',
				duration: 2000,
				callback: ()=>{
					this.goback()
				},
			});
		} else {
			Alert.alert("错误",res.msg);
		}
	}
	
	goback() {
		this.props.navigation.goBack();
	}
	
	render() {
		return (
			<View style={styles.page}>
				<TextInput
					style={styles.input}
					underlineColorAndroid={BUTTON_PRESS_COLOR}
					onChangeText={(phone) => this.setState({phone})}
					value={this.state.phone}
					keyboardType={"numeric"}
					placeholder={"手机号"}
				/>
				
				<TextInput
					style={styles.input}
					underlineColorAndroid={BUTTON_PRESS_COLOR}
					onChangeText={(password) => this.setState({password})}
					value={this.state.password}
					keyboardType={"default"}
					autoCapitalize={'none'}
					secureTextEntry={true}
					placeholder={"登录密码"}
				/>
				
				<TextInput
					style={styles.input}
					underlineColorAndroid={BUTTON_PRESS_COLOR}
					onChangeText={(passwordTwo) => this.setState({passwordTwo})}
					value={this.state.passwordTwo}
					keyboardType={"default"}
					autoCapitalize={'none'}
					secureTextEntry={true}
					placeholder={"再次输入密码"}
				/>
				
				<TouchableHighlight
					style={styles.loginBtn}
					underlayColor={BUTTON_PRESS_COLOR}
					onPress={() => {
						this.register()
					}}
				>
					<Text style={styles.loginText}>
						注册
					</Text>
				</TouchableHighlight>
				
				<StatusModal ref="statusModal"/>
			</View>
		);
	}
}