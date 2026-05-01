import { createCalendar } from "@/lib/createCalendar";
import React from "react";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import dayOfYear from "dayjs/plugin/dayOfYear";
import "dayjs/locale/fr";

dayjs.extend(localeData);
dayjs.extend(dayOfYear);

const Calendar = () => {
  dayjs.locale("fr");
  const calendar = createCalendar(2025);
  const months: string[] = dayjs.months();
  const currentMonth = `${months[dayjs().month()]
    .charAt(0)
    .toUpperCase()}${months[dayjs().month()].slice(1)}`;
  return (
    <div>
      <h2>{currentMonth}</h2>

      <div></div>
    </div>
  );
};

export default Calendar;
