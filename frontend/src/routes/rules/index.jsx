import { createFileRoute } from "@tanstack/react-router";
import { Box } from "@mui/material";
import { useManagement } from "../../useManagement";
import PageHeader from "../../components/general/PageHeader";
import RuleCard from "../../components/rules/RuleCard";
import EditModal from "../../components/general/EditModal";

const Rules = () => {
  const entityKey = "rules";

  const { useEntitiesQuery } = useManagement(entityKey);
  const { data: rulesData, isLoading: rulesIsLoading } =
    useEntitiesQuery("joined");

  if (rulesIsLoading) return <>isLoading</>;

  return (
    <>
      <Box sx={{ p: 4 }}>
        <PageHeader entityKey={entityKey} />
        {rulesData?.map((rule) => (
          <RuleCard key={rule.id} rule={rule} />
        ))}
        <EditModal entityKey={entityKey} />
        <EditModal entityKey="logic_blocks" />
        <EditModal entityKey="condition_users" />
        <EditModal entityKey="condition_roles" />
        <EditModal entityKey="condition_products" />
        <EditModal entityKey="condition_terms" />
        <EditModal entityKey="condition_groups" />
      </Box>
    </>
  );
};

export default Rules;

// Export the Route for routing purposes
export const Route = createFileRoute("/rules/")({
  component: () => <Rules />,
});
