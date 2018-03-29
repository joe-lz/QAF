import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, TextInput } from 'react-native';

import mixin from '../../styleguide/mixin'
const normalStyle = {
  borderBottomWidth: 1,
  borderBottomColor: mixin.fc.main
}
const primaryStyle = {
  borderBottomWidth: 2,
  borderBottomColor: mixin.fc.main
}

export default class Input extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ...normalStyle
    }
  }
  onFocus() {
    this.setState({
      ...primaryStyle
    })
  }
  onBlur () {
    if (this.state.value) {
    } else {
      this.setState({
        ...normalStyle
      })
    }
  }
  onChange (value) {
    this.props.onChange(value)
  }
  render() {
    return (
      // <View style={styles.container}>
      <View style={{
        paddingTop: this.props.paddingTop ? this.props.paddingTop : mixin.padding.lg,
        paddingBottom: this.props.paddingBottom ? this.props.paddingBottom : mixin.padding.lg,
      }}>
        <View style={styles.inputWrapper}>
          <TextInput style={{
            height: 50,
            fontSize: mixin.fs.lg,
            borderBottomWidth: this.state.borderBottomWidth,
            borderBottomColor: this.state.borderBottomColor }}
            autoFocus={true}
            keyboardType={this.props.keyboardType ? this.props.keyboardType : 'default'}
            maxLength={this.props.maxLength ? this.props.maxLength : 50}
            onChangeText={(value) => this.onChange(value)}
            onFocus={ () => this.onFocus()}
            onBlur={ () => this.onBlur()}
            value={this.props.value ? this.props.value : ''}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  // container: {
  //   paddingTop: mixin.padding.lg,
  //   paddingBottom: mixin.padding.lg
  // }
})
