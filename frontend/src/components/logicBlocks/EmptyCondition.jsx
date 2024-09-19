import AddLinkIcon from "@mui/icons-material/AddLink";
import PropTypes from "prop-types";
import { getEntityStore } from "../../store";
import ActionButton from "../general/ActionButton";
import { Box } from "@mui/material";

const EmptyCondition = ({ entityKey, logicBlock }) => {

  const useStore = getEntityStore("logic_blocks");
  const { handleFormDialogOpen } = useStore();

  return (
    <Box sx={{display: "flex", justifyContent: "center", }}>
    <Box sx={{p: 1, borderRadius: 4, background: "#fff"}}>
    <ActionButton
    icon={<AddLinkIcon />}
    label={`Link ${entityKey}`}
    ariaLabel="link"
    onClick={() => handleFormDialogOpen("link", logicBlock.id, entityKey)}
    ></ActionButton>
    </Box>
    </Box>
  );
};

EmptyCondition.propTypes = {
  entityKey: PropTypes.string.isRequired,
  logicBlock: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
};

export default EmptyCondition;
