let margins = {
  top: 20,
  bottom: 70,
  left: 50,
  right: 350
};

let params1 = {
  graphId: "chartMonthTrend",
  margin: margins,
  YAXIS_TICKS: 6
};

console.log($(window).width());
params1.width =
  $(window).width() > 600
    ? $(window).width() > 1200
      ? 1000
      : $(window).width() - margins.left - margins.right
    : 300;
console.log($(window).height());

params1.height =
  $(window).height() > 700
    ? $(window).height() - margins.top - margins.bottom - 200
    : 400;


$.getJSON(`../api/report/`, renderMonthGraphData);

function renderMonthGraphData(data) {
  console.log(data);
  params1.graphId = "chartMonthTrend";
  params1.XAXIS_LABEL = "%b";

  let transformedDataSet = data.logs.map(x => {
    return { count: x.average, date: `2018-${x.month}-01` }
  });
  TrendGrapher.drawFromData(params1, transformedDataSet).then(() => {
    console.log("graph finished");
  });
  let logTable = '<table class="logEntries">';
  let logRows = data.logs.reverse().map(x => {
    return `<tr><td>${x.date}</td><td>${x.count}</td><td>${x.comment}</td>`;
  });
  let logRowsHtml = logRows.join("");
  let logTableEnd = "</table>";

  $("#logEntriesContainer").html(logTable + logRowsHtml + logTableEnd);
}

$.getJSON(`../api/reportYear/`, renderYearGraphData);

function renderYearGraphData(data) {
  console.log(data);
  params1.graphId = "chartYearTrend";
  params1.XAXIS_LABEL = "%Y";

  let transformedDataSet = data.logs.map(x => {
    return { count: x.average, date: `${x.year}-01-01` }
  });
  TrendGrapher.drawFromData(params1, transformedDataSet).then(() => {
    console.log("graph finished");
  });
  let logTable = '<table class="logEntries">';
  let logRows = data.logs.reverse().map(x => {
    return `<tr><td>${x.date}</td><td>${x.count}</td><td>${x.comment}</td>`;
  });
  let logRowsHtml = logRows.join("");
  let logTableEnd = "</table>";

  $("#logEntriesContainer").html(logTable + logRowsHtml + logTableEnd);
}