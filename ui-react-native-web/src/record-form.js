import React, { useState } from 'react';
import moment from 'moment';
import {

  Button

} from "react-native";
import Constants from "./constants";

const UserList = ({ users }) => {
  const [state, setState] = useState({
    recordDate: moment().format('YYYY-MM-DD'),
    count: 0,
    comment: '',
    refForm: React.createRef(),
  });


  function fieldChange(e) {
    e.preventDefault();
    console.log('fieldChange#e :', e);
    const target = e.target;
    const name = target.name;
    console.log('target :>> ', target.name, target.value);
    console.log('state[name] :>> ', state[target.name]);
    const updated = {};
    updated[name] = target.value;
    setState({ ...state, ...updated });
}

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
              value={state.count}
              onChange={e => fieldChange(e)}
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
              value={state.recordDate}
              onChange={e => fieldChange(e)}
              placeholder="yyyy-mm-dd"
              name="recordDate"
              id="logdate"
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
            />
          </div>
        </div>
        <div class="form-group">
          <label for="comment">Comment:</label>
          <input type="text" name="comment" value={state.comment} 
                        onChange={e => fieldChange(e)}/>
        </div>

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
