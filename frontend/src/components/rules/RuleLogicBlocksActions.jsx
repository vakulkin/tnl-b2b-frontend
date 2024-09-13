import { Box } from "@mui/material";
import ActionButton from "../general/ActionButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddLinkIcon from "@mui/icons-material/AddLink";

import { getEntityStore } from "../../store";

const RuleLogicBlocksActions = () => {

  const entityKey = "logic_blocks";
  const useStore = getEntityStore(entityKey);
  const { handleFormDialogOpen } = useStore();

  return (
    <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
      <ActionButton
            icon={<AddLinkIcon />}
            label={`Link logic blocks`}
            ariaLabel="link"
            onClick={() => handleFormDialogOpen("link")}
          />
          <ActionButton
            icon={<AddCircleOutlineIcon />}
            label={`Add logic block`}
            ariaLabel="add"
            onClick={() => handleFormDialogOpen("add")}
          />
    </Box>
  );
};

export default RuleLogicBlocksActions;
