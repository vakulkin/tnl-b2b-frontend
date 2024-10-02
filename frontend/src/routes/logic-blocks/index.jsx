import { createFileRoute } from "@tanstack/react-router";
import { Box } from "@mui/material";
import { useManagement } from "../../useManagement";
import PageHeader from "../../components/general/PageHeader";
import LogicBlockCard from "../../components/logicBlocks/LogicBlockCard";
import EditModal from "../../components/general/Modal/EditModal";

const LogicBlocks = () => {
  const entityKey = "logic_blocks";

  const { useEntitiesQuery } = useManagement(entityKey);
  const { data: logicBlocksData, isLoading: logicBlocksIsLoading } =
    useEntitiesQuery("joined");

  if (logicBlocksIsLoading) return <>isLoading</>;

  return (
    <>
      <Box sx={{ p: 4 }}>
        <PageHeader entityKey={entityKey} />
        {logicBlocksData?.map((logicBlock) => (
          <LogicBlockCard logicBlock={logicBlock} key={logicBlock.id} />
        ))}
        <EditModal entityKey={entityKey} />
        <EditModal entityKey="rules" />
        <EditModal entityKey="roles" />
        <EditModal entityKey="groups" />
        <EditModal entityKey="terms" />
      </Box>
    </>
  );
};

export default LogicBlocks;

export const Route = createFileRoute("/logic-blocks/")({
  component: () => <LogicBlocks />,
});
