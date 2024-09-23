import { Box } from "@mui/material";
import PropTypes from "prop-types";
import CardHeader from "../general/CardHeader";
import CardAttacments from "./CardAttacments";

const SingleCard = ({ entityKey, entity, attachmentEntityKey }) => {
  return (
    <Box
      sx={{
        mb: 3,
        p: 3,
        background: "linear-gradient(135deg, #a9d6e5, #78c2cf)",
        borderRadius: 7,
      }}
    >
      <CardHeader entityKey={entityKey} entity={entity} />
      <CardAttacments
        entityKey={entityKey}
        entity={entity}
        attachmentEntityKey={attachmentEntityKey}
      />
    </Box>
  );
};

SingleCard.propTypes = {
  entityKey: PropTypes.string.isRequired,
  entity: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  attachmentEntityKey: PropTypes.string.isRequired,
};

export default SingleCard;
