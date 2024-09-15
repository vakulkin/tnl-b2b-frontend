import PropTypes from "prop-types";
import { Formik, Form, Field } from "formik";
import { DialogActions, Button, TextField, DialogTitle, DialogContent } from "@mui/material";
import { getEntityStore } from "../../store";
import { useManagement } from "../../useManagement";


const EntityForm = ({ entityKey }) => {
  const useStore = getEntityStore(entityKey);
  const { formMode, selectedEntityId, handleFormDialogClose } = useStore();

  const { useEntityQuery, useEntitiesQuery, createMutation, updateMutation } =
    useManagement(entityKey);

  const { data: formData, isLoading: fromIsloading } = useEntitiesQuery("form");

  const { data: entityData, isLoading: entityIsloading } = useEntityQuery(
    selectedEntityId,
    "joined"
  );

  if (fromIsloading || entityIsloading) return "lodaing...";

  const fieldsList = Object.keys(formData);

  const createOrUdate = "add" === formMode;

  const initialValues = createOrUdate
    ? fieldsList.reduce((acc, key) => {
      acc[key] = "";
      return acc;
    }, {})
    : fieldsList.reduce((acc, key) => {
      acc[key] = entityData?.[0]?.[key] || "";
      return acc;
    }, {});

  const handleSubmit = (values) => {
    if (createOrUdate) {
      createMutation.mutate({ ...values });
    } else {
      updateMutation.mutate({ id: selectedEntityId, ...values });
    }
  };

  return (

    <>      <DialogTitle>
      {formMode === "add" ? "Add Entity" : "Edit Entity"}
    </DialogTitle>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        enableReinitialize
      >
        {({ errors, touched }) => (
          <Form>
            <DialogContent>
              {fieldsList.map((field) => (
                <Field
                  as={TextField}
                  key={field}
                  name={field}
                  label={field}
                  fullWidth
                  margin="normal"
                  error={touched[field] && Boolean(errors[field])}
                  helperText={touched[field] && errors[field]}
                />
              ))}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleFormDialogClose}>Close</Button>
              <Button type="submit" variant="contained" color="primary">
                {"add" === formMode ? "Create" : "Update"}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </>

  );
};

EntityForm.propTypes = {
  entityKey: PropTypes.string.isRequired,
};

export default EntityForm;