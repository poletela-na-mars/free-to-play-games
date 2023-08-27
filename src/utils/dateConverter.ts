export const convertDate = (foreignDate: string) => {
  return foreignDate.split('-').reverse().join('-');
};
