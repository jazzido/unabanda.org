import moment from "moment-timezone";

import config from "../lib/config";

export function today() {
  const today = moment()
    .tz(config.timeZone)
    .format("YYYY-MM-DD");
  return today;
}
