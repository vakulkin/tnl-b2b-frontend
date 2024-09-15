import PropTypes from "prop-types";
import { Box } from "@mui/material";
import RuleLogicBlocks from "./RuleLogicBlocks";
import CardHeader from "../general/CardHeader";
import RuleDetails from "./RuleDetails";

const RuleCard = ({ rule }) => {
  return (
    <Box
      sx={{
        mb: 8,
        p: 4,
        background: "linear-gradient(135deg, #f7fdff, #d9f3f8)",
        borderRadius: 8,
      }}
    >
      <CardHeader
        entityKey="rules"
        entity={rule}
        child
      >
        <RuleDetails rule={rule} />
      </CardHeader>
      <RuleLogicBlocks rule={rule} />
    </Box>
  );
};

export default RuleCard;

RuleCard.propTypes = {
  rule: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    logic_blocks: PropTypes.string,
  }).isRequired,
};
