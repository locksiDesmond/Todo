export const DateConversion = (string) => {
  if (!string) {
    return null;
  }
  const date = new Date(string);
  const now = (Date.now() - date) / 1000;
  let d;
  d = Number(now);
  let M = Math.floor(d / (3600 * 24 * 30));
  let D = Math.floor(d / (3600 * 24));
  var h = Math.floor((d % (3600 * 24)) / 3600);
  var m = Math.floor((d % 3600) / 60);
  var hDisplay = h > 0 ? h + "h" : "";
  var mDisplay = m > 0 ? m + "m" : "";
  var DDisplay = D > 0 ? D + "d" : "";

  if (M >= 1) {
    return getDateMonthAndYearInString(date);
  } else if (D >= 7) {
    return getDateMonthAndYearInString(date);
  } else if (D >= 1) {
    return DDisplay;
  } else if (h >= 1) {
    return hDisplay;
  } else if (m >= 1) {
    return mDisplay;
  } else {
    return "now";
  }
};
export const getDateMonthAndYearInString = (date) => {
  const data = new Date(date);
  var month = new Array();
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";
  return (
    data.getDate() + " " + month[data.getMonth()] + " " + data.getFullYear()
  );
};
