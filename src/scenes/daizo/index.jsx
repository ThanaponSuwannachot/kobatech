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
      "http://203.150.199.47:3002/api/v1/getAllLast?siteName=daizo"
    );
    return response.data;
  };

  useEffect(() => {
    getApi().then((response) => {
      setSensorValue(response);
    });
  }, []);

  function findSensorValue(sensorName) {
    return sensorValue.filter(function (sensorValue) {
      return sensorValue.data_name == sensorName;
    });
  }

  var PlantEfficiency = findSensorValue("PlantEfficiency");
  var APT_AMCC1 = findSensorValue("APT_AMCC1");
  var APT_AMCC2 = findSensorValue("APT_AMCC2");
  var APT_DB1 = findSensorValue("APT_DB1");
  var APT_DB2 = findSensorValue("Power_CDP2");

  var TonR = findSensorValue("TonR");
  var Temp_CHS = findSensorValue("Temp_CHS");
  var Temp_CHR = findSensorValue("Temp_CHR");

  var ACC_PowerPlant = findSensorValue("ACC_PowerPlant");
  var ACC_Plant_Efficiency = findSensorValue("ACC_Plant_Efficiency");
  var ACC_TonR = findSensorValue("ACC_TonR");
  var Temp_CDS = findSensorValue("Temp_CDS");

  var FlowRate_CHR = findSensorValue("FlowRate_CHR");
  var FlowRate_CDR = findSensorValue("FlowRate_CDR");

  // console.log(APT_DB2[0].data_value)

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title={"DAIZO CHILLER SYSTEM"}
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
            <ThumbUpAltIcon sx={{ mr: "10px" }} />
            {"Plant Efficiency : " +
              Number.parseFloat(PlantEfficiency[0].data_value).toFixed(2) +
              " kW/RT"}
          </Box>
        </Box>

        {/* <Box>
        
        </Box> */}
        <Box>{PlantEfficiency[0].data_timestamp}</Box>
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
            mainValue={
              APT_AMCC1[0].data_value +
              APT_AMCC2[0].data_value +
              APT_DB1[0].data_value +
              APT_DB2[0].data_value
            }
            mainUnit={APT_AMCC1[0].data_type}
            sensorName1={"AMCC1" + " :"}
            valueName1={APT_AMCC1[0].data_value}
            unitName1={APT_AMCC1[0].data_type}
            sensorName2={"AMCC2" + " :"}
            valueName2={APT_AMCC2[0].data_value}
            unitName2={APT_AMCC2[0].data_type}
            sensorName3={"CH1" + " :"}
            valueName3={APT_DB1[0].data_value}
            unitName3={APT_DB1[0].data_type}
            sensorName4={"CH2" + " :"}
            valueName4={APT_DB2[0].data_value}
            unitName4={APT_DB2[0].data_type}
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
            title={"Building Load"}
            mainValue={TonR[0].data_value.toFixed(2)}
            mainUnit={TonR[0].data_type}
            sensorName1={Temp_CHS[0].data_name + " :"}
            valueName1={Temp_CHS[0].data_value}
            unitName1={Temp_CHS[0].data_type}
            sensorName2={Temp_CHR[0].data_name + " :"}
            valueName2={Temp_CHR[0].data_value}
            unitName2={Temp_CHR[0].data_type}
            sensorName3={FlowRate_CHR[0].data_name + " :"}
            valueName3={FlowRate_CHR[0].data_value}
            unitName3={FlowRate_CHR[0].data_type}
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
            mainUnit={"kWh/RT"}
            sensorName1={"Accumulate RTh" + " :"}
            valueName1={ACC_TonR[0].data_value}
            unitName1={ACC_TonR[0].data_type}
            sensorName2={"Accumulate " + " :"}
            valueName2={ACC_PowerPlant[0].data_value}
            unitName2={ACC_PowerPlant[0].data_type}
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
              Power Plant vs Building Load
            </Typography>
          </Box>
          <Box sx={{ flexDirection: "column" }}>
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
                    Power Usage(kW)
                  </Typography>
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    color={colors.greenAccent[500]}
                  >
                    {(
                      APT_AMCC1[0].data_value +
                      APT_AMCC2[0].data_value +
                      APT_DB1[0].data_value +
                      APT_DB2[0].data_value
                    ).toFixed(2)}
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
                    Plant Efficiency
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
              Temp.S vs Temp.R
            </Typography>
          </Box>
          <Box sx={{ flexDirection: "column" }}>
            <Box>
              <Box
                mt="25px"
                p="0 30px"
                display="flex "
                justifyContent="space-between"
                alignItems="center"
              >
                {/* ###########Temperature########### */}
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    Temperature( °C)
                  </Typography>
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    color={colors.greenAccent[500]}
                  >
                    {Temp_CHS[0].data_value}
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
                    Flow Rate CHR
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

        <Box
          gridColumn="span 12"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              SENSOR UPDATE
            </Typography>
          </Box>
          {sensorValue.map((value, i) => (
            <Box
              key={`${value.data_name}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {value.data_value}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {value.data_name}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{value.data_type}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ???
                {/* ${value.data_type} */}
              </Box>
            </Box>
          ))}
        </Box>

        {/* Botttom Analysis */}
        {/* card1 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            {"ACC_RTh"}
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle
              size="125"
              progress={ACC_TonR[0].data_value * 0.0001}
            />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              {ACC_TonR[0].data_value}
            </Typography>
            <Typography>{ACC_TonR[0].data_type}</Typography>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            {"ACC_kWh"}
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle
              size="125"
              progress={ACC_PowerPlant[0].data_value * 0.0001}
            />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              {ACC_PowerPlant[0].data_value}
            </Typography>
            <Typography>{ACC_PowerPlant[0].data_type}</Typography>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            {"ACC_Plant Efficiency"}
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle
              size="125"
              progress={ACC_Plant_Efficiency[0].data_value * 10}
            />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              {ACC_Plant_Efficiency[0].data_value}
            </Typography>
            <Typography>{ACC_Plant_Efficiency[0].data_type}</Typography>
          </Box>
        </Box>
        {/* ########### */}
        {/* <Box
          gridColumn="span 5"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
          HZ_CDP2
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              ??? Hz status ???
            </Typography>
            <Typography>???%100</Typography>
          </Box>
        </Box> */}
      </Box>
    </Box>
  );
};

export default Daizo;
