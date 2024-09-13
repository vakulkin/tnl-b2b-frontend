import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import PropTypes from "prop-types";
import Condition from "./Condition";
import LogicSeparator from "./LogicSeparator";

const UsersConditions = ({ userNames, roleNames }) => {
  return (
    <Box
      sx={{
        p: 3,
        background: "linear-gradient(135deg, #61a5c2, #5198b8)",
        borderRadius: 6,
      }}
    >
      <Grid container spacing={2} columns={13} alignItems="center">
        <Grid size={{xs: 13, md: 6}}>
          <Condition title="Jeden z użytkowników to:" items={userNames} />
        </Grid>
        <Grid size={{xs: 13, md: 1}} sx={{ textAlign: "center" }}>
          <LogicSeparator separator="lub" />
        </Grid>
        <Grid size={{xs: 13, md: 6}}>
          <Condition title="Użytkownik ma takie role:" items={roleNames} />
        </Grid>
      </Grid>
    </Box>
  );
};

UsersConditions.propTypes = {
  userNames: PropTypes.string,
  roleNames: PropTypes.string,
};

export default UsersConditions;
