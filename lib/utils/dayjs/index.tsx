import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import duration from "dayjs/plugin/duration";
import utc from "dayjs/plugin/utc";

dayjs.extend(advancedFormat);
dayjs.extend(duration);
dayjs.extend(customParseFormat);
dayjs.extend(utc);

export default dayjs;
