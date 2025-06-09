export const buildPopulate = (populate) => {
  const populateTree = {};

  if (!populate) return [];

  const populateFields = populate.split(",");

  for (const entry of populateFields) {
    const [rawPath, rawSelect] = entry.split(":");
    const pathParts = rawPath.trim().split(".");
    const select = rawSelect?.split(";").join(" ");

    let currentLevel = populateTree;

    for (let i = 0; i < pathParts.length; i++) {
      const part = pathParts[i];
      if (!currentLevel[part]) currentLevel[part] = {};
      currentLevel = currentLevel[part];
      if (i === pathParts.length - 1 && select) {
        currentLevel["__select"] = select;
      }
    }
  }

  const buildPopulateObject = (tree) => {
    return Object.entries(tree).map(([path, value]) => {
      const populateObj = {
        path,
        ...(value.__select ? { select: value.__select } : {}),
      };
      const subPopulate = buildPopulateObject(
        Object.fromEntries(
          Object.entries(value).filter(([k]) => k !== "__select")
        )
      );
      if (subPopulate.length > 0) populateObj.populate = subPopulate;
      return populateObj;
    });
  };

  return buildPopulateObject(populateTree);
};