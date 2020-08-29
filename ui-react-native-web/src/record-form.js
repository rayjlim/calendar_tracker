import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Button,
  Picker,
  Switch,
  TextInput,
} from "react-native";
import Constants from "./constants";

async function sendRecord() {
  console.log("sendRecord");
  const data = {
    date: "2020-08-20",
    count: "20",
    comment: "new comment",
    goalId: "weight",
  };
  const url = `${Constants.REST_ENDPOINT}record/`;
  // const response = await fetch(url);
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
}

const UserList = ({ users }) => {
  return (
    <section class="quickBtnRow">
      <a class="btn btn-primary btn-sm" id="baseWeightBtn">
        144 weight
      </a>
      <div>
        <a class="btn btn-outline-danger btn-sm" id="weightDecrementSmallBtn">
          -.2
        </a>
        <a class="btn btn-outline-success btn-sm" id="weightDecrementLargeBtn">
          -1
        </a>
        <a class="btn btn-outline-success btn-sm" id="weightIncrementLargeBtn">
          +1
        </a>
        <a class="btn btn-outline-danger btn-sm" id="weightIncrementSmallBtn">
          +.2
        </a>
      </div>

      <form method="post" action="" class="form-inline">
        <div class="form-row">
          <div class="col">
            <select
              class="form-control form-control-sm"
              name="goal"
              id="goalEntry"
            >
              <option>weight</option>
            </select>
          </div>

          <div class="input-group input-group-sm mb-3 col">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-sm">
                Count
              </span>
            </div>
            <input
              type="text"
              name="count"
              value=""
              id="countEntry"
              placeholder="Count"
              class="form-control"
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
            />
          </div>
        </div>
        <div class="form-row">
          <div class="input-group input-group-sm mb-3 col">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-sm">
                Date
              </span>
            </div>
            <input
              type="text"
              class="form-control"
              placeholder="yyyy-mm-dd"
              name="date"
              id="logdate"
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
            />
          </div>
        </div>
        <div class="form-group">
          <label for="comment">Comment:</label>
          <input type="text" name="comment" value="" />
        </div>
        <input type="submit" name="go" value="Create" class="btn btn-warning" />
        <Button
          onPress={() => {
            sendRecord();
          }}
          title="Submit"
        />
      </form>
    </section>
  );
};

export default UserList;
