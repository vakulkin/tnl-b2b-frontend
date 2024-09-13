import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { useManagement } from "../../useManagement";
import RenderIfVisible from "react-render-if-visible";
import LogicBlockCard from "../logicBlocks/LogicBlockCard";
import RuleLogicBlocksActions from "./RuleLogicBlocksActions";

const LogicBlocksContainer = ({ logicBlocksIds }) => {
  const entityKey = "logic_blocks";

  const logicBlockIdsArray = logicBlocksIds
    ? logicBlocksIds
        .split(",")
        .map((id) => id.trim())
        .filter(Boolean)
    : [];

  const { useEntitiesQueries } = useManagement(entityKey);
  const logicBlocksQueries = useEntitiesQueries(logicBlockIdsArray, "joined");

  if (logicBlocksQueries.some((query) => query.isLoading)) {
    return <p>Loading logic blocks...</p>;
  }

  if (logicBlocksQueries.some((query) => query.isError)) {
    return <p>Error loading logic blocks</p>;
  }

  return (
    <Box>
      {logicBlocksQueries.map((query, index) => (
        <RenderIfVisible key={logicBlockIdsArray[index]} defaultHeight={50}>
          {query.data ? <LogicBlockCard logicBlock={query.data[0]} /> : null}
        </RenderIfVisible>
      ))}
      <RuleLogicBlocksActions />
    </Box>
  );
};

LogicBlocksContainer.propTypes = {
  logicBlocksIds: PropTypes.string,
};

export default LogicBlocksContainer;
