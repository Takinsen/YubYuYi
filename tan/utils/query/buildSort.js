export const buildSort = (sort) => {
  const sortObj = {};

  if (sort) {
    const sortFields = sort.split(",");
    sortFields.forEach((field) => {
      const key = field.startsWith("-") ? field.slice(1) : field;
      const direction = field.startsWith("-") ? -1 : 1;
      sortObj[key] = direction;
    });
  }

  return sortObj;
};