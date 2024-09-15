import PropTypes from "prop-types";
import {
  DialogActions,
  Button,
  DialogTitle,
  DialogContent,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import { getEntityStore } from "../../store";
import { useManagement } from "../../useManagement";

const EntityAttachForm = ({ entityKey }) => {
  const useStore = getEntityStore(entityKey);
  const { selectedEntityId, attachmentEntity, handleFormDialogClose } =
    useStore();

  const { useEntityQuery } = useManagement(entityKey);
  const {
    data: entityData,
    isLoading: entityIsLoading,
    error: entityError,
  } = useEntityQuery(selectedEntityId, "joined");

  const { useEntitiesQuery: useEntitiesQueryAttachments } =
    useManagement(attachmentEntity);
  const {
    data: attachmentsData,
    isLoading: attachmentsIsLoading,
    error: attachmentsError,
  } = useEntitiesQueryAttachments("joined");

  const { createMutation, deleteMutation } = useManagement(
    "rule_block_relations"
  );

  // Handle loading and error states
  if (entityIsLoading || attachmentsIsLoading) return "Loading...";
  if (entityError || attachmentsError) return "Error loading data.";

  const attachedIds = entityData
    ? JSON.parse(entityData?.[0]?.logic_blocks || "[]")
    : [];

  const handleCheckboxChange = (e, item) => {
    if (e.target.checked) {
      const newEntity = {
        rule_id: selectedEntityId, // Mapping rule ID
        block_id: item.id, // Mapping block ID
        // Comments retained: Placeholder for possible dynamic key mappings
        // [dependency.relation.foreign_key_1]: selectedEntityId,
        // [dependency.relation.foreign_key_2]: item.id,
      };
      createMutation.mutate(newEntity, {
        onError: (error) => {
          console.error("Error creating relation:", error);
        },
      });
    } else {
      const elementToDelete = attachedIds.find((elem) => elem.rk === item.id);
      if (elementToDelete) {
        deleteMutation.mutate(elementToDelete.tempk, {
          onError: (error) => {
            console.error("Error deleting relation:", error);
          },
        });
      }
    }
  };

  // Memoizing checkedIds for better performance
  const checkedIds = attachedIds.map((item) => item.rk);

  return (
    <>
      <DialogTitle>Attach Entity</DialogTitle>
      <DialogContent>
        {attachmentsData?.map((item) => (
          <FormControlLabel
            key={item.id}
            control={
              <Checkbox
                checked={checkedIds.includes(item.id)}
                onChange={(e) => handleCheckboxChange(e, item)}
              />
            }
            label={`${item.id}. ${item.name}`}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleFormDialogClose}>Close</Button>
      </DialogActions>
    </>
  );
};

EntityAttachForm.propTypes = {
  entityKey: PropTypes.string.isRequired,
};

export default EntityAttachForm;
