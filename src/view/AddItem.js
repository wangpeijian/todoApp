import React, {Component} from 'react';
import {
	Platform,
	StyleSheet,
	Button,
	Text,
	View,
	TextInput,
	TouchableHighlight,
	Alert
} from 'react-native';
import {THEME_COLOR, THEME_COLOR_WHITE, THEME_COLOR_BORDER, BUTTON_PRESS_COLOR} from "../config";
import StatusModal from '../component/public/StatusModal'

const styles = StyleSheet.create({
	page: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 10,
		paddingLeft: 10,
		paddingRight: 10,
	},
	
	input: {
		height: 200,
		flex: 1,
		borderWidth: 1,
		borderColor: THEME_COLOR_BORDER,
		borderStyle: 'solid',
	},
	
	submitBtn: {
		marginTop: 20,
		width: 300,
		height: 40,
		backgroundColor: THEME_COLOR,
		borderRadius: 20,
	},
	
	submitText: {
		color: THEME_COLOR_WHITE,
		textAlign: 'center',
		lineHeight: 40,
	},
});


export default class extends Component<> {
	static navigationOptions = ({navigation, navigationOptions}) => {
		return {
			title: '新增事项',
		}
	};
	
	constructor(props) {
		super(props);
		
		this.state = {
			content: ''
		};
	}
	
	componentDidMount() {
	
	}
	
	goback() {
		this.props.navigation.goBack();
	}
	
	async submit(){
		let res = await this.$post("todo/add", {
			content: this.state.content,
			userId: this.$getStorage("id")
		});
		
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
	
	render() {
		return (
			<View style={styles.page}>
				
				<TextInput
					style={styles.input}
					underlineColorAndroid="transparent"
					onChangeText={(content) => this.setState({content})}
					value={this.state.content}
					keyboardType={"default"}
					autoCapitalize={'none'}
					placeholder={"内容"}
					multiline={true}
					textAlignVertical='top'
					maxLength={200}
				/>
				
				<TouchableHighlight
					style={styles.submitBtn}
					underlayColor={BUTTON_PRESS_COLOR}
					onPress={() => {
						this.submit()
					}}
				>
					<Text style={styles.submitText}>
						提交
					</Text>
				</TouchableHighlight>
				
				<StatusModal ref="statusModal"/>
			</View>
		);
	}
}