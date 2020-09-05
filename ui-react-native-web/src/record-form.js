import React, { useState } from "react";
import moment from "moment";
import {
  Text,
  TextInput,
  Button,
  View,
  TouchableHighlight,
  StyleSheet,
} from "react-native";
import Constants from "./constants";

const styles = StyleSheet.create({
  actionsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 10,
  },
  actionButton: {
    padding: 10,
    color: "white",
    borderRadius: 6,
    width: 80,
    backgroundColor: "#808080",
    marginRight: 5,
    marginLeft: 5,
  },
  actionButtonDestructive: {
    backgroundColor: "#ff4b21",
  },
  actionButtonText: {
    textAlign: "center",
  },
});

const RecordForm = ({ users }) => {
  const [state, setState] = useState({
    recordDate: moment().format("YYYY-MM-DD"),
    count: 0,
    comment: "",
    refForm: React.createRef(),
  });

  const onTextChange = (name) => (value) => {
    const updated = {};
    updated[name] = value;
    setState({ ...state, ...updated });
    // setState( Object.assign(state, { [name]: value }));
  };

  async function sendRecord() {
    console.log("sendRecord");
    console.log("state", state);

    const data = {
      date: state.recordDate,
      count: state.count,
      comment: state.comment,
      goalId: "weight",
    };
    const url = `${Constants.REST_ENDPOINT}record/`;
    try {
      const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      });
      console.log(response);
      if(response.ok) {
        alert("Save Complete");
      } else {
        console.log('Network response was not ok.');
      }
     
    } catch (error) {
      alert("Error: " + error);
    }
  }

  return (
    <View>
      <TouchableHighlight
        style={[styles.actionButton, styles.actionButtonDestructive]}
        onPress={() => {
          const updated = { count: 140.0 };
          setState({ ...state, ...updated });
        }}
      >
        <Text style={styles.actionButtonText}>Default: 140.0</Text>
      </TouchableHighlight>

      <View style={styles.actionsContainer}>
        <TouchableHighlight
          style={[styles.actionButton, styles.actionButtonDestructive]}
          onPress={() => {
            const factor = -0.2;
            const updated = { count: +(state.count + factor).toFixed(2) };
            setState({ ...state, ...updated });
          }}
        >
          <Text style={styles.actionButtonText}>-.2</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[styles.actionButton, styles.actionButtonDestructive]}
          onPress={() => {
            const factor = -1.0;
            const updated = { count: +(state.count + factor).toFixed(2) };
            setState({ ...state, ...updated });
          }}
        >
          <Text style={styles.actionButtonText}>-1</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[styles.actionButton, styles.actionButtonDestructive]}
          onPress={() => {
            const factor = 1.0;
            const updated = { count: +(state.count + factor).toFixed(2) };
            setState({ ...state, ...updated });
          }}
        >
          <Text style={styles.actionButtonText}>+1</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[styles.actionButton, styles.actionButtonDestructive]}
          onPress={() => {
            const factor = 0.2;
            const updated = { count: +(state.count + factor).toFixed(2) };
            setState({ ...state, ...updated });
          }}
        >
          <Text style={styles.actionButtonText}> +.2</Text>
        </TouchableHighlight>
      </View>

      <View style={styles.actionsContainer}>
        <Text style={styles.actionButtonText}>Track</Text>

        <select className="form-control form-control-sm" name="goal" id="goalEntry">
          <option>weight</option>
        </select>
      </View>
      <View style={styles.actionsContainer}>
        <Text style={styles.actionButtonText}>Count</Text>

        <TextInput
          type="text"
          keyboardType="numeric"
          value={state.count}
          onChangeText={onTextChange("count")}
          placeholder="Count"
        />
      </View>

      <View style={styles.actionsContainer}>
        <Text style={styles.actionButtonText}>Date</Text>

        <TextInput
          type="text"
          value={state.recordDate}
          onChangeText={onTextChange("recordDate")}
          placeholder="yyyy-mm-dd"
        />
      </View>
      <View style={styles.actionsContainer}>
        <Text style={styles.actionButtonText}>Comment</Text>
        <TextInput
          type="text"
          value={state.comment}
          onChangeText={onTextChange("comment")}
          placeholder="comment"
        />
      </View>

      <Button
        onPress={() => {
          sendRecord();
        }}
        title="Submit"
      />
    </View>
  );
};

export default RecordForm;
