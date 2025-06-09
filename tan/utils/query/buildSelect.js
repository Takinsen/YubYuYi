export const buildSelect = (select) => {
  const fieldsToSelect = select ? select.split(",") : [];
  return fieldsToSelect.length > 0 ? fieldsToSelect.join(" ") : "";
};