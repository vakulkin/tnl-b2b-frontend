import { Box, Typography, Stack, Chip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PropTypes from "prop-types";
import { useManagement } from "../../useManagement";
import { getEntityStore } from "../../store";

const Condition = ({ title, entityKey, items, logicBlock }) => {
  const useStore = getEntityStore("logic_blocks");
  const { handleFormDialogOpen } = useStore();

  const itemsIds = items ? JSON.parse(items) : [];

  const attachedIds = itemsIds.map((item) => item.rk);

  const { useEntitiesQueries } = useManagement('users');
  const itemsQueries = useEntitiesQueries(attachedIds, "joined");
  const itemsIsLoading = itemsQueries.some((query) => query.isLoading);

  if (itemsQueries.some((query) => query.isError)) {
    return <p>Error loading items {items}</p>;
  }

  return (
    <Box
      sx={{
        p: 2,
        background: "#ffffff",
        borderRadius: 4,
        boxShadow: "rgba(0, 0, 0, 0.04) 0px 2px 4px",
      }}
    >
      {JSON.stringify(entityKey)}
      {"______________"}
      {JSON.stringify(items)}
      {"______________"}
      {JSON.stringify(logicBlock)}
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
          onClick={() =>
            handleFormDialogOpen("link", logicBlock.id, entityKey)
          }
        />
        {itemsQueries.map((query, index) => {
          const name = itemsIsLoading ? "..." : query.data[0]?.name;
          return (
            <Chip
              key={index}
              label={`${itemsIds[index].pk}. ${name}`}
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
