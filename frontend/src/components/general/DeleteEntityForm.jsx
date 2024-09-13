import PropTypes from "prop-types";
import { DialogActions, Button } from "@mui/material";
import { getEntityStore } from "../../store";
import { useManagement } from "../../useManagement";

const DeleteEntityForm = ({ entityKey }) => {
  const useStore = getEntityStore(entityKey);
  const { selectedEntityId, handleFormDialogClose } = useStore();
  
  const { deleteMutation } = useManagement(entityKey);

  // Handle the delete action
  const handleDelete = () => {
    deleteMutation.mutate(selectedEntityId);
    handleFormDialogClose(); // Close the modal after deletion
  };

  return (
    <div>
      <p>Are you sure you want to delete this entity? This action cannot be undone.</p>
      <DialogActions>
        <Button onClick={handleFormDialogClose}>Cancel</Button>
        <Button variant="contained" color="secondary" onClick={handleDelete}>
          Delete
        </Button>
      </DialogActions>
    </div>
  );
};

DeleteEntityForm.propTypes = {
  entityKey: PropTypes.string.isRequired,
};

export default DeleteEntityForm;
