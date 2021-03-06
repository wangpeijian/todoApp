import React, {Component} from 'react';
import {
	StyleSheet,
	TouchableHighlight,
	Text,
	View,
	TextInput,
	Image,
	Alert,
} from 'react-native';

import {THEME_COLOR, BUTTON_PRESS_COLOR, THEME_COLOR_WHITE, THEME_COLOR_BORDER} from '../config'
import StatusModal from '../component/public/StatusModal'

const styles = StyleSheet.create({
	page: {
		flex: 1,
		alignItems: 'center',
	},
	
	logo: {
		width: 150,
		height: 150,
		marginTop: 50,
		marginBottom: 50,
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
	
	registerBox: {
		marginTop: 10,
		width: 280,
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	
	register: {
		color: THEME_COLOR,
		paddingLeft: 2,
		paddingRight: 2,
		marginTop: 5,
		textAlign: 'right',
		// borderBottomWidth: 1,
		// borderColor: THEME_COLOR_BORDER,
		// borderStyle:'solid',
	}
});

export default class extends Component<> {
	static navigationOptions = ({navigation, navigationOptions}) => {
		return {
			title: '登录',
		}
	};
	
	constructor(props) {
		super(props);
		
		this.state = {
			phone: "",
			password: "",
		};
	}
	
	componentDidMount() {
	
	}
	
	async login() {
		if(!this.state.phone || !this.state.password){
			Alert.alert("提示","请输入手机号密码");
			return;
		}
		
		let res = await this.$post("user/login", this.state);
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
			const {id, name, phone} = res.data;
			this.$setStorage("id", id);
			this.$setStorage("name", name);
			this.$setStorage("phone", phone);
		} else {
			Alert.alert("错误",res.msg);
		}
	}
	
	goback() {
		this.props.navigation.goBack();
	}
	
	
	register() {
		this.props.navigation.navigate('Register', {});
	}
	
	render() {
		return (
			<View style={styles.page}>
				<Image style={styles.logo}
				       source={require('../img/logo.jpg')}>
				</Image>
				
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
				
				<TouchableHighlight
					style={styles.loginBtn}
					underlayColor={BUTTON_PRESS_COLOR}
					onPress={() => {
						this.login()
					}}
				>
					<Text style={styles.loginText}>
						登录
					</Text>
				</TouchableHighlight>
				
				<TouchableHighlight style={styles.registerBox} onPress={() => {
					this.register()
				}}>
					<Text style={styles.register}>注册</Text>
				</TouchableHighlight>
				
				<StatusModal ref="statusModal"/>
			</View>
		);
	}
}