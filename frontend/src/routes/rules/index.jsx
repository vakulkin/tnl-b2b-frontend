import { createFileRoute } from "@tanstack/react-router";
import { Box } from "@mui/material";
import { useManagement } from "../../useManagement";
import PageHeader from "../../components/general/PageHeader";
import EditModal from "../../components/general/modal/EditModal";
import SingleCard from "../../components/cards/SingleCard";
import RuleDetails from "../../components/rules/RuleDetails";

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
          <SingleCard
            key={rule.id}
            entityKey={entityKey}
            entity={rule}
            attachmentKey="logic_blocks"
            separator="lub"
          >
            <RuleDetails rule={rule} />
          </SingleCard>
        ))}
        <EditModal entityKey={entityKey} />
        <EditModal entityKey="logic_blocks" />
      </Box>
    </>
  );
};

export default Rules;

// Export the Route for routing purposes
export const Route = createFileRoute("/rules/")({
  component: () => <Rules />,
});
