import { createFileRoute } from "@tanstack/react-router";
import { Box } from "@mui/material";
import { useManagement } from "../../useManagement";
import PageHeader from "../../components/general/PageHeader";
import EditModal from "../../components/general/Modal/EditModal";

const Rules = () => {
  const entityKey = "roles";

  const { useEntitiesQuery } = useManagement(entityKey);
  const { data: groupsData, isLoading: groupsIsLoading } =
    useEntitiesQuery("joined");

  if (groupsIsLoading) return <>isLoading</>;

  return (
    <>
      <Box sx={{ p: 4 }}>
        <PageHeader entityKey={entityKey} />
        {groupsData?.map((group) => (
          <>{JSON.stringify(group)}</>
        ))}
        <EditModal entityKey={entityKey} />
      </Box>
    </>
  );
};

export default Rules;

// Export the Route for routing purposes
export const Route = createFileRoute("/roles/")({
  component: () => <Rules />,
});
