import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { useManagement } from "../../useManagement";
import RenderIfVisible from "react-render-if-visible";
import LogicBlockCard from "../logicBlocks/logicBlockCard";
import RuleLogicBlocksActions from "./RuleLogicBlocksActions";

const LogicBlocksContainer = ({ rule }) => {
  const entityKey = "logic_blocks";

  const logicBlockIds = rule.logic_blocks
    ? JSON.parse(rule.logic_blocks)
    : [];

  const { useEntitiesQueries } = useManagement(entityKey);
  const logicBlocksQueries = useEntitiesQueries(logicBlockIds.map(item => item.pk), "joined");

  if (logicBlocksQueries.some((query) => query.isLoading)) {
    return <p>Loading logic blocks...</p>;
  }

  if (logicBlocksQueries.some((query) => query.isError)) {
    return <p>Error loading logic blocks</p>;
  }

  return (
    <Box>
      {logicBlocksQueries.map((query, index) => (
        <RenderIfVisible key={logicBlockIds[index].pk} defaultHeight={50}>
          {query.data ? <LogicBlockCard logicBlock={query.data[0]} /> : null}
        </RenderIfVisible>
      ))}
      <RuleLogicBlocksActions rule={rule} />
    </Box>
  );
};

LogicBlocksContainer.propTypes = {
  rule: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    logic_blocks: PropTypes.string,
  }).isRequired,
};

export default LogicBlocksContainer;
