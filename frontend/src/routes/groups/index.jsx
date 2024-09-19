import { createFileRoute } from "@tanstack/react-router";
import { Box } from "@mui/material";
import { useManagement } from "../../useManagement";
import PageHeader from "../../components/general/PageHeader";
import EditModal from "../../components/general/EditModal";

const Rules = () => {
  const entityKey = "groups";

  const { useEntitiesQuery } = useManagement(entityKey);
  const { data: rolesData, isLoading: rolesIsLoading } =
    useEntitiesQuery("joined");

  if (rolesIsLoading) return <>isLoading</>;

  return (
    <>
      <Box sx={{ p: 4 }}>
        <PageHeader entityKey={entityKey} />
        {rolesData?.map((role) => (
          <>{JSON.stringify(role)}</>
        ))}
        <EditModal entityKey={entityKey} />
      </Box>
    </>
  );
};

export default Rules;

// Export the Route for routing purposes
export const Route = createFileRoute("/groups/")({
  component: () => <Rules />,
});
