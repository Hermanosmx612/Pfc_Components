interface ICalendarValues {
  year: number;
  month: number;
}

const useCalendar = ({ year, month }: ICalendarValues) => {
  const daysArray: string[][] = [
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
  ];

  const getFirstDay = () => {
    const date = new Date(year, month, 1);
    let day = (date.getDay() + 6) % 7;
    return day;
  };

  const getCantOfDays = () => {
    const date: Date = new Date(year, month + 1, 0);
    return date.getDate();
  };

  const fillDaysArray = () => {
    let day: number = 1;
    for (let i = 0; i < daysArray.length; i++) {
      for (let j = 0; j < daysArray[i].length; j++) {
        if (i === 0 && j < getFirstDay()) {
          daysArray[i][j] = '';
        } else if (day > getCantOfDays()) {
          daysArray[i][j] = '';
        } else {
          daysArray[i][j] = `${day}`;
          day++;
        }
      }
    }

    return daysArray.filter((item) => {
      if (item.some((day) => day !== '')) {
        return item;
      }
    });
  };

  return {
    days: fillDaysArray(),
  };
};

export default useCalendar;
