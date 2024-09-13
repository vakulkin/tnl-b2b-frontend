import PropTypes from "prop-types";
import { getEntityStore } from "../../store";
import { Box, Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ActionButton from "./ActionButton";

const PageHeader = ({ entityKey }) => {
  const useStore = getEntityStore(entityKey);
  const { handleFormDialogOpen } = useStore();

  return (
    <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between" }}>
      <Typography variant="h4">title</Typography>
      {handleFormDialogOpen && (
        <ActionButton
          icon={<AddCircleOutlineIcon />}
          size="large"
          label={`Add ${entityKey}`}
          ariaLabel="add"
          onClick={() => handleFormDialogOpen("add")}
        ></ActionButton>
      )}
    </Box>
  );
};

PageHeader.propTypes = {
  entityKey: PropTypes.string.isRequired,
};

export default PageHeader;
