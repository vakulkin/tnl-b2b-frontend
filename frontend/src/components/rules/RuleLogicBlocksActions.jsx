import PropTypes from "prop-types";
import { Box } from "@mui/material";
import ActionButton from "../general/ActionButton";
import AddLinkIcon from "@mui/icons-material/AddLink";

import { getEntityStore } from "../../store";

const RuleLogicBlocksActions = ({ rule }) => {
  const entityKey = "rules";

  const useStoreRoles = getEntityStore(entityKey);
  const { handleFormDialogOpen: handleFormDialogOpenRules } = useStoreRoles();

  return (
    <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
      <ActionButton
        icon={<AddLinkIcon />}
        label="Link logic blocks"
        ariaLabel="link"
        onClick={() => handleFormDialogOpenRules("link", rule.id, "logic_blocks")}
      />
    </Box>
  );
};

RuleLogicBlocksActions.propTypes = {
  rule: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    logic_blocks: PropTypes.string,
  }).isRequired,
};

export default RuleLogicBlocksActions;
