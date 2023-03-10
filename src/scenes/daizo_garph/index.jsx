import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import Axios from "axios";
import { useEffect, useState } from "react";

import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { sensorValueMoc } from "../../data/sensorValue";
import EffLineChart from "../../components/EffLineChart";

const DaizoGarph = () => {
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
      setSensorValue(response);
    });
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "data_name", headerName: "Sensor Name" },
    {
      field: "data_value",
      headerName: "Value",
      flex: 1,
      cellClassName: "name-column--cell",
      headerAlign: "right",
    },
    {
      field: "data_type",
      headerName: "Unit",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "data_timestamp",
      headerName: "Timestamp",
      flex: 1,
    },
  ];
  return (
    <Box m="20px">
      <Header
        title="Power Analysis"
        subtitle="Graph compare power consumption"
      />
      <Box height="25vh">
        <LineChart />
      </Box>
      <Box height="25vh">
        <EffLineChart />
      </Box>

      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
            borderBottom: "right",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={sensorValue}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};
export default DaizoGarph;
