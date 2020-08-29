import React from "react";
import { View, Image, Text, StyleSheet, Button , Picker, Switch, TextInput} from "react-native";
import UserActions from "./user-actions";

const UserItem = ({ item: user }) => {
  let isEnabled=false;  //changed to react hook
  let toggleSwitch = ()=>{alert('value changed'); isEnabled=!isEnabled};
  let value='aa';
  let onChangeText = (text)=>value=text;
  return (
    <View style={styles.row}>
      <Image sttyle={styles.rowIcon} source={user.picture.medium} />
      <View style={styles.rowData}>
        <Text style={styles.rowDataText}>{`${user.name.title} ${
          user.name.first
        } ${user.name.last}`}</Text>
        <Text style={styles.rowDataSubText}>{user.email}</Text>
        <Button
  onPress={() => {
    alert('You tapped the button!');
  }}
  title="Press Me"
/>
<UserActions/>
<Picker>
  <Picker.Item label="Goblet of Fire" />
  <Picker.Item label="Order of the Phoenix" />
</Picker>
<Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
        <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => onChangeText(text)}
      value={value}
    />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    marginBottom: 5,
    backgroundColor: "white",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(0,0,0,0.1)"
  },
  rowIcon: {
    width: 64,
    height: 64,
    marginRight: 20,
    borderRadius: "50%",
    boxShadow: "0 1px 2px 0 rgba(0,0,0,0.1)"
  },
  rowData: {
    flex: 1
  },
  rowDataText: {
    fontSize: 15,
    textTransform: "capitalize",
    color: "#4b4b4b"
  },
  rowDataSubText: {
    fontSize: 13,
    opacity: 0.8,
    color: "#a8a689",
    marginTop: 4
  }
});

export default UserItem;
