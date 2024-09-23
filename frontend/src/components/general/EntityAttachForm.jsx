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

const EntityAttachForm = ({ entityKey, depsData }) => {
  const useStore = getEntityStore(entityKey);
  const { selectedEntityId, attachmentEntityKey, handleFormDialogClose } =
    useStore();

  const { useEntityQuery } = useManagement(entityKey);
  const {
    data: entityData,
    isFetching: entityIsLoading,
    error: entityError,
  } = useEntityQuery(selectedEntityId, "joined");

  const { useEntitiesQuery: useEntitiesQueryAttachments } =
    useManagement(attachmentEntityKey);
  const {
    data: attachmentsData,
    isFetching: attachmentsIsLoading,
    error: attachmentsError,
  } = useEntitiesQueryAttachments("simple");

  const { createMutation, deleteMutation } = useManagement(
    depsData[attachmentEntityKey].relation.route
  );

  // Handle loading and error states
  if (entityIsLoading || attachmentsIsLoading) return "Loading...";
  if (entityError || attachmentsError) return "Error loading data.";

  const attachedIds = entityData
    ? JSON.parse(entityData?.[0]?.[attachmentEntityKey] || "[]")
    : [];

  const handleCheckboxChange = (e, item) => {
    if (e.target.checked) {
      const newEntity = {
        [depsData[attachmentEntityKey].relation.foreign_key_1]: selectedEntityId,
        [depsData[attachmentEntityKey].relation.foreign_key_2]: item.id,
      };
      createMutation.mutate(newEntity, {
        onError: (error) => {
          console.error("Error creating relation:", error);
        },
      });
    } else {
      const elementToDelete = attachedIds.find(
        (elem) => elem.primary_id === item.id
      );
      if (elementToDelete) {
        deleteMutation.mutate(elementToDelete.relation_id, {
          onError: (error) => {
            console.error("Error deleting relation:", error);
          },
        });
      }
    }
  };

  const checkedIds = attachedIds.map((item) => item.primary_id);

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
  depsData: PropTypes.object.isRequired,
};

export default EntityAttachForm;
