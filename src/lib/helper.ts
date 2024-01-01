export function transformObjectToArray(
  obj: Record<string, any>
): Array<Record<string, any>> {
  let result = [];
  for (let key in obj) {
    result.push({ [key]: obj[key] });
  }
  return result;
}

export const transformDate = (isoString: string): string => {
  let dateObj = new Date(isoString);
  let day = dateObj.getDate();
  let month = dateObj.getMonth() + 1; // months are 0-based in JavaScript
  let year = dateObj.getFullYear();
  let hour = dateObj.getHours();
  let minute = dateObj.getMinutes();
  let ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  hour = hour ? hour : 12; // the hour '0' should be '12'
  let formattedDate = `${day}/${month}/${year} ${hour}:${minute} ${ampm}`;
  return formattedDate;
};
