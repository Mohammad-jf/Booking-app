const formatDate = (dateString) => {
  const date = new Date(dateString);

  // get month
  const options = { month: "short" };
  const month = date.toLocaleString("en-US", options, { timeZone: "UTC" });

  // get day
  const day = date.getUTCDate();

  // format time in utc 12 hour

  const timeOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "UTC",
  };

  const time = date.toLocaleString("en-US", timeOptions);

  // final formted string

  return `${month} ${day} at ${time}`;
};

export default formatDate;
