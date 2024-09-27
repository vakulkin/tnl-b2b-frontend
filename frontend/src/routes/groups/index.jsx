import { createFileRoute } from "@tanstack/react-router";
import { Box } from "@mui/material";
import { useManagement } from "../../useManagement";
import PageHeader from "../../components/general/PageHeader";
import EditModal from "../../components/general/Modal/EditModal";
import SingleCard from "../../components/cards/SingleCard";

const Groups = () => {
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
          <SingleCard
            key={role.id}
            entityKey={entityKey}
            entity={role}
            attachmentKey="products"
          />
        ))}
        <EditModal entityKey={entityKey} />
      </Box>
    </>
  );
};

export default Groups;

// Export the Route for routing purposes
export const Route = createFileRoute("/groups/")({
  component: () => <Groups />,
});
