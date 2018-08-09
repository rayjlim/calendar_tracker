function populateLog(goal, points, count) {
  $("#goalEntry").val(goal);
  $("#pointsEntry").val(points);
  $("#countEntry").val(count);
}

function incrementWeight(diff) {
  let val = $("#countEntry").val();
  $("#countEntry").val((parseFloat(val) + diff).toFixed(1));
}

function renderLogData(data) {
  let logRows = data.logs.map(log => {
    return `
    <tr>
        <td>${log.goal}</td>
        <td>${log.date}</td>
        <td>${log.points}</td>
        <td>${log.count}</td>
        <td>${log.comment}
        <a href="#" onclick="populateEdit(${log.id}, '${log.goal}', '${log.date}', '${log.points}', '${log.count}', '${log.comment}');">edit</a>
        </td>
    </tr>
    `;
  });
  let logRowsHtml = logRows.join("");
  $("#logTableBody").html(logRowsHtml);
  $("#logDate").html(data.params.start);
}

function changeLogDate(direction) {
  let currDate = $("#logDate").html();

  let start = moment(currDate)
    .add(direction, "days")
    .format("YYYY-MM-DD");
  $.getJSON(`../api/logs/?goal=%&start=${start}&end=${start}`, renderLogData);
}

function populateEdit(id, goal, date, points, count, comment){
  console.log(id, goal, date, points, count, comment);
  $("#editId").val(id);
  $("#editGoal").val(goal);
  $("#editDate").val(date);
  $("#editPoints").val(points);
  $("#editCount").val(count);
  $("#editComment").val(comment);
}

let start = moment().format("YYYY-MM-DD");
$.getJSON(`../api/logs/?goal=%&start=${start}&end=${start}`, renderLogData);
