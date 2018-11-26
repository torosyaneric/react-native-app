import React, { Component } from "react";
import {
  Alert,
  AppRegistry,
  StyleSheet,
  TextInput,
  Text,
  View
} from "react-native";

class SillyInput extends Component {
  constructor(props) {
    super(props);

    this.state = { inputValue: "", secondInputFocus: false };
  }

  test = React.createRef();

  clearInput = () => {
    this.setState({ inputValue: "" });
    console.log(this.test.current.isFocused());

    this.secondTextInput.focus();
  };

  yuhu = () => Alert.alert("Yooohuu");

  render() {
    return (
      <View style={{ borderColor: "#ddf" }}>
        <TextInput
          autoFocus={true}
          ref={this.test}
          style={inputStyles}
          autoCapitalize="words"
          placeholder="Type something"
          value={this.state.inputValue}
          onChangeText={text => this.setState({ inputValue: text })}
          onSubmitEditing={this.clearInput}
          returnKeyType="next"
          blurOnSubmit={false}
        />

        <TextInput
          selectionColor="#f2d"
          keyboardType="email-address"
          ref={input => (this.secondTextInput = input)}
          style={inputStyles}
          placeholder="Next field..."
          onSubmitEditing={this.yuhu}
        />
      </View>
    );
  }
}

const inputStyles = StyleSheet.create({
  borderWidth: 1,
  borderRadius: 10,
  height: 40,
  padding: 10,
  marginHorizontal: 10,
  marginBottom: 10
});

export default SillyInput;
