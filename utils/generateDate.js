exports.generateDate = () => {
  const date = new Date(); // Create a new Date object with the current date and time
  const isoDate = date.toISOString();
  return isoDate;
};
