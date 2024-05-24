import React, { useCallback, useEffect, useRef, useState } from 'react';
import { MONTH_OPTIONS } from '../../constants';
import Select from '../Select/Select';
import useCalendar from '../../hooks/useCalendar';
import { DatePickerProps } from './DatePicker.types';
import { SelectOptions } from '../Select/Select.types';
import { IconContainer, DesplegarIcon, EliminarIcon, DateIcon, CalendarioCheckIcon } from '../Icons';

import {
  ContainerCalendar,
  ContainerFilter,
  ContainerMonthChange,
  ContianerInputDate,
  DisabledTd,
  InputContainer,
  InputStyled,
  MainContainerCalendar,
  Separaciones,
  TBodyStyled,
  THeadStyled,
  TdSytled,
  ThStyled,
  TrStyled,
  SpanStyled,
  ContainerIcons,
  OverflowText,
  LabelStyled,
} from './styledDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { useTheme } from '../../store/use-theme';
import { InputNumber } from '../Input';

const actualValues = () => {
  const day = dayjs().date();
  const month = dayjs().month();
  const year = dayjs().year();

  return {
    day,
    month,
    year,
  };
};

const DatePicker = ({
  label,
  onChange,
  placeholder,
  valueDate,
  style,
  format = 'DD-MM-YYYY',
  disabled,
  maxDate,
  minDate,
  required,
}: DatePickerProps) => {
  const { theme } = useTheme();
  const inputRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [isChanged, setIsChanged] = useState<boolean>(false);

  const [currentValue, setCurrentValue] = useState<Dayjs>(valueDate ? dayjs(valueDate, format) : dayjs());

  const [currentYear, setCurrentYear] = useState<number>(currentValue.year());
  const [currentMonth, setCurrentMonth] = useState<number>(currentValue.month());
  const [currentDay, setCurrentDay] = useState<number>(currentValue.date());

  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonth);

  // useClickOutside({ ref: inputRef, callback: () => setIsOpen(false) });
  const { days } = useCalendar({ month: selectedMonth, year: selectedYear });

  useEffect(() => {
    if (valueDate) {
      setCurrentValue(dayjs(valueDate));
    }
  }, [valueDate]);

  const handleChangeMonth = (event: SelectOptions) => {
    setSelectedMonth(event.value as number);
  };

  const handleChangeYear = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedYear(parseInt(event.target.value));
  };

  const handleSelectDay = (day: number) => {
    if (!isChanged) setIsChanged(true);
    setCurrentYear(selectedYear);
    setCurrentMonth(selectedMonth);
    setCurrentDay(day);

    const date = dayjs(new Date(selectedYear, selectedMonth, day), format);

    if (onChange) {
      onChange(date);
    }

    setCurrentValue(date);

    setIsOpen(false);
  };

  const viewPlaceholder = useCallback(() => {
    if (valueDate && !isChanged) {
      return <>{dayjs(valueDate, format).format(format)}</>;
    }

    if (isChanged) {
      return <>{currentValue.format(format)}</>;
    }

    if (placeholder) {
      return <SpanStyled>{placeholder}</SpanStyled>;
    }

    return <SpanStyled>{format}</SpanStyled>;
  }, [valueDate, isChanged, format, currentValue, placeholder]);

  const handleClear = () => {
    if (onChange) {
      onChange(null);
    }

    setCurrentValue(dayjs());
    const { day, month, year } = actualValues();

    setCurrentYear(year);
    setSelectedYear(year);
    setCurrentMonth(month);
    setSelectedMonth(month);
    setCurrentDay(day);

    setIsChanged(false);
    setIsOpen(false);
  };

  const handleToDay = () => {
    if (!isChanged) setIsChanged(true);

    if (onChange) {
      onChange(dayjs());
    }

    setCurrentValue(dayjs());

    const { day, month, year } = actualValues();

    setCurrentYear(year);
    setSelectedYear(year);
    setCurrentMonth(month);
    setSelectedMonth(month);
    setCurrentDay(day);

    setIsOpen(false);
  };

  if (disabled)
    return (
      <InputContainer>
        {label && (
          <LabelStyled required={required} disabled theme={theme}>
            {label}
          </LabelStyled>
        )}
        <ContianerInputDate ref={inputRef} style={style} theme={theme}>
          <InputStyled disabled theme={theme}>
            <span style={{ color: '#bcbcbc' }}>{viewPlaceholder()}</span>
            <IconContainer>
              <DateIcon />
            </IconContainer>
          </InputStyled>
        </ContianerInputDate>
      </InputContainer>
    );

  return (
    <InputContainer>
      {label && (
        <LabelStyled required={required} disabled={disabled} theme={theme}>
          {label}
        </LabelStyled>
      )}
      <ContianerInputDate theme={theme} ref={inputRef} isOpen={isOpen} style={style}>
        <InputStyled onClick={() => setIsOpen(!isOpen)} isOpen={isOpen} theme={theme}>
          <OverflowText theme={theme}>{viewPlaceholder()}</OverflowText>
          <IconContainer>
            <DateIcon onClick={() => {}} />
          </IconContainer>
        </InputStyled>
        <MainContainerCalendar isOpen={isOpen} referencia={inputRef} theme={theme}>
          <ContainerFilter>
            <Select
              options={MONTH_OPTIONS}
              onChange={handleChangeMonth}
              placeholder="Mes"
              istyle={{ width: '135px' }}
              value={MONTH_OPTIONS.find((item) => item.value === selectedMonth.toString())?.value}
            />
            <ContainerMonthChange>
              <Separaciones>
                <IconContainer>
                <DesplegarIcon
                  small={true}
                  style={{ transform: 'rotate(90deg)'}}
                  onClick={() => setSelectedYear((old) => old - 1)}
                />
                </IconContainer>
              </Separaciones>
              <InputNumber
                value={selectedYear.toString()}
                onChange={handleChangeYear}
                istyle={{
                  textAlign: 'center',
                  width: '60px',
                }}
              />
              <Separaciones>
                <IconContainer>
                <DesplegarIcon
                  style={{ transform: 'rotate(-90deg)' }}
                  onClick={() => setSelectedYear((old) => old + 1)}
                />
                </IconContainer>
              </Separaciones>
            </ContainerMonthChange>
            <Separaciones></Separaciones>
          </ContainerFilter>

          <ContainerCalendar theme={theme}>
            <THeadStyled>
              <TrStyled>
                <ThStyled>L</ThStyled>
                <ThStyled>M</ThStyled>
                <ThStyled>X</ThStyled>
                <ThStyled>J</ThStyled>
                <ThStyled>V</ThStyled>
                <ThStyled>S</ThStyled>
                <ThStyled>D</ThStyled>
              </TrStyled>
            </THeadStyled>
            <TBodyStyled>
              {days.map((week, index) => (
                <TrStyled key={index}>
                  {week.map((day, index) => {
                    const isCurrent =
                      currentDay === parseInt(day) && selectedMonth === currentMonth && selectedYear === currentYear;

                    if (day === '') return <DisabledTd key={index} theme={theme} />;
                    if (minDate) {
                      const minDateParsed = dayjs(minDate, format);
                      const currentDate = dayjs(new Date(selectedYear, selectedMonth, parseInt(day)), format);
                      if (currentDate.isBefore(minDateParsed)) {
                        return (
                          <DisabledTd key={index} theme={theme}>
                            <SpanStyled>{day}</SpanStyled>
                          </DisabledTd>
                        );
                      }
                    }
                    if (maxDate) {
                      const maxDateParsed = dayjs(maxDate, format);
                      const currentDate = dayjs(new Date(selectedYear, selectedMonth, parseInt(day)), format);
                      if (currentDate.isAfter(maxDateParsed)) {
                        return (
                          <DisabledTd key={index} theme={theme}>
                            <SpanStyled>{day}</SpanStyled>
                          </DisabledTd>
                        );
                      }
                    }
                    return (
                      <TdSytled theme={theme} key={index} isSelected={isCurrent}>
                        <SpanStyled onClick={() => handleSelectDay(parseInt(day))}>{day}</SpanStyled>
                      </TdSytled>
                    );
                  })}
                </TrStyled>
              ))}
            </TBodyStyled>
          </ContainerCalendar>
          <ContainerIcons>
          <IconContainer>
            <CalendarioCheckIcon onClick={handleToDay} />
            </IconContainer>
            <IconContainer>
            <EliminarIcon onClick={handleClear} />
            </IconContainer>

          </ContainerIcons>
        </MainContainerCalendar>
      </ContianerInputDate>
    </InputContainer>
  );
};

export default DatePicker;
