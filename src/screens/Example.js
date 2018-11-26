import React, { Component } from "react";
import {
  Alert,
  ActivityIndicator,
  Button,
  Text,
  TextInput,
  Image,
  View,
  ScrollView
} from "react-native";

class Example extends Component {
  static navigationOptions = {
    title: "Resize image"
  };

  constructor(props) {
    super(props);
    this.state = { width: 20, height: 20 };
  }

  inputVal = React.createRef();

  resizeImage = () => {
    let size = +this.inputVal.current._lastNativeText;

    if (!isNaN(size)) this.setState({ width: size, height: size });
    else Alert.alert("Type numeric size");
  };

  render() {
    const { navigate } = this.props.navigation,
      { fontSize } = this.props.screenProps;

    return (
      <ScrollView>
        <Text style={{ fontSize: 28, fontWeight: "200", marginBottom: 30 }}>
          Example.js
        </Text>
        <View
          style={{
            position: "absolute",
            top: 5,
            right: 0
          }}
        >
          <Button onPress={() => navigate("Home")} title="Go Home ›" />
        </View>

        <TextInput
          ref={this.inputVal}
          placeholder="Type a number and press button below to resize image"
        />

        <Button
          onPress={() => {
            this.setState({ showLoading: true }, () => {
              setTimeout(() => {
                this.setState({ showLoading: false });

                this.resizeImage();
              }, 1000);
            });
          }}
          title="Resize image"
          disabled={this.state.showLoading}
        />

        <Image
          resizeMode="cover"
          style={{ width: this.state.width, height: this.state.height }}
          source={require("../../assets/img/home.jpg")}
        />

        <ActivityIndicator
          color="#40f"
          style={!this.state.showLoading ? { display: "none" } : ""}
        />
      </ScrollView>
    );
  }
}

export default Example;
