import { Column, DataGridProps, Row } from './DataGrid.types';
import React, { useCallback, useMemo, useState, useRef, useEffect } from 'react';
import {
  ContainerCheckButton,
  ContainerIconsSort,
  ContainerLabelTh,
  ContainerThHeader,
  DataGridContainer,
  FooterDiv,
  TableContainer,
  SelectContainer,
  ContainerRegisterData,
  PaginationContainer,
  ContainerGlobalIcons,
  ContainerWhiteHeader,
  StickyTd,
  ButtonsFooterContainer,
  ContainerDatePicker,
} from './styledDataGrid';
import { CSSObject } from 'styled-components';
import InputSearch from '../Input/InputSearch';
import DatePicker from '../DatePicker';
import Multiselector from '../Multiselector/Multiselector';
import { Table, Tbody, Td, Th, Thead, Tr } from '../Table';
import Checkbox from '../Checkbox';
import { IconContainer } from '../Icons';
import {PlegarIcon, DesplegarIcon, PasoAtrasIcon} from '../Icons';
import { Button, InputNumber, InputText, PadLock, Pagination, Popover, Select, Tooltip } from '..';
import { useTheme } from '../../store/use-theme';
import dayjs from 'dayjs';

interface FilterProps {
  field: string;
  value: string;
  type: 'string' | 'date' | 'multiselector' | 'number';
  value2?: string;
  multiSelectorValues?: String[];
}

const DataGrid = (props: DataGridProps) => {
  const { theme } = useTheme();
  const containerToCheck = useRef<HTMLDivElement>(null);
  const sizeToTooltip = props?.viewTooltip ?? 500;
  const stickyHeadVar = props?.stickyHead ?? true;
  const [selectedIdItems, setSelectedIdItems] = useState<number[]>([]);
  const [selectedRows, setSelectedRows] = useState<Row[]>([]);
  const [existEditableColumns, setExistEditableColumns] = useState<boolean>(false);
  const [actualPage, setActualPage] = useState(props.initialState?.pagination?.page ?? 1);
  const [pageSize, setPageSize] = useState(props.initialState?.pagination?.pageSize ?? 6);
  const [filterSettings, setFilterSettings] = useState<FilterProps[]>([{ field: '', value: '', type: 'string' }]);
  const [orderValuesSort, setOrderValuesSort] = useState<{ labelOrder: string; type: 'ASC' | 'DESC' }[]>([]);
  const [stickyColumns, setStickyColumns] = useState<String[]>([]);
  const [stickyColumnsWidth, setStickyColumnsWidth] = useState<{ label: string; width: number }[]>([]);
  const [finalX, setFinalX] = useState<Boolean>(true);
  const [startX, setStartX] = useState<Boolean>(true);
  const [rows, setRows] = useState<Row[]>(props.rows);
  const [changedRows, setChangedRows] = useState<Row[]>([]);
  const [rowWithIcon, setRowWithIcon] = useState<{ label: string; row: Row }[]>([]);
  const [fieldWithTooltip, setFieldWithTooltip] = useState<{ label: string; index: number }[]>([]);

  useEffect(() => {
    if (props.rows) {
      setRows(props.rows);
    }
  }, [props.rows]);

  useEffect(() => {
    // FComprobacion si va a existir alguna columna editable para mostrar el paso Atras
    if (props.columns) {
      const existsEditableColumns = checkEditableColumns(props.columns);
      if (existsEditableColumns) setExistEditableColumns(existsEditableColumns);
    }
  }, [props.columns]);

  const checkEditableColumns = (columns: Column[]) => {
    const showPasoAtras = columns.map((i) => i.editable && true);
    return showPasoAtras.includes(true) ? true : false;
  };

  function orderByObject(obj: Row[], fields: { labelOrder: string; type: string }[]) {
    if (fields.length == 0) {
      return obj;
    } else {
      obj.sort((a, b) => {
        for (let i = 0; i < fields.length; i++) {
          const field = fields[i].labelOrder;
          const sortOrder = fields[i].type === 'DESC' ? -1 : 1;

          if (a[field] === null || a[field] === undefined) return 1 * sortOrder;
          if (b[field] === null || b[field] === undefined) return -1 * sortOrder;

          if (a[field] < b[field]) {
            return -1 * sortOrder;
          }
          if (a[field] > b[field]) {
            return 1 * sortOrder;
          }
        }
        return 0;
      });

      return obj;
    }
  }

  const filteredItems = useMemo(() => {
    let copyRows = rows;

    const uniqueFiltersMap = new Map<string, FilterProps>();

    filterSettings.forEach((filter) => {
      uniqueFiltersMap.set(filter.field, filter); // Ponerlo en un Set para evitar las repeticiones en el filtrado
    });
    const uniqueFilterSettings = Array.from(uniqueFiltersMap.values()); // Borrar repeticiones del mismo field

    if (filterSettings.length != 0) {
      uniqueFilterSettings.map((filterSetting) => {
        if (!!filterSetting.value && !!filterSetting.field) {
          if (filterSetting.type == 'string' || filterSetting.type == 'number') {
            copyRows = copyRows.filter((row) => {
              if (!row[filterSetting.field]) return false;
              const fild = row[filterSetting.field].toString().toLowerCase();
              return fild.toLowerCase().includes(filterSetting.value.toLowerCase());
            });
          } else if (filterSetting.type == 'date' && filterSetting.value && filterSetting?.value2) {
            const desdeFecha = filterSetting.value;
            const hastaFecha = filterSetting.value2;
            copyRows = copyRows.filter(
              (row) =>
                Date.parse(row[filterSetting.field]) >= parseInt(desdeFecha) &&
                Date.parse(row.registered) <= parseInt(hastaFecha)
            );
          }
        }
        if (filterSetting.type == 'multiselector' && filterSetting?.multiSelectorValues?.length != 0) {
          copyRows = copyRows.filter((row) => filterSetting?.multiSelectorValues?.includes(row[filterSetting.field]));
        }
      });
    }
    return copyRows;
  }, [filterSettings, rows]);

  const paginatedItems = useMemo(() => {
    let rows = filteredItems;
    rows = orderByObject(rows, orderValuesSort);
    return rows.slice((actualPage - 1) * pageSize, actualPage * pageSize);
  }, [filteredItems, actualPage, pageSize, orderValuesSort]);

  const totalPages = useCallback(() => Math.ceil(filteredItems.length / pageSize), [pageSize, filteredItems]);

  const thNames = useMemo(() => {
    if (stickyColumns.length > 0) {
      let newArrLabel = [...stickyColumns].reverse();
      let labelNames: Column[] = [];
      labelNames.push(...props.columns.filter((item) => !newArrLabel.includes(item.field)));

      newArrLabel.forEach((item) => {
        const matchingColumn = props.columns.find((column) => column.field === item);
        if (matchingColumn) {
          labelNames.unshift(matchingColumn);
        }
      });

      return labelNames;
    } else {
      return props.columns;
    }
  }, [props.columns, stickyColumns]);

  const handleChange = (page: number) => {
    setActualPage(page);
  };

  const handleChangeSelect = (pageSize: number) => {
    setActualPage(1);
    setPageSize(pageSize);
  };

  const handleCheckboxChange = (row: Row) => {
    const updatedSelectedItems = [...selectedIdItems];
    const updatedSelectedRows = [...selectedRows];

    const selectedIndex = updatedSelectedItems.indexOf(row.id);
    if (selectedIndex === -1) {
      updatedSelectedRows.push(row);
      updatedSelectedItems.push(row.id);
    } else {
      updatedSelectedRows.splice(selectedIndex, 1);
      updatedSelectedItems.splice(selectedIndex, 1);
    }
    setSelectedRows(updatedSelectedRows);
    setSelectedIdItems(updatedSelectedItems);
    props.checkBoxSelections?.action(updatedSelectedRows);
  };

  const handleSelectCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.checked) {
      setSelectedIdItems([]);
      setSelectedRows([]);
      props.checkBoxSelections?.action([]);
    } else {
      setSelectedIdItems(
        filteredItems.map((item) => {
          return item.id;
        })
      );
      let allRows = filteredItems.map((item) => item);
      setSelectedRows(allRows);
      props.checkBoxSelections?.action(allRows);
    }
  };

  const filterRows = (field: string, value: string, type: FilterProps['type']) => {
    if (type == 'date') {
      actualizarValorEnPosicion(value, 'value', field, type);
    } else if (type == 'string') {
      setFilterSettings([...filterSettings, { field, type, value }]);
    } else if (type == 'number') {
      setFilterSettings([...filterSettings, { field, type, value }]);
    }
    setActualPage(1);
  };

  const setSecondFieldDate = (field: string, value: string, type: FilterProps['type']) => {
    actualizarValorEnPosicion(value, 'value2', field, type);
  };

  const actualizarValorEnPosicion = (
    value: string,
    valueType: 'value' | 'value2',
    field: string,
    type: FilterProps['type']
  ) => {
    let creado = false;
    const updatedFilterSettings = filterSettings.map((e) => {
      if (e.type === 'date') {
        creado = true;
        return { ...e, [valueType]: value };
      }
      return e;
    });

    setFilterSettings(updatedFilterSettings);

    if (!creado && valueType == 'value') {
      setFilterSettings([...filterSettings, { field, type, value }]);
    } else if (!creado && valueType == 'value2') {
      setFilterSettings([...filterSettings, { field, type, value: '', value2: value }]);
    }
  };

  // poner tipo MultiSelector[]
  const handleMultiSelectorChangue = (e: any[], field: string) => {
    if (e.length > 0) {
      let arr = e.map((element) => element.value);
      setFilterSettings([...filterSettings, { field, type: 'multiselector', value: '', multiSelectorValues: arr }]);
    } else {
      setFilterSettings([...filterSettings, { field, type: 'multiselector', value: '', multiSelectorValues: [] }]);
    }
    setActualPage(1);
  };

  const checkIfIsFieldOrder = (
    labelsToOrder: { labelOrder: string; type: 'ASC' | 'DESC' }[],
    fieldToSearch: string
  ) => {
    const result = labelsToOrder.filter((labelToOrder) => labelToOrder.labelOrder == fieldToSearch);
    if (result.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const selectedArrowOrder = useCallback(
    (labelToCheck: string, type: 'ASC' | 'DESC', labelsToOrder: { labelOrder: string; type: 'ASC' | 'DESC' }[]) => {
      const result = labelsToOrder.filter((e) => e.labelOrder === labelToCheck && e.type === type);
      return result.length > 0 ? theme.IconOn : theme.IconOff;
    },
    [orderValuesSort]
  );

  const columnsSticky = useCallback(
    (field: String) => {
      return stickyColumns.includes(field) ? 'blockedColumn' : '';
    },
    [stickyColumns]
  );

  const handleClickBlock = useCallback(
    (field: string) => {
      console.log('field', field);

      if (stickyColumnsWidth.some((e) => e.label == field)) {
        const nuevoArray = stickyColumnsWidth.filter((columna) => columna.label != field);
        setStickyColumnsWidth(nuevoArray);
      }

      if (stickyColumns.includes(field)) {
        const nuevoArray = stickyColumns.filter((columna) => columna !== field);
        setStickyColumns(nuevoArray);
      } else {
        setStickyColumns([...stickyColumns, field]);
      }
    },
    [stickyColumns]
  );

  const InputFilter = (
    type: string,
    field: string,
    placeHolder: String[],
    opcionesSelector: { label: string; value: string }[]
  ) => {
    switch (type) {
      case 'string':
        return (
          <InputSearch
            placeholder={String(placeHolder[0]) ?? 'Buscar'}
            debouncedCallback={true}
            onChange={(e) => filterRows(field, e.target.value, type)}
          />
        );
      case 'number':
        return (
          <InputSearch
            placeholder={String(placeHolder[0]) + '' ?? 'Buscar'}
            debouncedCallback={true}
            onChange={(e) => filterRows(field, e.target.value, type)}
          />
        );
      case 'date':
        return (
          <>
            <ContainerDatePicker>
              <DatePicker
                placeholder={String(placeHolder[0]) ?? 'Desde'}
                onChange={(e) => filterRows(field, Date.parse(e.$d) + '', type)}
              />
              <DatePicker
                placeholder={String(placeHolder[1]) ?? 'Hasta'}
                onChange={(e) => setSecondFieldDate(field, Date.parse(e.$d) + '', type)}
              />
            </ContainerDatePicker>
          </>
        );
      case 'multiselector':
        return (
          <Multiselector
            placeholder={String(placeHolder[0]) ?? 'Selecciona'}
            options={opcionesSelector}
            onChange={(e) => handleMultiSelectorChangue(e, field)}
          />
        );
    }
  };

  const getIndex = (index: number) => {
    //if(actualPage != 1) console.log(((actualPage - 1) * pageSize + index))
    return (actualPage - 1) * pageSize + index;
  };

  const borrarFieldOrdenar = (
    fieldDelete: string,
    orderValuesSort: { labelOrder: string; type: 'ASC' | 'DESC' }[],
    type: 'ASC' | 'DESC'
  ) => {
    const newArr = orderValuesSort.filter((e) => e.labelOrder != fieldDelete);
    const newArr2 = orderValuesSort.filter((e) => e.labelOrder == fieldDelete && e.type == type);

    if (newArr2.length == 0) {
      setOrderValuesSort([...newArr, { labelOrder: fieldDelete, type: type }]);
    } else {
      setOrderValuesSort(newArr);
    }
  };

  const calcularSticky = useCallback(
    (column: string) => {
      let defaultReturn: CSSObject = {
        position: 'sticky',
        backgroundColor: 'white',
        zIndex: '6',
      };

      if (!stickyColumns.includes(column) /* || stickyColumnsWidth.length == 0 */) return {};

      let left = 0;
      if (props?.checkboxSelection) left = left + 52;
      for (let i = 0; i < stickyColumnsWidth.length; i++) {
        if (stickyColumns.includes(stickyColumnsWidth[i].label)) {
          if (stickyColumnsWidth[i].label != column) {
            left += stickyColumnsWidth[i].width;
          } else {
            break;
          }
        }
      }

      if (stickyColumns.length != 0) {
        if (stickyColumns[stickyColumns.length - 1] == column) {
          return {
            ...defaultReturn,
            left: left,
            boxShadow: '10px 0px 15px -3px rgba(0,0,0,0.1)',
          };
        } else {
          return { ...defaultReturn, left: left };
        }
      } else {
        return { ...defaultReturn, left: left };
      }
    },
    [stickyColumnsWidth, stickyColumns]
  );

  const handleAddSticky = ({ label, width }: { label: string; width: number }) => {
    let newArr = stickyColumnsWidth;
    if (newArr.some((e) => e.label === label)) {
      const updatedArr = [...newArr];
      const foundIndex = updatedArr.findIndex((e) => e.label === label);

      if (foundIndex !== -1) {
        updatedArr.splice(foundIndex, 1);
      }
      updatedArr.push({ label, width });
      setStickyColumnsWidth(updatedArr);
    } else {
      setStickyColumnsWidth([...stickyColumnsWidth, { label, width }]);
    }
  };

  const handleClick = (event: any, label: string) => {
    handleAddSticky({
      label,
      width: event?.currentTarget?.scrollWidth,
    });
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollWidth, scrollLeft, clientWidth } = e.currentTarget;
    if (Math.abs(scrollLeft - scrollWidth) === clientWidth) {
      // Marcar el final horizontalmente
      setFinalX(true);
    } else {
      if (finalX) setFinalX(false);
    }

    scrollLeft > 0 ? setStartX(false) : setStartX(true);
  };

  useEffect(() => {
    const checkScroll = () => {
      if (containerToCheck.current) {
        const container = containerToCheck.current;
        const hasHorizontal = container.scrollWidth > container.clientWidth;
        const { scrollWidth, scrollLeft, clientWidth } = container;
        const finalScroll = Math.abs(scrollLeft - scrollWidth) === clientWidth;
        hasHorizontal && !finalScroll ? setFinalX(false) : setFinalX(true);
      }
    };

    checkScroll();

    const resizeHandler = () => {
      checkScroll();
    };

    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  const isDisabled = useMemo(() => {
    return changedRows.length > 0 ? false : true;
    //return !props.columns.some((item) => item.editable);
  }, [changedRows]);

  const addToUpdated = (rowOriginal: Row, rowToUpdate: Row) => {
    const updatedChangued = [...changedRows];

    // Buscar y eliminar el elemento que coincide con rowOriginal
    const indexToRemove = updatedChangued.findIndex((item) => JSON.stringify(item) === JSON.stringify(rowOriginal));
    if (indexToRemove !== -1) {
      updatedChangued.splice(indexToRemove, 1);
    }

    // Agregar el nuevo rowToUpdate
    if (!props.rows.some((i) => JSON.stringify(i) == JSON.stringify(rowToUpdate))) {
      updatedChangued.push(rowToUpdate);
    }
    // Actualizar el estado con la nueva copia
    setChangedRows(updatedChangued);
  };

  const handleInputChangue = (value: string, field: string, lineaOriginal: Row) => {
    const arrFiltered = rowWithIcon.filter((i) => {
      if (i.row.id == lineaOriginal.id && i.label != field) {
        return i.row;
      } else if (i.row.id != lineaOriginal.id) {
        return i.row;
      }
    });

    const newArray = rows.map((obj) => {
      if (JSON.stringify(obj) == JSON.stringify(lineaOriginal)) {
        arrFiltered.push({ label: field, row: { ...obj, [field]: value } });
        addToUpdated(lineaOriginal, { ...obj, [field]: value });
        if (obj[field] != value) {
          setRowWithIcon(arrFiltered);
        }

        return {
          ...obj,
          [field]: value,
        };
      } else {
        return obj;
      }
    });
    setRows(newArray);
  };

  const checkViewTooltip = (widthElement: number, label: string, index: number) => {
    if (widthElement > sizeToTooltip) {
      const existe = fieldWithTooltip.some((e) => e.label == label && e.index == getIndex(index));
      if (!existe) setFieldWithTooltip((prevState) => [...prevState, { label, index: getIndex(index) }]);
    }
  };

  const knowTypeColumn = useCallback(
    (label: string, rowCell: Row, index: number) => {
      const column: Column | undefined = thNames.find((i) => i.field == label);
      switch (column?.type) {
        case 'string':
          return (
            <div style={{ width: '100%' }}>
              <InputText
                key={rowCell.id + label}
                style={{ border: 'none', width: '100%' }}
                type="text"
                value={rowCell[label]}
                onChange={(e) => handleInputChangue(e.target.value, label, rowCell)}
              />
            </div>
          );
        case 'number':
          return (
            <div style={{ width: '100%' }}>
              <InputNumber
                istyle={{ border: 'none' }}
                type="number"
                value={rowCell[label]}
                onChange={(e) => handleInputChangue(e.target.value, label, rowCell)}
              ></InputNumber>
            </div>
          );
        case 'date': // Cuando el tipo sea date
          return (
            <div style={{ width: '100%' }}>
              <DatePicker
                valueDate={rowCell[label]}
                placeholder={rowCell[label]}
                onChange={(e) => {
                  const dateSelected = dayjs(`${e.$y}-${e.$M + 1}-${e.$D}`, 'YYYY-M-D').format('YYYY-MM-DD');
                  handleInputChangue(dateSelected, label, rowCell);
                }}
              ></DatePicker>
            </div>
          );

        case 'selector':
          if (column.selectorOptions) {
            return (
              <div style={{ width: '100%' }}>
                <Select
                  placeholder={rowCell[label]}
                  onChange={(e) => {
                    handleInputChangue(e.value + '', label, rowCell);
                  }}
                  options={column.selectorOptions}
                  value={rowCell[label]}
                />
              </div>
            );
          }
      }
    },
    [rows]
  );

  const handleClickPasoAtras = (rowCell: Row) => {
    changedRows.forEach((item, index) => {
      if (item.id === rowCell.id) {
        const newChangedRows = [...changedRows];
        newChangedRows.splice(index, 1);
        setChangedRows(newChangedRows);
      }
    });

    let defaultRow = props.rows.find((i) => i.id === rowCell.id) ?? rowCell;
    const rowsWithDefaultValue = rows.map((item) => {
      if (item.id == rowCell.id) {
        console.log(defaultRow);
        return defaultRow;
      }
      return item;
    });

    setRows(rowsWithDefaultValue);
  };

  const showTooltip = (fieldSearch: string, index: number) => {
    return fieldWithTooltip.some((e) => e.label == fieldSearch && e.index == getIndex(index));
  };

  const labelWithEllipsis = (maxWidth: string) => {
    let matchResult = maxWidth.match(/\d+|\D+/g);
    if (matchResult) {
      let [sizeNumber, sizeUnit] = matchResult;
      if (sizeNumber) {
        return `${Math.abs(parseInt(sizeNumber) - 30)}${sizeUnit}`;
      }
    }
  };

  return (
    <>
      <DataGridContainer theme={theme}>
        <TableContainer onScroll={(e) => handleScroll(e)} ref={containerToCheck} {...props}>
          <Table stickyHead={stickyHeadVar}>
            <Thead>
              <Tr>
                {props?.checkboxSelection ? (
                  <th
                    style={{
                      position: 'sticky',
                      left: '0',
                      backgroundColor: 'white',
                      ...(!startX ? { boxShadow: '20px 0px 15px -3px rgba(0,0,0,0.1)' } : {}),
                    }}
                  >
                    <ContainerCheckButton>
                      <Checkbox
                        checked={selectedIdItems.length > 0 ? true : false}
                        onChange={(e) => handleSelectCheckbox(e)}
                        name={'All rows'}
                      />
                    </ContainerCheckButton>
                  </th>
                ) : null}
                {thNames.map((colCell, i) => {
                  return (
                    <Th
                      key={`${colCell.field}`}
                      style={{
                        ...calcularSticky(colCell.field),
                        alignContent: 'start',
                        
                      }}
                      onClick={(e) => handleClick(e, colCell.field)}
                      className={colCell.field}
                      maxWidth={colCell?.maxWidth ?? '600px'}
                      minWidth={colCell?.minWidth ?? '120px'}
                    >
                      <ContainerThHeader>
                        <ContainerLabelTh>
                          {colCell.label}
                          {colCell?.sort ? (
                            <div>
                              <ContainerIconsSort>
                                <PlegarIcon
                                  size='30px'
                                  small={true}
                                  color={selectedArrowOrder(colCell.field, 'ASC', orderValuesSort)}
                                  onClick={() => {
                                    if (checkIfIsFieldOrder(orderValuesSort, colCell.field)) {
                                      borrarFieldOrdenar(colCell.field, orderValuesSort, 'ASC');
                                    } else {
                                      setOrderValuesSort([
                                        ...orderValuesSort,
                                        {
                                          labelOrder: colCell.field,
                                          type: 'ASC',
                                        },
                                      ]);
                                    }
                                  }}
                                />
                                <DesplegarIcon
                                  color={selectedArrowOrder(colCell.field, 'DESC', orderValuesSort)}
                                  size='30px'
                                  small={true}
                                  onClick={() => {
                                    if (checkIfIsFieldOrder(orderValuesSort, colCell.field)) {
                                      borrarFieldOrdenar(colCell.field, orderValuesSort, 'DESC');
                                    } else {
                                      setOrderValuesSort([
                                        ...orderValuesSort,
                                        {
                                          labelOrder: colCell.field,
                                          type: 'DESC',
                                        },
                                      ]);
                                    }
                                  }}
                                />
                              </ContainerIconsSort>
                              
                            </div>
                          ) : null}
                          {colCell.blockColumn && (
                            <PadLock data-semaphore="true" onClick={() => handleClickBlock(colCell.field)} />
                          )}
                        </ContainerLabelTh>
                        {colCell?.filter && // Por si existe o no el multiselector
                          (colCell.filter.valuesSelector
                            ? InputFilter(
                                colCell.filter.type,
                                colCell.field,
                                colCell.filter.placeHolder,
                                colCell.filter.valuesSelector
                              )
                            : InputFilter(colCell.filter.type, colCell.field, colCell.filter.placeHolder, []))}
                      </ContainerThHeader>
                    </Th>
                  );
                })}
                {props?.actions && <ContainerWhiteHeader></ContainerWhiteHeader>}
              </Tr>
            </Thead>

            <Tbody>
              {paginatedItems.map((rowCell: any, index) => {
                return (
                  <Tr
                    key={rowCell.id}
                    // style={{
                    //   height: '65px',
                    // }}
                  >
                    {props?.checkboxSelection ? (
                      <td
                        style={{
                          position: 'sticky',
                          left: '0',
                          backgroundColor: 'white',
                          ...(!startX ? { boxShadow: '20px 0px 15px -3px rgba(0,0,0,0.1)' } : {}),
                        }}
                      >
                        <ContainerCheckButton>
                          <Checkbox
                            onChange={() => handleCheckboxChange(rowCell)}
                            checked={selectedIdItems.includes(rowCell.id)}
                            name={rowCell.id}
                          />
                        </ContainerCheckButton>
                      </td>
                    ) : null}

                    {thNames.map((item, count) => {
                      return (
                        <Td
                          maxWidth={thNames[count].maxWidth ?? '600px'}
                          minWidth={thNames[count].minWidth ?? '120px'}
                          style={{
                            ...calcularSticky(item.field),
                            zIndex: 3,
                            textAlign: 'center',
                          }}
                          className={columnsSticky(item.field)}
                          key={`${item}${count}`}
                        >
                          {item.editable ? (
                            <>
                              <div
                                style={{ display: 'flex' }}
                                onMouseEnter={(e) => {
                                  checkViewTooltip(e.currentTarget.scrollWidth, rowCell[item.field], index);
                                }}
                              >
                                {knowTypeColumn(item.field, rowCell, index)}
                              </div>
                            </>
                          ) : (
                            <label
                              style={{ display: 'flex', alignItems: 'center' }}
                              onMouseEnter={(e) => {
                                console.log(e.currentTarget.scrollWidth);
                                checkViewTooltip(e.currentTarget.scrollWidth, rowCell[item.field], index);
                              }}
                            >
                              {showTooltip(rowCell[item.field], index) ? (
                                //<Tooltip title={rowCell[item.field]} position="bottom">
                                <Popover
                                  triggerElement={
                                    <div
                                      style={{
                                        maxWidth: `calc(${thNames[count]?.maxWidth ?? '600px'} - 30px)`,
                                        textOverflow: 'ellipsis',
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        textAlign: 'start',
                                        cursor: 'help',
                                      }}
                                    >
                                      {rowCell[item.field]}
                                    </div>
                                  }
                                  trigger="click"
                                  children={
                                    <div
                                      style={{
                                        padding: '10px',
                                        textAlign: 'start',
                                        textWrap: 'wrap',
                                        wordBreak: 'break-word',
                                        backgroundColor: 'white',
                                        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
                                        color: 'black',
                                        minWidth: '120px',
                                        maxWidth: '500px',
                                        zIndex: 15,
                                      }}
                                    >
                                      {rowCell[item.field]}
                                    </div>
                                  }
                                ></Popover>
                              ) : (
                                //</Tooltip>
                                <div
                                  style={{
                                    maxWidth: thNames[count]?.maxWidth ?? '570',
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textAlign: 'start',
                                  }}
                                >
                                  {rowCell[item.field]}
                                </div>
                              )}
                            </label>
                          )}
                        </Td>
                      );
                    })}

                    <StickyTd style={!finalX ? { boxShadow: '-20px 0px 15px -3px rgba(0,0,0,0.1)' } : {}}>
                      <ContainerGlobalIcons>
                        {existEditableColumns &&
                          (changedRows.some((e) => e.id == rowCell.id) ? (
                            <Tooltip title="Atras" position="left" key={rowCell.id}>
                              <PasoAtrasIcon onClick={() => handleClickPasoAtras(rowCell)} />
                            </Tooltip>
                          ) : (
                            <PasoAtrasIcon inactive={true} />
                          ))}
                        {props?.actions &&
                          props.actions.map(
                            (action) =>
                              action.icon && (
                                <Tooltip position="left" title={action.label} key={action.label}>
                                  <IconContainer onClick={() => action.action(rowCell)}>{action.icon}</IconContainer>
                                </Tooltip>
                              )
                          )}
                      </ContainerGlobalIcons>
                    </StickyTd>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>

        <FooterDiv>
          <SelectContainer>
            <ContainerRegisterData>
              <p>
                Registros totales: {filteredItems.length}
                {props?.checkboxSelection && `/Seleccionados: ${selectedIdItems.length}`}
              </p>
            </ContainerRegisterData>
            {props?.pageSizeOptions && (
              <Select
                onChange={(e) => handleChangeSelect(parseInt(e.label))}
                istyle={{ width: '130px' }}
                placeholder={pageSize + ''}
                options={props.pageSizeOptions.map((num) => {
                  return { label: num + '', value: num + '' };
                })}
              ></Select>
            )}
          </SelectContainer>
          <PaginationContainer style={{ maxWidth: '500px', minWidth: '260px' }}>
            {props?.initialState?.pagination && props.rows.length > pageSize && (
              <Pagination totalPages={totalPages()} onChange={(e) => handleChange(e)} currentPage={actualPage} />
            )}
          </PaginationContainer>

          <ButtonsFooterContainer>
            {existEditableColumns && (
              <>
                <Button
                  disabled={isDisabled}
                  label={props.saveButton?.label ?? 'Guardar'}
                  onClick={() => {
                    {
                      props.saveButton && props.saveButton.action(changedRows);
                    }
                    setChangedRows([]);
                    setRowWithIcon([]);
                  }}
                  variant="confirm"
                >
                  {props.saveButton?.icon && props.saveButton.icon}
                </Button>
                <Button
                  disabled={isDisabled}
                  label={props.resetButton?.label ?? 'Restaurar'}
                  onClick={() => {
                    setRows(props.rows);
                    setRowWithIcon([]);
                    setChangedRows([]);
                  }}
                  variant="reject"
                >
                  {props.resetButton?.icon}
                </Button>
              </>
            )}
            {props?.buttons && (
              <>
                <div style={{ display: 'flex', gap: '40px' }}>
                  {props.buttons.map((e, index) => (
                    <Button key={index} onClick={() => e.action(rows)} label={e.label}>
                      {e.icon && e.icon}
                    </Button>
                  ))}
                </div>
              </>
            )}
          </ButtonsFooterContainer>
        </FooterDiv>
      </DataGridContainer>
    </>
  );
};

export default DataGrid;
