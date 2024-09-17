import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import PropTypes from "prop-types";
import CardHeader from "../general/CardHeader";
import UsersConditions from "./UsersConditions";
import ProductsConditions from "./ProductsConditions";
import LogicSeparator from "./LogicSeparator";

const LogicBlockCard = ({ logicBlock }) => {
  return (
    <Box
      sx={{
        mb: 3,
        p: 3,
        background: "linear-gradient(135deg, #a9d6e5, #78c2cf)",
        borderRadius: 7,
      }}
    >
      <CardHeader entityKey="logic_blocks" entity={logicBlock} />

      <Grid container spacing={2} columns={25} alignItems="center">
        <Grid size={{ xs: 25, lg: 8, xl: 9 }}>
          <UsersConditions
            logicBlock={logicBlock}
          />
        </Grid>

        <Grid size={{ xs: 25, lg: 1 }}>
          <LogicSeparator separator="i" />
        </Grid>

        <Grid size={{ xs: 25, lg: 16, xl: 15 }}>
          <ProductsConditions
            logicBlock={logicBlock}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

LogicBlockCard.propTypes = {
  logicBlock: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    users: PropTypes.string,
    roles: PropTypes.string,
    products: PropTypes.string,
    groups: PropTypes.string,
    terms: PropTypes.string,
  }).isRequired,
};

export default LogicBlockCard;
