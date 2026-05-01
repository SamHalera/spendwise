import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import dayOfYear from "dayjs/plugin/dayOfYear";
import "dayjs/locale/fr";

dayjs.extend(localeData);
dayjs.extend(dayOfYear);

export const createCalendar = (year: number) => {
  dayjs.locale("fr");

  const week: string[] = dayjs.weekdays();
  const months: string[] = dayjs.months();

  console.log("week==>", week);
  console.log("months==>", months);

  let arrayOfMonthsAndDays: {
    name: string;
    calendar: { day: string; number: number }[];
  }[] = [];

  for (let i = 0; i < months.length; i++) {
    const daysPerMonth = dayjs().year(year).month(i).daysInMonth();
    let calendar: { day: string; number: number }[] = [];
    for (let j = 1; j <= daysPerMonth; j++) {
      const dayOfTheWeek = dayjs(`${year}-${i + 1}-${j}`).get("day");
      const day = week[dayOfTheWeek];
      calendar.push({ day, number: j });
    }
    arrayOfMonthsAndDays.push({
      name: months[i],
      calendar,
    });
  }

  console.log(arrayOfMonthsAndDays);

  return arrayOfMonthsAndDays;
};
