import {
  convertDateToHour,
  formatHoursToHM,
  formatIsoDate,
  formatIsoDateToHM,
  secondsToHours,
} from "@/lib/utils/date-utils";

describe("Date Utils", () => {
  test("convertDateToHour converts date string to hour correctly", () => {
    const dateStr = "2024-08-18T14:30:00Z";
    const hour = convertDateToHour(dateStr);
    expect(hour).toBe(14);
  });

  test("formatIsoDate formats ISO date string correctly", () => {
    const isoDateString = "2024-08-18T00:00:00Z";
    const formattedDate = formatIsoDate(isoDateString);
    expect(formattedDate).toBe("August 18 2024");
  });

  test("secondsToHours converts seconds to hours correctly", () => {
    const seconds1 = 3661;
    const hours1 = secondsToHours(seconds1);
    expect(hours1).toBe(1.02);

    const seconds2 = 0;
    const hours2 = secondsToHours(seconds2);
    expect(hours2).toBe(0);

    const seconds3 = 3600;
    const hours3 = secondsToHours(seconds3);
    expect(hours3).toBe(1.0);

    const seconds4 = 7200;
    const hours4 = secondsToHours(seconds4);
    expect(hours4).toBe(2.0);
  });

  test("formatHoursToHM formats hours to hours and minutes correctly", () => {
    const hours1 = 1.5; 
    const formatted1 = formatHoursToHM(hours1);
    expect(formatted1).toBe("1h 30m");

    const hours2 = 0.75; 
    const formatted2 = formatHoursToHM(hours2);
    expect(formatted2).toBe(" 45m");

    const hours3 = 2; 
    const formatted3 = formatHoursToHM(hours3);
    expect(formatted3).toBe("2h 0m");

    const hours4 = 0; 
    const formatted4 = formatHoursToHM(hours4);
    expect(formatted4).toBe(" 0m");
  });

  test("formatIsoDateToHM formats ISO date string to hours and minutes correctly", () => {
    const isoDateString = "2024-08-18T14:30:00Z";
    const formattedTime = formatIsoDateToHM(isoDateString);
    expect(formattedTime).toBe("14:30");
  });
});
