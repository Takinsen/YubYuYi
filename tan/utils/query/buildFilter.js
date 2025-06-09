export const buildFilter = (filters) => {
  const filter = {};

  Object.entries(filters).forEach(([key, val]) => {
    if (val === undefined || val === null) return;

    if (val === '__exists__') {
      filter[key] = { $exists: true };
    } else if (val === '__not_exists__') {
      filter[key] = { $exists: false };
    } else if (val === '__null__' || val === 'null') {
      filter[key] = null;
    } else if (val === '__not_null__') {
      filter[key] = { $ne: null };
    } else if (val === '__empty__' || val === '') {
      filter[key] = '';
    } else {
      const parts = val.split(',');
      filter[key] = parts.length > 1
        ? { $in: parts.map((p) => (isNaN(p) ? p : Number(p))) }
        : (isNaN(val) ? val : Number(val));
    }
  });

  return filter;
};