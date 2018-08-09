let margins = {
  top: 20,
  bottom: 70,
  left: 50,
  right: 350
};

function average(group) {
  if(!group){return null;}
  let sum = group.reduce((a, b) => a + b, 0);
  return (sum / group.length).toFixed(3);
}

function showEntries() {
  let current = $("#logEntriesContainer").css("display");
  console.log(current);
  let nextDisplay = current == "none" ? "block" : "none";

  $("#logEntriesContainer").css("display", nextDisplay);
}

function changeDate() {
  let start = $("#startdate").val();
  let end = $("#enddate").val();
  let goal = $("#goal").val();
  $.getJSON(
    `../api/logs/?goal=${goal}&start=${start}&end=${end}`,
    renderGraphData
  );
}

$.getJSON(`../api/logs/?goal=weight`, renderGraphData);

function renderGraphData(data) {
  let params = {
    graphId: "chartMetricTrend",
    margin: margins,
    YAXIS_TICKS: 6
  };

  console.log($(window).width());
  params.width =
    $(window).width() > 600
      ? $(window).width() > 1200
        ? 1000
        : $(window).width() - margins.left - margins.right
      : 300;
  console.log($(window).height());

  params.height =
    $(window).height() > 700
      ? $(window).height() - margins.top - margins.bottom - 200
      : 400;
  $("#startdate").val(data.params.start);
  $("#enddate").val(data.params.end);
  $("#goal").val(data.params.goal);

  let today = moment();
  let oneWeekAgo = moment().subtract(7, "days");
  let twoWeekAgo = moment().subtract(14, "days");
  let oneMonthAgo = moment().subtract(1, "month");
  var currentWeek = data.logs.filter(item => {
    let curr = moment(item.date);
    return curr >= oneWeekAgo && curr <= today;
  });

  var pastWeek = data.logs.filter(item => {
    let curr = moment(item.date);
    return curr >= twoWeekAgo && curr <= oneWeekAgo;
  });

  var restOfMonth = data.logs.filter(item => {
    let curr = moment(item.date);
    return curr >= oneMonthAgo && curr <= twoWeekAgo;
  });
  let overallAvg = average(data.logs.map(x => parseFloat(x.count)));
  let currentWeekAvg = average(currentWeek.map(x => parseFloat(x.count)));
  let pastcurrentWeekAvg = average(pastWeek.map(x => parseFloat(x.count)));
  let restOfMonthAvg = average(restOfMonth.map(x => parseFloat(x.count)));

  let highest = data.logs.reduce((agg, x) => {
    return agg === null || x.count > agg.count ? x : agg;
  }, null);

  let lowest = data.logs.reduce((agg, x) => {
    return agg === null || x.count < agg.count ? x : agg;
  }, null);

  let dayOfWeekValues = data.logs.reduce((agg, x) => {
    let day = moment(x.date).format("ddd");
    if (agg[day] == null) {
      agg[day] = [];
    }
    agg[day].push(parseFloat(x.count));
    return agg;
  }, []);

  let dayOfWeekAverages = dayOfWeekValues.map(x => {
    console.log(x);
    return average(x);
  });

  $("#milestones").html(`
    current: ${currentWeekAvg}, past week: ${pastcurrentWeekAvg},
    rest of month: ${restOfMonthAvg}<br>
    Overall: ${overallAvg}, Highest: ${highest.count} on ${highest.date},
    Lowest: ${lowest.count} on ${lowest.date}`);
  $("#dayOfWeek").html(`
    Sun: ${average(dayOfWeekValues["Sun"])}<br>
    Mon: ${average(dayOfWeekValues["Mon"])}<br>
    Tue: ${average(dayOfWeekValues["Tue"])}<br>
    Wed: ${average(dayOfWeekValues["Wed"])}<br>
    Thu: ${average(dayOfWeekValues["Thu"])}<br>
    Fri: ${average(dayOfWeekValues["Fri"])}<br>
    Sat: ${average(dayOfWeekValues["Sat"])}<br>
    `);

  //moving average
  let movingAverageSize = 10;
  let trendArray = [];
  for (let i = movingAverageSize; i <= data.logs.length; i++) {
    let currentSet = data.logs.slice(i - movingAverageSize, i);
    let currentSetAverage = average(currentSet.map(x => parseFloat(x.count)));
    trendArray.push({
      count: currentSetAverage,
      date: currentSet[currentSet.length - 1].date,
      goal: "trend"
    });
  }

  let finalArray = data.logs.concat(trendArray);
  console.log(finalArray);

  params.highlight = [
    {"label": "highest", "date": highest.date},
    {"label": "lowest", "date": lowest.date}
  ];
  params.XAXIS_LABEL = "%b-%d";
  TrendGrapher.drawFromData(params, finalArray).then(() => {
    console.log("daily graph finished");
  });

  let params2 = {
    graphId: "chartWeekTrend",
    margin: {
      top: 20,
      bottom: 30,
      left: 300,
      right: 10
    },
    YAXIS_TICKS: 6,
    XAXIS_LABEL: "%a",
    YAXIS_UPPER_PAD: 0.05,
    YAXIS_LOWER_PAD: .2
  };

  params2.width =
    $(window).width() > 600
      ? $(window).width() > 1200
        ? 1000
        : $(window).width() - margins.left - margins.right
      : 300;

  params2.height = 200;
  console.log(dayOfWeekValues);
let transformedDayOfWeekAverages = [];

  transformedDayOfWeekAverages.push({
    "date": "2018-07-01",
    "count": average(dayOfWeekValues["Sun"])
  });
  transformedDayOfWeekAverages.push({
    "date": "2018-07-02",
    "count": average(dayOfWeekValues["Mon"])
  });
  transformedDayOfWeekAverages.push({
    "date": "2018-07-03",
    "count": average(dayOfWeekValues["Tue"])
  });
  transformedDayOfWeekAverages.push({
    "date": "2018-07-04",
    "count": average(dayOfWeekValues["Wed"])
  });
  transformedDayOfWeekAverages.push({
    "date": "2018-07-05",
    "count": average(dayOfWeekValues["Thu"])
  });
  transformedDayOfWeekAverages.push({
    "date": "2018-07-06",
    "count": average(dayOfWeekValues["Fri"])
  });
  transformedDayOfWeekAverages.push({
    "date": "2018-07-07",
    "count": average(dayOfWeekValues["Sat"])
  });

  console.log(transformedDayOfWeekAverages);
  TrendGrapher.drawFromData(params2, transformedDayOfWeekAverages).then(() => {
    console.log("week graph finished");
  });

  let logTable = '<table class="logEntries">';
  let logRows = data.logs.reverse().map(x => {
    return `<tr><td>${x.date}</td><td>${x.count}</td><td>${x.comment}</td>`;
  });
  let logRowsHtml = logRows.join("");
  let logTableEnd = "</table>";

  $("#logEntriesContainer").html(logTable + logRowsHtml + logTableEnd);
}
