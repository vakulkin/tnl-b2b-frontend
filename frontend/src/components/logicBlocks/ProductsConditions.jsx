import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import PropTypes from "prop-types";
import Condition from "./Condition";
import LogicSeparator from "./LogicSeparator";

const ProductsConditions = ({ logicBlock }) => {
  return (
    <Box
      sx={{
        p: 3,
        background: "linear-gradient(135deg, #61a5c2, #5198b8)",
        borderRadius: 6,
      }}
    >
      <Grid container spacing={2} columns={13} alignItems="center">
        <Grid size={{ xs: 13, xl: 4 }}>
          <Condition
            title="Produkt to:"
            entityKey="products"
            logicBlock={logicBlock}
          />
        </Grid>
        <Grid size={{ xs: 13, xl: 1 }}>
          <LogicSeparator separator="lub" />
        </Grid>
        <Grid size={{ xs: 13, xl: 8 }}>
          <Box
            sx={{
              p: 2,
              background: "linear-gradient(135deg, #2c7da0, #236985)",
              borderRadius: 5,
            }}
          >
            <Grid container spacing={2} columns={13} alignItems="center">
              <Grid size={{ xs: 13, md: 6 }}>
                <Condition
                  title="Produkt ma grupy:"
                  entityKey="groups"
                  logicBlock={logicBlock}
                />
              </Grid>
              <Grid size={{ xs: 13, md: 1 }}>
                <LogicSeparator separator="i" />
              </Grid>
              <Grid size={{ xs: 13, md: 6 }}>
                <Condition
                  title="Produkt ma termy:"
                  entityKey="terms"
                  logicBlock={logicBlock}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

ProductsConditions.propTypes = {
  logicBlock: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
};

export default ProductsConditions;
