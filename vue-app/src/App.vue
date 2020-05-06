<template>
  <div id="app">
    <section class="quickBtnRow">
  <a class="btn btn-primary btn-sm" id="baseWeightBtn">144 weight</a>
  <div>
  <a class="btn btn-outline-danger btn-sm" id="weightDecrementSmallBtn">-.2</a>
  <a class="btn btn-outline-success btn-sm"  id="weightDecrementLargeBtn">-1</a>
  <a class="btn btn-outline-success btn-sm"  id="weightIncrementLargeBtn">+1</a>
  <a class="btn btn-outline-danger btn-sm"  id="weightIncrementSmallBtn">+.2</a>
  </div>
</section>

<section>
  <form method="post" action=""  class="form-inline">
    <input type="hidden" name="points" value="" id="pointsEntry">

      <div class="form-row">
      <div class="col">
        <select class="form-control form-control-sm" name="goal" id="goalEntry">
          <option>weight</option>
                    <option>pushups </option>
                    <option>pullups </option>
                    <option>sleepInKids </option>
                    <option>situps </option>
                    <option>fitness </option>
                    <option>weight </option>
                    <option>weeklyReview </option>
                </select>
      </div>
    
      <div class="input-group input-group-sm mb-3 col">
        <div class="input-group-prepend">
          <span class="input-group-text" id="inputGroup-sizing-sm">Count</span>
        </div>
        <input type="text" name="count" value="" id="countEntry" placeholder="Count" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
      </div>
    </div>
    <div class="form-row">
        <div class="input-group input-group-sm mb-3 col">
        <div class="input-group-prepend">
          <span class="input-group-text" id="inputGroup-sizing-sm">Date</span>
        </div>
        <input type="text" class="form-control" placeholder="yyyy-mm-dd" name="date" id="logdate" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
      </div>
    </div>
    <div class="form-group"  style="width: 100%">
      <label for="comment">Comment:</label>
    <input type="text" name="comment" value="" style="width: 100%">
    </div>
    <input type="submit" name="go" value="Create"  class="btn btn-warning">
  </form>
</section>

<h2>Entries</h2>
<button id="prevBtn" class="btn btn-dark" >Prev</button>
<div id="logDate" class="dateBtnRow"></div>
<button id="nextBtn" class="btn btn-dark">Next</button>
<table class="table table-striped" style="width:90%">
   <tr>
        <th>Goal</th>
        <th>Date</th>
        <th>Points</th>
        <th>Count</th>
        <th>Note</th>
    </tr>
    <tbody id="logTableBody"></tbody>
</table>


    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
