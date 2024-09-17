import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import PropTypes from "prop-types";
import Condition from "./Condition";
import LogicSeparator from "./LogicSeparator";

const UsersConditions = ({ logicBlock }) => {
  return (
    <Box
      sx={{
        p: 3,
        background: "linear-gradient(135deg, #61a5c2, #5198b8)",
        borderRadius: 6,
      }}
    >
      <Grid container spacing={2} columns={14} alignItems="center">
        <Grid size={{ xs: 14, xl: 6 }}>
          <Condition
            title="Użytkownik to:"
            entityKey="users"

            logicBlock={logicBlock}
          />
        </Grid>
        <Grid size={{ xs: 14, xl: 2 }}>
          <LogicSeparator separator="lub" />
        </Grid>
        <Grid size={{ xs: 14, xl: 6 }}>
          <Condition
            title="Użytkownik ma role:"
            entityKey="roles"
            logicBlock={logicBlock}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

UsersConditions.propTypes = {
  userIds: PropTypes.string,
  roleIds: PropTypes.string,
  logicBlock: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })
};

export default UsersConditions;
