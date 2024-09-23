import { createFileRoute } from "@tanstack/react-router";
import { Box } from "@mui/material";
import { useManagement } from "../../useManagement";
import PageHeader from "../../components/general/PageHeader";
import EditModal from "../../components/general/Modal/EditModal";
import SingleCard from "../../components/cards/SingleCard";

const Roles = () => {
  const entityKey = "roles";

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
            attachmentEntityKey="users"
          />
        ))}
        <EditModal entityKey={entityKey} />
      </Box>
    </>
  );
};

export default Roles;

// Export the Route for routing purposes
export const Route = createFileRoute("/roles/")({
  component: () => <Roles />,
});
