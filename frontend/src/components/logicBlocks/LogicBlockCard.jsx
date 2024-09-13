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
            userIds={logicBlock.condition_users}
            roleIds={logicBlock.condition_roles}
          />
        </Grid>

        <Grid size={{ xs: 25, lg: 1 }}>
          <LogicSeparator separator="i" />
        </Grid>

        <Grid size={{ xs: 25, lg: 16, xl: 15 }}>
          <ProductsConditions
            productIds={logicBlock.condition_products}
            groupIds={logicBlock.condition_groups}
            termIds={logicBlock.condition_terms}
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
    condition_users: PropTypes.string,
    condition_roles: PropTypes.string,
    condition_products: PropTypes.string,
    condition_groups: PropTypes.string,
    condition_terms: PropTypes.string,
  }).isRequired,
};

export default LogicBlockCard;
