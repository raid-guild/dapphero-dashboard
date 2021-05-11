export const addIdsToArrary = (result: any): any[] => {
  let newIdArray: any[] = [];
  const newArray: any[] = [];
  newIdArray = Object.keys(result);

  Object.keys(result).map(function (key, index) {
    newArray.push(result[key]);
    newArray[index].id = newIdArray[index];
    return newArray;
  });
  return newArray;
};
