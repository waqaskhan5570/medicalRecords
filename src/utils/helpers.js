function createDateAndTimeFromISO(dateTimeInISO) {
  try {
    let year = dateTimeInISO.getFullYear();
    let month = dateTimeInISO.getMonth() + 1;
    let dt = dateTimeInISO.getDate();
    let hours = dateTimeInISO.getHours();
    let minutes = dateTimeInISO.getMinutes();
    let ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let timing = hours + ":" + minutes + " " + ampm;

    if (dt < 10) {
      dt = "0" + dt;
    }
    if (month < 10) {
      month = "0" + month;
    }
    return year + "-" + month + "-" + dt + " Time :" + timing;
  } catch (e) {
    console.log("createDateAndTimeFromISO", e);
    return dateTimeInISO;
  }
}

export { createDateAndTimeFromISO };
