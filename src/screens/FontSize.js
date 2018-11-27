import React, { Component } from "react";
import {
  AppRegistry,
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView
} from "react-native";

import SillyInput from "../components/InputTests";

const buttonStyles = StyleSheet.create({
  borderRadius: 10,
  paddingVertical: 8,
  paddingHorizontal: 12
});

class Home extends Component {
  static navigationOptions = {
    title: "Change font size",
    headerTransparent: true
  };

  inputValue = React.createRef();

  render() {
    const { navigate } = this.props.navigation,
      { fontSize, setFontSize } = this.props.screenProps;

    return (
      <ScrollView style={{ paddingHorizontal: 10, paddingTop: 70 }}>
        <Text style={{ fontSize: 28, fontWeight: "200", marginBottom: 30 }}>
          Home.js
        </Text>

        <Text style={{ fontSize: fontSize }}>Font size: {fontSize}px</Text>
        <TextInput
          keyboardType="numeric"
          ref={this.inputValue}
          placeholder="Change that font size!"
          onChangeText={text => {
            if (!isNaN(+text)) {
              setFontSize(+text);
            }
            console.log("ekowowejfoiewf");
          }}
          defaultValue={String(this.props.screenProps.fontSize)}
          style={{ borderBottomWidth: 1, padding: 5, marginVertical: 10 }}
        />

        <TouchableOpacity
          style={{
            ...buttonStyles,
            alignSelf: "center",
            backgroundColor: "#9593ff"
          }}
          onPress={() => {
            this.props.screenProps.test();
          }}
        >
          <Text style={{ color: "#fff" }}>Increase font size by '1px'</Text>
        </TouchableOpacity>

        <View
          style={{
            position: "absolute",
            top: 5,
            right: 0
          }}
        >
          <Button onPress={() => navigate("Example")} title="Go to Example ›" />
        </View>
        {/* Input tests */}
        <Text style={{ marginTop: 20, marginBottom: 10, textAlign: "center" }}>
          Tests with 'TextInput' component
        </Text>
        <SillyInput />
      </ScrollView>
    );
  }
}

export default Home;
