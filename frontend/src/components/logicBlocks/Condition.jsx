import { Box, Typography, Stack, Chip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PropTypes from "prop-types";
import { useManagement } from "../../useManagement";

const Condition = ({ title, entityKey, items }) => {

  const itemsIdsArray = items
    ? items
        .split(",")
        .map((id) => id.trim())
        .filter(Boolean)
    : [];

  const { useEntitiesQueries } = useManagement(entityKey);
  const itemsQueries = useEntitiesQueries(itemsIdsArray, "simple");

  const isLoading = itemsQueries.some((query) => query.isLoading);

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
        />
        {itemsQueries.map((query, index) => {
          const name = isLoading ? "..." : query.data[0]?.name;
          return (
            <Chip
              key={index}
              label={`${itemsIdsArray[index]}. ${name}`}
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
};

export default Condition;
