import PropTypes from "prop-types";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { getEntityStore } from "../../store";
import EntityForm from "./EntityForm";
import DeleteEntityForm from "./DeleteEntityForm";

const EditModal = ({ entityKey }) => {
  const useStore = getEntityStore(entityKey);
  const { formMode, isFormDialogOpen, handleFormDialogClose } = useStore();

  const renderContent = () => {
    if (["add", "edit"].includes(formMode)) {
      return <EntityForm entityKey={entityKey} />;
    } else if (formMode === "delete") {
      return <DeleteEntityForm entityKey={entityKey} />;
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
      <DialogContent>
        {renderContent()} {formMode}
      </DialogContent>
    </Dialog>
  );
};

EditModal.propTypes = {
  entityKey: PropTypes.string.isRequired,
};

export default EditModal;
