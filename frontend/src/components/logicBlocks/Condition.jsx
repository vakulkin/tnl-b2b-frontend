import { Box, Typography, Stack, Chip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PropTypes from "prop-types";
import { getEntityStore } from "../../store";
import EmptyCondition from "./EmptyCondition";

const Condition = ({ title, entityKey, logicBlock }) => {

  const useStore = getEntityStore("logic_blocks");
  const { handleFormDialogOpen } = useStore();

  const itemsIds = logicBlock[entityKey] ? JSON.parse(logicBlock[entityKey]) : [];

  if (!itemsIds.length) return <EmptyCondition entityKey={entityKey} logicBlock={logicBlock} />

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
        {title}
      </Typography>
      <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
        <Chip
          icon={<AddIcon />}
          label="Dodaj"
          variant="outlined"
          size="small"
          onClick={() => handleFormDialogOpen("link", logicBlock.id, entityKey)}
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

Condition.propTypes = {
  title: PropTypes.string.isRequired,
  entityKey: PropTypes.string.isRequired,
  items: PropTypes.string,
  logicBlock: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
};

export default Condition;
