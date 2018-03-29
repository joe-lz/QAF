import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, TextInput } from 'react-native';

import mixin from '../styleguide/mixin'

export default class Input extends Component {
  constructor (props) {
    super(props)
    this.state = {
      labelTop: 0,
      labelColor: mixin.fc.gray,
      value: '',
      borderBottomWidth: 1,
      borderBottomColor: mixin.fc.gray_sub_sub
    }
  }
  onFocus() {
    this.setState({
      labelTop: -40,
      labelColor: mixin.fc.f_color,
      borderBottomWidth: 2,
      borderBottomColor: mixin.fc.f_color
    })
  }
  onBlur () {
    if (this.state.value) {
    } else {
      this.setState({
        labelTop: 0,
        labelColor: mixin.fc.gray,
        borderBottomWidth: 1,
        borderBottomColor: mixin.fc.gray_sub_sub
      })
    }
  }
  onChange (value) {
    this.setState({
      value: value
    })
    this.props.onChange(value)
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputWrapper}>
          { this.props.label && <Text style={{
            position: 'absolute',
            top: this.state.labelTop,
            fontWeight: mixin.fw.fw_lg,
            color: this.state.labelColor,
            lineHeight: 40,
            backgroundColor: 'transparent'
          }}>
            {this.props.label}</Text>
          }
          <TextInput style={{
            height: 50,
            borderBottomWidth: this.state.borderBottomWidth,
            borderBottomColor: this.state.borderBottomColor }}
            autoFocus={true}
            keyboardType={'numeric'}
            maxLength={this.props.maxLength}
            onChangeText={(value) => this.onChange(value)}
            onFocus={ () => this.onFocus()}
            onBlur={ () => this.onBlur()}
            value={this.state.phone}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30
  },
  inputWrapper: {
    marginTop: 30,
  },
  input: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: 'red'
  }
})

{/* <Input
  maxLength={11}
  label={'手机号'}
  onChange={(value) => {
  this.setState({
    phone: value
  })
  if ($api.isPhone(value)) {
    this.setState({
      isPhone: true
    })
  } else {
    this.setState({
      isPhone: false
    })
  }
}}></Input> */}
