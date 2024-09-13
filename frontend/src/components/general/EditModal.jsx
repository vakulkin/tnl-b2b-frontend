import PropTypes from "prop-types";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { getEntityStore } from "../../store";
import EntityForm from "./EntityForm";
import DeleteEntityForm from "./DeleteEntityForm";

const EditModal = ({ entityKey }) => {
  const useStore = getEntityStore(entityKey);
  const { formMode, isFormDialogOpen, handleFormDialogClose } = useStore();

  // Render different components based on formMode
  const renderContent = () => {
    switch (formMode) {
      case "add":
      case "edit":
        return <EntityForm entityKey={entityKey} />;
      case "delete":
        return <DeleteEntityForm entityKey={entityKey} />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={isFormDialogOpen} onClose={handleFormDialogClose} fullWidth>
      <DialogTitle>
        {formMode === "add"
          ? "Add Entity"
          : formMode === "edit"
            ? "Edit Entity"
            : "Delete Entity"}
      </DialogTitle>
      <DialogContent>{renderContent()}</DialogContent>
    </Dialog>
  );
};

EditModal.propTypes = {
  entityKey: PropTypes.string.isRequired,
};

export default EditModal;
