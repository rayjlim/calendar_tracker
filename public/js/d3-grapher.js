/* global d3 */
/* eslint-disable no-unused-vars */

var TrendGrapher = (() => {
  return {
    drawFromData: (params, data) => {
      return new Promise(resolve => {
        console.log("TrendGrapher:draw");

        let bisectDate = d3.bisector(function (d) {
          return d.date;
        }).left;

        console.log(params);
        console.log(data);
        const graphId = params.graphId || "chart";
        const height = params.height || 300;
        const width = params.width || 600;
        const margin = {
          top: params.margin.top || 20,
          bottom: params.margin.bottom || 80,
          left: params.margin.left || 40,
          right: params.margin.right || 100
        };
        const XAXIS_LABEL = params.XAXIS_LABEL || "%b-%d %H:%M";
        const XAXIS_TICKS = params.XAXIS_TICKS || null;
        const highlight = params.highlight || [];
        console.log('params.YAXIS_UPPER_PAD:' + params.YAXIS_UPPER_PAD);
        const YAXIS_UPPER_PAD = params.YAXIS_UPPER_PAD || 1;
        console.log('YAXIS_UPPER_PAD:' + YAXIS_UPPER_PAD);
        const YAXIS_LOWER_PAD = params.YAXIS_LOWER_PAD || 1;

        // const SHOW_LEGEND = params.SHOW_LEGEND !== undefined ? params.SHOW_LEGEND : true;
        var parseTime = d3.timeParse("%Y-%m-%d");


        d3.select("#" + graphId).selectAll("svg").remove();
        var svg = d3
          .select("#" + graphId)
          .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", `translate(${margin.left},${margin.top})`);

        var valueline = d3.line().x(d => x(d.date)).y(d => y(d.value));

        var timelineData = data.map(d => {
          return {
            date: parseTime(d.date),
            value: d.count,
            label: d.goal
          };
        });

        console.log("YAXIS_UPPER_PAD" + YAXIS_UPPER_PAD);

        let yUpper = Math.ceil(
          parseFloat(d3.max(timelineData, d => d.value)) + YAXIS_UPPER_PAD
        );

        //  console.log(yUpper);
        let yLower = Math.floor(d3.min(timelineData, d => d.value)) - YAXIS_LOWER_PAD;
        // yUpper = yLower > yUpper ? yLower + 10 : yUpper;
        console.log(yLower);
        var x = d3.scaleTime().range([0, width]).domain(d3.extent(timelineData, d => d.date));
        var y = d3.scaleLinear().range([height, 0]).domain([yLower, yUpper]);

        highlight.map(d => {
          svg.append("line")
            .attr("x1", x(parseTime(d.date)))
            .attr("y1", y(yLower))
            .attr("x2", x(parseTime(d.date)))
            .attr("y2", y(yUpper))
            .style("stroke", "red")
            .attr("class", "line")
            .attr("stroke-width", "1px");

        });

        console.log("draw line");
        let dataNest = d3.nest().key(d => d.label).entries(timelineData);

        // Loop through each symbol / key
        let color = d3.scaleOrdinal(d3.schemeCategory10);
        dataNest.forEach(d => {
          // console.log(d);
          svg
            .append("path")
            .data([d.values])
            .style("stroke", () => color(d.key))
            .attr("class", "line")
            .attr("stroke-width", "2px")
            .attr("d", valueline);
        });

        let xAxisFormat;
        if (XAXIS_TICKS) {
          xAxisFormat = d3
            .axisBottom(x)
            .ticks(XAXIS_TICKS)
            .tickFormat(d3.timeFormat(XAXIS_LABEL));
        } else {
          xAxisFormat = d3.axisBottom(x).tickFormat(d3.timeFormat(XAXIS_LABEL));
        }

        console.log("draw axis");
        svg
          .append("g")
          .attr("class", "axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxisFormat)
          .selectAll("text")
          .style("text-anchor", "end")
          .attr("dx", "-.8em")
          .attr("dy", ".15em")
          .attr("transform", "rotate(-65)");

        svg.append("g").attr("class", "axis").call(d3.axisLeft(y));

        console.log("draw legend");
        // Add the Legend
        let legendRectSize = 9;
        let legendSpacing = 6;
        let legendTopPadding = -1 * margin.bottom - 50;
        let legendLeftPadding = 10;
        let legend = svg
          .selectAll(".legend")
          .data(color.domain())
          .enter()
          .append("g")
          .attr("class", "legend")
          .attr("transform", (d, i) => {
            let height = legendRectSize + legendSpacing;
            let offset = height * color.domain().length / 2 + legendTopPadding;
            let horz = width + legendLeftPadding; //-2 * legendRectSize + legendLeftPadding
            let vert = i * height - offset;
            return `translate(${horz},${vert})`;
          });

        legend
          .append("rect")
          .attr("width", legendRectSize)
          .attr("height", legendRectSize)
          .style("fill", color)
          .style("stroke", color);

        legend
          .append("text")
          .attr("x", legendRectSize + legendSpacing)
          .attr("y", legendRectSize + legendSpacing - 5)
          .text(d => d);

        // add the X gridlines
        svg
          .append("g")
          .attr("class", "grid")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x).ticks(5).tickSize(-height).tickFormat(""));

        // add the Y gridlines
        svg
          .append("g")
          .attr("class", "grid")
          .call(d3.axisLeft(y).ticks(10).tickSize(-width).tickFormat(""));

        var focus = svg
          .append("g")
          .attr("class", "focus")
          .style("display", "none");

        focus.append("text");

        svg
          .append("rect")
          // .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
          .attr("class", "overlay")
          .attr("width", width)
          .attr("height", height)
          .style("color", "white")
          .on("mouseover", function () {
            focus.style("display", null);
          })
          .on("mouseout", function () {
            focus.style("display", "none");
          })
          .on("mousemove", mousemove);

        function mousemove() {
          var x0 = x.invert(d3.mouse(this)[0]);
          var y0 = y.invert(d3.mouse(this)[1]);
          // i = bisectDate(data, x0, 1),
          // d0 = data[i - 1],
          // d1 = data[i],
          // d = x0 - d0.date > d1.date - x0 ? d1 : d0;

          //console.log(x0+":"+y0);

          // focus
          //   .select("circle.y")
          //   .attr(
          //     "transform",
          //     // "translate(" + x(d.date) + "," + y(d.close) + ")"
          //    "translate(100,200)"
          //   );
          let dateVal = moment(x0).format("YYYY-MM-DD");
          let yVal = data.filter(x => x.date == dateVal && x.goal != 'trend')[0] || { "count": "", "comment": "" };
          let hoverText = yVal.count !== "" ?
            moment(x0).format("YYYY-MM-DD") + "," + yVal.count + ', ' + yVal.comment :
            "";
          focus.select("text")
            .attr("x", d3.mouse(this)[0])
            .attr("y", d3.mouse(this)[1])
            .text(function () { return hoverText; });
        }
        resolve();
      });
    }
  };
})();
