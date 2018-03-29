import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, ImageBackground, TouchableHighlight } from 'react-native';

import mixin from '../styleguide/mixin'

import Icon from 'react-native-vector-icons/FontAwesome'

export default class oneComponent extends Component {
  constructor () {
    super()
    this.state = {
    }
  }
  render() {
    const {navigate, goBack, state} = this.props.navigation
    return (
      <TouchableHighlight
        style={styles.container}
        onPress={() => goBack()}
        underlayColor={ 'white' }>
        <View style={styles.headerWrapper}>
          <Icon name="angle-left" size={mixin.icon.nm} color={mixin.fc.main} style={styles.icon}/>
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    position: 'relative',
    width: 30,
    height: 30,
    overflow: 'hidden'
  },
  icon: {
    position: 'absolute',
    top: 2,
    width: 24,
    textAlign: 'center'
  }
})
