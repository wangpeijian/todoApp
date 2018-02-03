import {AppRegistry} from 'react-native';
import React, { Component } from 'react';
import plugin from './src/plugin';

new plugin(Component);

import App from './App';

AppRegistry.registerComponent('app_todo', () => App);
