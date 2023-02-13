import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { mockLineData as data } from "../data/mockData";
import { sensorValueHis } from "../data/sensorValueHis";
import Axios from "axios";
import { useEffect, useState } from "react";

const TonRChart = ({ isCustomLineColors = false, isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let currentDate = `${year}-${month}-${day}`;
  const [sensorValue, setSensorValue] = useState(sensorValueHis);

  const getApi = async (api) => {
    const response = await Axios.get(api);

    return response.data;
  };
  //   console.log(typeof (currentDate));
  useEffect(() => {
    let listSensorValue = ["PlantEfficiency"];
    let returnValue = [];
    let limitData = "15";
    for (let i = 0; i < listSensorValue.length; i++) {
      let apiURL =
        "https://api-chiller-iots.thssoft.com/api/v1/getChartData?siteName=kobatech&devicename=" +
        listSensorValue[i] +
        "&startdate=" +
        currentDate +
        "&enddate=" +
        currentDate +
        "&limit=" +
        limitData;

      getApi(apiURL).then((response) => {
        returnValue.push(response);
      });
    }
    setSensorValue(returnValue);
    // console.log("TonR");
    // console.log(sensorValue);
  }, []);

  return (
    <ResponsiveLine
      data={sensorValue}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
        tooltip: {
          container: {
            color: colors.primary[500],
          },
        },
      }}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      xFormat=" >-"
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -90,
        legend: "",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointColor={{ theme: "background" }}
      pointBorderWidth={1}
      pointBorderColor={{ from: "serieColor" }}
      pointLabel="y"
      pointLabelYOffset={-12}
      enableSlices="y"
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 1,
          translateY: -155,
          itemsSpacing: 1,
          itemDirection: "left-to-right",
          itemWidth: 109,
          itemHeight: 21,
          itemOpacity: 0.75,
          symbolSize: 16,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default TonRChart;
