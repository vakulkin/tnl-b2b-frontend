import { Box, Typography, Stack, Chip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PropTypes from "prop-types";
import { getEntityStore } from "../../store";

const CardAttacments = ({ entityKey, entity, attachmentEntityKey }) => {

  const useStore = getEntityStore(entityKey);
  const { handleFormDialogOpen } = useStore();

  const itemsIds = entity[attachmentEntityKey] ? JSON.parse(entity[attachmentEntityKey]) : [];

  return (
    <Box
      sx={{
        p: 2,
        background: "#ffffff",
        borderRadius: 4,
        boxShadow: "rgba(0, 0, 0, 0.04) 0px 2px 4px",
      }}
    >
      <Typography
        variant="body2"
        sx={{ fontSize: 16, mb: 1, color: "#2C3E50" }}
      >
        {attachmentEntityKey}
      </Typography>
      <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
        <Chip
          icon={<AddIcon />}
          label="Dodaj"
          variant="outlined"
          size="small"
          onClick={() => handleFormDialogOpen("link", entity.id, attachmentEntityKey)}
        />
        {itemsIds.map((item) => {
          return (
            <Chip
              key={item.primary_id}
              label={`${item.primary_id} ${item.name}`}
              variant="outlined"
              size="small"
            />
          );
        })}
      </Stack>
    </Box>
  );
};

CardAttacments.propTypes = {
  entityKey: PropTypes.string.isRequired,
  entity: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  attachmentEntityKey: PropTypes.string.isRequired,
};

export default CardAttacments;
