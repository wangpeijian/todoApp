import React, {Component} from 'react';
import {
    StyleSheet,
    TouchableHighlight,
    Text,
    View,
    Modal,
    Image,
    Animated,
    Easing,
} from 'react-native';

const styles = StyleSheet.create({
    hidden: {
        display: 'none'
    },

    mask: {
        // backgroundColor: '#00000050',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

    modal: {
        width: 100,
        height: 100,
        borderRadius: 10,
        backgroundColor: '#00000090',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

    status: {
        width: 70,
        height: 70,
    },

    rotate: {},

    text: {
        textAlign: 'center',
        color: '#fff'
    }
});

const $loading = require('../../img/component/public/statusModal/loading.png');
const $success = require('../../img/component/public/statusModal/success.png');
const $error = require('../../img/component/public/statusModal/error.png');

export default class extends Component<> {
    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false,
            type: props.type || 'loading',    //loading success error
            text: props.text || '加载中...',
            duration: props.duration || 3000,

            rotate: new Animated.Value(0),
        };
    }

    componentDidMount() {

    }

    spin() {
        this.state.rotate.setValue(0);
        Animated.timing(
            this.state.rotate,
            {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear
            }
        ).start(() => {
            //TODO 增加停止判断
            this.spin()
        })
    }

    setModalVisible(visible) {
        if (visible !== this.state.visible) {
            this.setState({modalVisible: visible});

            if (visible) {
                if (this.state.type === 'loading') {
                    this.spin();
                }

                setTimeout(() => {
                    this.setState({modalVisible: false});
                }, this.state.duration);
            }
        }
    }

    //根据弹出层类型返回不通的图片
    getContent() {

        const spin = this.state.rotate.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        });

        let image;
        const ImageStyles = [styles.status];
        switch (this.state.type) {
            case 'loading':
                image = $loading;
                ImageStyles.push({
                    transform: [{rotate: spin}]
                });
                break;
            case 'success':
                image = $success;
                break;
            case 'error':
                image = $error;
                break;

        }

        if (this.state.text) {
            return <View>
                <Animated.Image style={ImageStyles}
                                source={image}>
                </Animated.Image>
                <Text style={styles.text}>{this.state.text}</Text>
            </View>
        } else {
            return <View>
                <Animated.Image style={ImageStyles}
                                source={image}>
                </Animated.Image>
            </View>
        }
    }

    render() {

        return (
            <Modal
                animationType='fade'
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    // this.setModalVisible(false)
                }}
                onShow={() => {
                }}
            >
                <View style={styles.mask}>
                    <View style={styles.modal}>
                        {this.getContent()}
                    </View>
                </View>

            </Modal>
        );
    }
}