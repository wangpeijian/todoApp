import React, {Component} from 'react';
import {
	StyleSheet,
	TouchableHighlight,
	Text,
	View,
	TextInput,
	Image,
} from 'react-native';

import {THEME_COLOR, BUTTON_PRESS_COLOR, THEME_COLOR_WHITE} from '../config'
import StatusModal  from '../component/public/StatusModal'

const styles = StyleSheet.create({
	page: {
		flex: 1,
		flexDirection: 'column',
		// justifyContent: 'center',
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
		width: 300,
		height: 40,
		backgroundColor: THEME_COLOR,
		borderRadius: 20,
	},

	loginText: {
		color: THEME_COLOR_WHITE,
		textAlign: 'center',
		lineHeight: 40,
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
        this.refs.statusModal.setModalVisible(true);
return;
		let res = await this.$post("user/login", this.state);
		if(res.code === 0){
            this.refs.statusModal.setModalVisible(true);
        }else {
            alert(res.msg);
        }
	}

	render() {
		return (
			<View style={styles.page}>
				<Image style={styles.logo}
				       source={require('../img/logo.jpg')}>
				</Image>

				<TextInput
					style={styles.input}
					selectionColor={BUTTON_PRESS_COLOR}
					underlineColorAndroid={BUTTON_PRESS_COLOR}
					onChangeText={(phone) => this.setState({phone})}
					value={this.state.phone}
					keyboardType={"numeric"}
					placeholder={"手机号"}
				/>

				<TextInput
					style={styles.input}
					selectionColor={BUTTON_PRESS_COLOR}
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


                <StatusModal ref="statusModal" />
			</View>
		);
	}
}