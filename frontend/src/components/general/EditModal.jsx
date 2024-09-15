import PropTypes from "prop-types";
import { Dialog } from "@mui/material";
import { getEntityStore } from "../../store";
import EntityForm from "./EntityForm";
import DeleteEntityForm from "./DeleteEntityForm";
import EntityAttachForm from "./EntityAttachForm";

const EditModal = ({ entityKey }) => {
  const useStore = getEntityStore(entityKey);
  const { formMode, isFormDialogOpen, handleFormDialogClose } = useStore();

  const renderContent = () => {
    switch (formMode) {
      case "add":
      case "edit":
        return <EntityForm entityKey={entityKey} />;
      case "delete":
        return <DeleteEntityForm entityKey={entityKey} />;
      case "link":
        return <EntityAttachForm entityKey={entityKey} />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={isFormDialogOpen} onClose={handleFormDialogClose} fullWidth>
      {renderContent()}
    </Dialog>
  );
};

EditModal.propTypes = {
  entityKey: PropTypes.string.isRequired,
};

export default EditModal;
