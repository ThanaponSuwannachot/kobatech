import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BoltIcon from "@mui/icons-material/Bolt";
import InputIcon from "@mui/icons-material/Input";
import OutputIcon from "@mui/icons-material/Output";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ProgressCircle from "../../components/ProgressCircle";
import Axios from "axios";
import { useEffect, useState } from "react";
import GridShowBox from "../../components/gridShowBox";
import EffLineChart from "../../components/EffLineChart";
import TonRChart from "../../components/TonRChart";
import TempLineChart from "../../components/TempLineChart";
import FlowRateLineChart from "../../components/FlowRateLineChart";

import { sensorValueMoc } from "../../data/sensorValue";

function Welcome() {
  return "demo Dataeeeee";
}

const Daizo = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [sensorValue, setSensorValue] = useState(sensorValueMoc);

  const getApi = async () => {
    const response = await Axios.get(
      "https://api-chiller-iots.thssoft.com/api/v1/getAllLast?siteName=kobatech"
    );
    return response.data;
  };

  useEffect(() => {
    getApi().then((response) => {
      // console.log(sensorValueMoc);
      setSensorValue(response);
      console.log(response);
    });
  }, []);

  function findSensorValue(sensorName) {
    return sensorValue.filter(function (sensorValue) {
      return sensorValue.data_name == sensorName;
    });
  }

  var PlantEfficiency = findSensorValue("PlantEfficiency");
  var APT_AMCC1 = findSensorValue("APT_Cooling");
  var APT_AMCC2 = findSensorValue("APT_Chiller");

  var TonR = findSensorValue("TonR");
  var Temp_CHS = findSensorValue("Temp_CHS");
  var Temp_CHR = findSensorValue("Temp_CHR");

  var ACC_PowerPlant = findSensorValue("ACC_PowerPlant");
  var ACC_Plant_Efficiency = findSensorValue("ACC_Plant_Efficiency");
  var ACC_TonR = findSensorValue("ACC_TonR");
  var Temp_CDS = findSensorValue("Temp_CDS");

  var FlowRate_CHR = findSensorValue("FlowRate_CHR");

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title={"KOBATECH CHILLER SYSTEM"}
          subtitle="Welcome to your chiller dashboard"
        />
        <Box>
          <Box
            sx={{
              backgroundColor: colors.greenAccent[700],
              color: colors.grey[100],
              fontSize: "20px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            {/* da */}
            <ThumbUpAltIcon sx={{ mr: "10px" }} />
            {"Plant Efficiency : " +
              Number.parseFloat(PlantEfficiency[0].data_value).toFixed(2) +
              " kW/RT"}
          </Box>
        </Box>

        {/* <Box>
        
        </Box> */}
        <Box>{TonR[0].data_timestamp}</Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <GridShowBox
            title={"Power Plant"}
            mainValue={APT_AMCC1[0].data_value + APT_AMCC2[0].data_value}
            mainUnit={"kW"}
            sensorName1={"COOLING" + " :"}
            valueName1={APT_AMCC1[0].data_value}
            unitName1={"kW"}
            sensorName2={"CHILLER" + " :"}
            valueName2={APT_AMCC2[0].data_value}
            unitName2={"kW"}
          />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <GridShowBox
            title={"Factory Cooling Load"}
            mainValue={TonR[0].data_value.toFixed(2)}
            mainUnit={"RT"}
            sensorName1={Temp_CHS[0].data_name + " :"}
            valueName1={Temp_CHS[0].data_value}
            unitName1={"°C"}
            sensorName2={Temp_CHR[0].data_name + " :"}
            valueName2={Temp_CHR[0].data_value}
            unitName2={"°C"}
            sensorName3={FlowRate_CHR[0].data_name + " :"}
            valueName3={FlowRate_CHR[0].data_value}
            unitName3={"GPM"}
          />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <GridShowBox
            title={"Accumulate"}
            mainValue={ACC_Plant_Efficiency[0].data_value.toFixed(2)}
            mainUnit={"kW/RT"}
            sensorName1={"Accumulate RTh" + " :"}
            valueName1={ACC_TonR[0].data_value}
            unitName1={"RTh"}
            sensorName2={"Accumulate " + " :"}
            valueName2={ACC_PowerPlant[0].data_value}
            unitName2={"kWh"}
          />
        </Box>

        {/* ###########Coumn 1########### */}
        <Box
          gridColumn="span 6"
          gridRow="span 5"
          backgroundColor={colors.primary[400]}
        >
          {/* ###########Power Usage Analysis########### */}
          <Box
            sx={{
              boxShadow: 1,
              // borderRadius: 2,
              p: 2,
              //   minWidth: 300,
            }}
          >
            <Box sx={{ color: "text.secondary" }}>
              <br />
            </Box>
            <Typography variant="h3" fontWeight="600" color={colors.grey[100]}>
              Power Plant vs Factory Cooling Load
            </Typography>
          </Box>
          <Box sx={{ flexDirection: "column" }}>
            <Box>
              <Box
                sx={{ flexDirection: "column" }}
                mt="25px"
                p="0 30px"
                display="flex "
                justifyContent="column"
                alignItems="start"
              >
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    Power Plant(kW)
                  </Typography>
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    color={colors.greenAccent[500]}
                  >
                    {(
                      APT_AMCC1[0].data_value + APT_AMCC2[0].data_value
                    ).toFixed(2)}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    Factory Cooling Load(RT)
                  </Typography>
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    color={colors.greenAccent[500]}
                  >
                    {TonR[0].data_value.toFixed(2)}
                  </Typography>
                </Box>
                {/* <Box>
                  <IconButton>
                    <DownloadOutlinedIcon
                      sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                    />
                  </IconButton>
                </Box> */}
              </Box>
              <Box height="250px" m="-20px 0 0 0">
                <LineChart isDashboard={true} />
              </Box>
            </Box>

            <Box>
              <Box
                mt="25px"
                p="0 30px"
                display="flex "
                justifyContent="space-between"
                alignItems="center"
              >
                {/* ###########PlantEfficiency########### */}
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    Plant Efficiency (kW/RT)
                  </Typography>
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    color={colors.greenAccent[500]}
                  >
                    {PlantEfficiency[0].data_value}
                  </Typography>
                </Box>
                <Box>
                  <IconButton>
                    <DownloadOutlinedIcon
                      sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                    />
                  </IconButton>
                </Box>
              </Box>
              <Box height="250px" m="-20px 0 0 0">
                <TonRChart isDashboard={true} />
              </Box>
            </Box>
          </Box>
        </Box>

        {/* ###########Coumn 2########### */}
        <Box
          gridColumn="span 6"
          gridRow="span 5"
          backgroundColor={colors.primary[400]}
        >
          <Box
            sx={{
              boxShadow: 1,
              // borderRadius: 2,
              p: 2,
              //   minWidth: 300,
            }}
          >
            <Box sx={{ color: "text.secondary" }}>
              <br />
            </Box>
            <Typography variant="h3" fontWeight="600" color={colors.grey[100]}>
              Chilled water temperature and flowrate
            </Typography>
          </Box>
          <Box>
            <Box sx={{ flexDirection: "column" }}>
              <Box
                sx={{ flexDirection: "column" }}
                mt="25px"
                p="0 30px"
                display="flex "
                justifyContent="column"
                alignItems="start"
              >
                {/* ###########Temperature########### */}
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    Supply Temperature (°C)
                  </Typography>
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    color={colors.greenAccent[500]}
                  >
                    {Temp_CHS[0].data_value.toFixed(2)}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    Return Temperature (°C)
                  </Typography>
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    color={colors.greenAccent[500]}
                  >
                    {Temp_CHR[0].data_value.toFixed(2)}
                  </Typography>
                </Box>
              </Box>
              <Box height="250px" m="-20px 0 0 0">
                <TempLineChart isDashboard={true} />
              </Box>
            </Box>

            <Box>
              <Box
                mt="25px"
                p="0 30px"
                display="flex "
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    Flow Rate (GPM)
                  </Typography>
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    color={colors.greenAccent[500]}
                  >
                    {FlowRate_CHR[0].data_value}
                  </Typography>
                </Box>
                <Box>
                  <IconButton>
                    <DownloadOutlinedIcon
                      sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                    />
                  </IconButton>
                </Box>
              </Box>
              <Box height="250px" m="-20px 0 0 0">
                <FlowRateLineChart isDashboard={true} />
              </Box>
            </Box>
          </Box>
        </Box>

        
      </Box>
    </Box>
  );
};

export default Daizo;
