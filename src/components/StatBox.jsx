import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";

const StatBox = ({ title, subtitle, icon, progress, increase }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="5 30px">
      <Box display="flex" justifyContent="center">
        <Box>
          {icon}
          <Typography 
            variant="h6"
            fontWeight="bold"
            sx={{ color: colors.greenAccent[600] }}
          >
            {subtitle}: ({increase})
          </Typography>
          <Typography variant="h4" justifyContent="center" sx={{ color: colors.greenAccent[100]  }}>
          {title}
        </Typography>


          
        </Box>
        <Box>{/* <ProgressCircle progress={progress} /> */}</Box>
      </Box>

    </Box>
  );
};

export default StatBox;
