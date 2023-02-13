import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  ThemeProvider,
} from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";

const GridShowBox = ({
  title,
  mainValue,
  mainUnit,
  sensorName1,
  valueName1,
  unitName1,
  sensorName2,
  valueName2,
  unitName2,
  sensorName3,
  valueName3,
  unitName3,
  sensorName4,
  valueName4,
  unitName4,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="3 20px">
      <Box
        sx={{
          boxShadow: 1,
          borderRadius: 1,
          p: 2,
          //   minWidth: 300,
        }}
      >
        <Box sx={{ color: "text.secondary", fontSize: 25 }}>{title}</Box>
        <Box sx={{ color: "text.primary", fontSize: 34, fontWeight: "medium" }}>
          {Number.parseFloat(mainValue).toFixed(2)} {mainUnit}
        </Box>
        <Box
          sx={{
            color: "text.secondary",
            display: "inline",
            mx: 0.5,
            fontSize: 14,
          }}
        >
          {sensorName1}
        </Box>
        <Box
          sx={{
            color: colors.greenAccent[600],
            display: "inline",
            fontSize: 14,
            fontWeight: "bold",
          }}
        >
          {valueName1} {unitName1}
        </Box>
        <Box sx={{ color: "text.secondary" }}></Box>
        <Box
          sx={{
            color: "text.secondary",
            display: "inline",
            mx: 0.5,
            fontSize: 14,
          }}
        >
          {sensorName2}
        </Box>
        <Box
          sx={{
            color: colors.greenAccent[600],
            display: "inline",
            fontSize: 14,
            fontWeight: "bold",
          }}
        >
          {valueName2} {unitName2}
        </Box>
        <Box sx={{ color: "text.secondary" }}></Box>
        <Box
          sx={{
            color: "text.secondary",
            display: "inline",
            mx: 0.5,
            fontSize: 14,
          }}
        >
          {sensorName3}
        </Box>
        <Box
          sx={{
            color: colors.greenAccent[600],
            display: "inline",
            fontSize: 14,
            fontWeight: "bold",
          }}
        >
          {valueName3} {unitName3}
        </Box>
        <Box sx={{ color: "text.secondary" }}></Box>
        <Box
          sx={{
            color: "text.secondary",
            display: "inline",
            mx: 0.5,
            fontSize: 14,
          }}
        >
          {sensorName4}
        </Box>
        <Box
          sx={{
            color: colors.greenAccent[600],
            display: "inline",
            fontSize: 14,
            fontWeight: "bold",
          }}
        >
          {valueName4} {unitName4}
        </Box>
      </Box>
    </Box>
  );
};

export default GridShowBox;
