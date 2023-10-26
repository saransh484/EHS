// actions/formActions.js
export const updateFormField = (fieldName, fieldValue) => {
  return {
    type: 'UPDATE_FORM_FIELD',
    fieldName,
    fieldValue,
  };
};
