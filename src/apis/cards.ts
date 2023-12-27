export const getLocalStorageItem = (key: any) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export const setLocalStorageItem = (key: any, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const updateLocalStorageList = (key: any, newItem: any) => {
  const currentList = getLocalStorageItem(key) || [];
  const updatedList = [newItem, ...currentList];
  setLocalStorageItem(key, updatedList);
  console.log(updatedList);
  return updatedList;
};


