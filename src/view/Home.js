import React, {Component} from 'react';
import {
	Platform,
	StyleSheet,
	Button,
	Text,
	View,
	Alert,
	FlatList,
	TouchableOpacity,
	TouchableHighlight,
	Image,
} from 'react-native';
import {THEME_COLOR, THEME_COLOR_WHITE, THEME_COLOR_BORDER, BUTTON_PRESS_COLOR} from "../config";

const styles = StyleSheet.create({
	page: {
		flex: 1,
		alignItems: 'center',
	},
	
	list: {
		overflow: 'hidden',
	},
	
	item: {
		marginRight: 5,
		marginLeft: 5,
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: THEME_COLOR_BORDER,
		borderStyle: 'solid',
		backgroundColor: THEME_COLOR_WHITE
	},
	
	content: {
		fontSize: 18,
	},
	
	timeBox: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	
	time: {
		marginTop: 10,
		fontSize: 10,
	},
	
	addButtonBox: {
		position: 'absolute',
		bottom: 50,
		right: 50,
		width: 60,
		height: 60,
		backgroundColor: THEME_COLOR,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 30,
	},
	
	addIcon: {
		width: 40,
		height: 40,
	}
});

const addButton = require('../img/pages/home/add_item.png');

export default class extends Component<> {
	static navigationOptions = {};
	
	constructor(props) {
		super(props);
		
		
		this.state = {
			listData: [],
			page: 1,
			end: false,
			refreshing: false
		};
	}
	
	componentDidMount() {
		//this.getListData();
	}
	
	async getListData(refresh = false) {
		const userId = await this.$getStorage("id");
		let res = await this.$post("todo/getList", {
			userId: userId,
			page: this.state.page,
		});
		if (res.code === 0) {
			
			let listData = refresh ? [] : this.state.listData;
			listData = listData.concat(res.data);
			
			this.setState({
				end: res.data.length < 10,
				listData: listData,
				page: this.state.page + 1,
				refreshing: false,
			});
			
		}else{
		
		}
	}
	
	getListItem({id, content, updateTime}) {
		return <TouchableOpacity
			activeOpacity={0.8}
		>
			<View style={styles.item} key={id}>
				<Text style={styles.content}>{content}</Text>
				<View style={styles.timeBox}>
					<Text style={styles.time}>{updateTime}</Text>
				</View>
			</View>
		
		</TouchableOpacity>
		
	}
	
	onEndReached() {
		if (!this.state.end) {
			this.getListData();
		}
	}
	
	onRefresh() {
		this.setState({
			page: 1,
			end: false,
		}, () => {
			this.getListData(true)
		})
	}
	
	addNew() {
		this.props.navigation.navigate('AddItem')
	}
	
	render() {
		return (
			<View style={styles.page}>
				<FlatList
					style={styles.list}
					data={this.state.listData}
					renderItem={({item, separators}) => {
						return this.getListItem(item)
					}}
					keyExtractor={(item, index) => item.id}
					initialNumToRender={10}
					onEndReached={() => {
						this.onEndReached()
					}}
					onEndReachedThreshold={0.05}
					onRefresh={() => {
						this.onRefresh()
					}}
					refreshing={this.state.refreshing}
				/>
				
				<TouchableHighlight style={styles.addButtonBox} onPress={() => {
					this.addNew()
				}}>
					<Image style={styles.addIcon} source={addButton}></Image>
				</TouchableHighlight>
			</View>
		);
	}
}