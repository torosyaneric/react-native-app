import React, { Component } from "react";
import {
  Alert,
  DatePickerIOS,
  Button,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  Image,
  FlatList,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView
} from "react-native";

import { createStackNavigator, createAppContainer } from "react-navigation";

import { LinearGradient } from "expo";

import Example from "./src/screens/Example";
import FontSize from "./src/screens/FontSize";

let hue = 0;
let imgCounter = 1;

const initialData = [
    { name: "Dog", age: 7 },
    { name: "Man", age: 21 },
    { name: "Capibara", age: 13 },
    { name: "Girl", age: 20 },
    { name: "Bacteria", age: 13000 },
    { name: "Rhino", age: 10 }
  ],
  styles = StyleSheet.create({
    btnOutlineStyles: {
      padding: 10,
      borderRadius: 10,
      borderWidth: 1,
      alignItems: "center"
    }
  });

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenDate: new Date(),
      flatListData: initialData,
      nameValue: "",
      ageValue: "",
      dynamicColor: "hsl(0, 50%, 85%)"
    };
  }

  timer = setInterval(() => {
    this.setState({ dynamicColor: `hsl(${hue}, 50%, 85%)` });

    hue++;

    if (hue === 360) hue = 0;
  }, 40);

  static navigationOptions = {
    title: "",
    headerTransparent: true,
    headerBackgroundTransitionPreset: "fade"
  };

  setDate = newDate => {
    this.setState({ chosenDate: newDate });
  };

  render() {
    const { navigate } = this.props.navigation,
      { fontSize } = this.props.screenProps;

    return (
      <View style={{ flex: 1 }}>
        <LinearGradient
          style={{
            flex: 1,
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            position: "absolute"
          }}
          colors={["#adf", this.state.dynamicColor]}
        />

        <ScrollView style={{ paddingTop: 30 }}>
          <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={40}>
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
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => navigate("FontSize")}
                style={[
                  styles.btnOutlineStyles,
                  {
                    width: 200,
                    borderColor: "#fff",
                    fontSize: 20,
                    fontWeight: "300"
                  }
                ]}
              >
                <Text style={{ color: "#fff" }}>Change font size</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => navigate("Example")}
                style={[
                  styles.btnOutlineStyles,
                  {
                    width: 200,
                    borderColor: "#fff",
                    fontSize: 20,
                    fontWeight: "300",
                    marginTop: 8
                  }
                ]}
              >
                <Text style={{ color: "#fff" }}>Resize image</Text>
              </TouchableOpacity>
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

            {/* <DatePickerIOS
            date={this.state.chosenDate}
            onDateChange={this.setDate}
          /> */}
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 24,
                  textAlign: "center",
                  fontWeight: "300",
                  marginVertical: 10
                }}
              >
                Add a creature!
              </Text>

              <FlatList
                style={{ height: 180, width: 200 }}
                data={this.state.flatListData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginVertical: 6
                    }}
                  >
                    <Image
                      resizeMode="cover"
                      blurRadius={1}
                      style={{ borderRadius: 10, width: 20, height: 20 }}
                      source={{
                        uri: `https://picsum.photos/200/200/?image=1${index}`
                      }}
                    />
                    <Text style={{ marginLeft: 5 }}>
                      {`The ${item.name} is ${item.age}`}
                    </Text>
                  </View>
                )}
              />

              <View style={{ marginTop: 8, width: 150 }}>
                <TextInput
                  style={{
                    borderBottomWidth: 1,
                    padding: 5,
                    marginBottom: 6
                  }}
                  placeholder="Name..."
                  value={this.state.nameValue}
                  onChangeText={text => this.setState({ nameValue: text })}
                />

                <TextInput
                  style={{
                    borderBottomWidth: 1,
                    padding: 5,
                    marginVertical: 6
                  }}
                  placeholder="Age..."
                  keyboardType="numeric"
                  value={this.state.ageValue}
                  onChangeText={text => this.setState({ ageValue: text })}
                />

                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => {
                    if (this.state.nameValue && this.state.ageValue)
                      this.setState(
                        previousState => ({
                          flatListData: [
                            ...previousState.flatListData,
                            {
                              name: this.state.nameValue,
                              age: this.state.ageValue
                            }
                          ]
                        }),
                        this.setState({ nameValue: "", ageValue: "" })
                      );
                    else Alert.alert("Please fill both fields");
                  }}
                  style={{
                    padding: 8,
                    borderRadius: 8,
                    alignItems: "center",
                    backgroundColor: "rgba(133, 145, 255, 0.5)",
                    marginTop: 10,
                    marginBottom: 18
                  }}
                >
                  <Text style={{ color: "#fff" }}>Add!</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
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
