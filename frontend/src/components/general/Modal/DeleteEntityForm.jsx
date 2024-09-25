import PropTypes from "prop-types";
import { DialogActions, Button, Typography, DialogTitle, DialogContent } from "@mui/material";
import { getEntityStore } from "../../../store";
import { useManagement } from "../../../useManagement";

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
    <>
      <DialogTitle>
        Delete
      </DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete this entity? This action cannot be undone.</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleFormDialogClose}>Zamknij</Button>
        <Button variant="contained" onClick={handleDelete}>
          Usun
        </Button>
      </DialogActions>
    </>
  );
};

DeleteEntityForm.propTypes = {
  entityKey: PropTypes.string.isRequired,
};

export default DeleteEntityForm;
