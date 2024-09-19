import PropTypes from "prop-types";
import { Formik, Form, Field } from "formik";
import {
  DialogActions,
  Button,
  TextField,
  DialogTitle,
  DialogContent,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { getEntityStore } from "../../store";
import { useManagement } from "../../useManagement";
import * as Yup from "yup";

const EntityForm = ({ entityKey }) => {
  const useStore = getEntityStore(entityKey);
  const { formMode, selectedEntityId, handleFormDialogClose } = useStore();

  const { useEntityQuery, useEntitiesQuery, createMutation, updateMutation } =
    useManagement(entityKey);

  const { data: formData, isLoading: formIsLoading } = useEntitiesQuery("form");

  const { data: entityData, isLoading: entityIsLoading } = useEntityQuery(
    selectedEntityId,
    "joined"
  );

  if (formIsLoading || entityIsLoading) return "Loading...";

  const fieldsList = Object.keys(formData);

  const isCreateMode = formMode === "add";

  const initialValues = isCreateMode
    ? fieldsList.reduce((acc, key) => {
        acc[key] = "";
        return acc;
      }, {})
    : fieldsList.reduce((acc, key) => {
        acc[key] = entityData?.[0]?.[key] ?? "";
        return acc;
      }, {});

  // Convert validations to Yup schema
  const validationSchema = convertToYupSchema(formData);

  return (
    <>
      <DialogTitle>
        {formMode === "add" ? "Add Entity" : "Edit Entity"}
      </DialogTitle>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {({ errors, touched, values }) => (
          <Form>
            <DialogContent>
              {fieldsList.map((field) => {
                const fieldData = formData[field];
                const fieldType = fieldData.type;
                const options = fieldData.va.params || [];

                switch (fieldType) {
                  case "number":
                    return (
                      <Field
                        as={TextField}
                        key={field}
                        name={field}
                        label={field}
                        type="number"
                        fullWidth
                        margin="normal"
                        error={touched[field] && Boolean(errors[field])}
                        helperText={touched[field] && errors[field]}
                      />
                    );
                  case "select":
                    return (
                      <FormControl
                        key={field}
                        fullWidth
                        margin="normal"
                        error={touched[field] && Boolean(errors[field])}
                      >
                        <InputLabel>{field}</InputLabel>
                        <Field
                          as={Select}
                          name={field}
                          label={field}
                        >
                          {options.map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </Field>
                        {touched[field] && errors[field] && (
                          <div style={{ color: 'red', fontSize: '0.8em' }}>
                            {errors[field]}
                          </div>
                        )}
                      </FormControl>
                    );
                  case "checkbox":
                    return (
                      <FormControlLabel
                        key={field}
                        control={
                          <Field
                            as={Checkbox}
                            type="checkbox"
                            name={field}
                            checked={Boolean(values[field])}
                          />
                        }
                        label={field}
                      />
                    );
                  default:
                    // Fallback to text field
                    return (
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
                    );
                }
              })}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleFormDialogClose}>Close</Button>
              <Button type="submit" variant="contained" color="primary">
                {isCreateMode ? "Create" : "Update"}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </>
  );

  function handleSubmit(values) {
    if (isCreateMode) {
      createMutation.mutate({ ...values });
    } else {
      updateMutation.mutate({ id: selectedEntityId, ...values });
    }
  }

  function convertToYupSchema(formData) {
    const shape = {};

    for (const field in formData) {
      const fieldData = formData[field];

      // Ensure fieldData is an object
      if (!fieldData || typeof fieldData !== 'object') {
        continue; // Skip this field if data is invalid
      }

      // Ensure validations is an array
      const validations = fieldData.validations || [];
      let validator = null;

      for (const validation of validations) {
        const { rule, params } = validation;
        switch (rule) {
          case 'string':
            validator = (validator || Yup.string()).typeError('Must be a string');
            break;
          case 'integer':
            validator = (validator || Yup.number().integer()).typeError('Must be an integer');
            break;
          case 'number':
            validator = (validator || Yup.number()).typeError('Must be a number');
            break;
          case 'maxLength':
            validator = (validator || Yup.string()).max(params, `Maximum length is ${params}`);
            break;
          case 'min':
            validator = (validator || Yup.number()).min(params, `Minimum value is ${params}`);
            break;
          case 'notEmpty':
            validator = (validator || Yup.mixed()).required('This field is required');
            break;
          case 'oneOf':
            validator = (validator || Yup.mixed()).oneOf(params, `Must be one of: ${params.join(', ')}`);
            break;
          default:
            break;
        }
      }

      // If no validations are defined, set a default validator based on fieldType
      if (!validator) {
        switch (fieldData.fieldType) {
          case 'text':
            validator = Yup.string();
            break;
          case 'number':
            validator = Yup.number();
            break;
          case 'select':
            validator = Yup.mixed();
            break;
          case 'checkbox':
            validator = Yup.boolean();
            break;
          default:
            validator = Yup.mixed();
        }
      }

      shape[field] = validator;
    }

    return Yup.object().shape(shape);
  }
};

EntityForm.propTypes = {
  entityKey: PropTypes.string.isRequired,
};

export default EntityForm;
