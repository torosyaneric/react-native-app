import React, { Component } from "react";
import {
  Alert,
  DatePickerIOS,
  Button,
  Text,
  View,
  ScrollView
} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import { LinearGradient } from "expo";

import Example from "./src/screens/Example";
import FontSize from "./src/screens/FontSize";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { chosenDate: new Date() };
  }

  static navigationOptions = {
    title: "Home",
    header: null
  };

  setDate = newDate => {
    this.setState({ chosenDate: newDate });
  };

  render() {
    const { navigate } = this.props.navigation,
      { fontSize } = this.props.screenProps;

    return (
      <LinearGradient style={{ height: "100%" }} colors={["#adf", "#ffc99d"]}>
        <ScrollView style={{ paddingTop: 30 }}>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: fontSize * 3,
                fontWeight: "200",
                color: "#fff",
                marginVertical: 30
              }}
            >
              Hello World!
            </Text>
            <Button
              onPress={() => navigate("FontSize")}
              title="Change font size"
            />

            <Button onPress={() => navigate("Example")} title="Resize image" />
          </View>

          <Text
            style={{
              textAlign: "center",
              fontWeight: "300",
              fontSize: 14,
              marginTop: 30
            }}
          >
            {" TEST AREA "}
          </Text>

          <DatePickerIOS
            date={this.state.chosenDate}
            onDateChange={this.setDate}
          />
        </ScrollView>
      </LinearGradient>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Main,
    FontSize,
    Example
  },
  {
    initialRouteName: "Main"
  }
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { fontSize: 16 };
  }

  increaseFontSize = () => {
    this.setState(previousState => {
      return {
        fontSize: previousState.fontSize + 1
      };
    });
  };

  setFontSize = size => this.setState({ fontSize: size });

  render() {
    return (
      <AppNavigator
        screenProps={{
          fontSize: this.state.fontSize,
          test: this.increaseFontSize,
          setFontSize: this.setFontSize
        }}
      />
    );
  }
}

export default App;
