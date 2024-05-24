import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import useClickOutside from '../../hooks/useClickOutside';
import { PlegarIcon, DesplegarIcon }from '../Icons';
import { InputSearch } from '../Input';
import {
  ContainerCustomSelect,
  ContainetSelectors,
  CustomLabel,
  CustomPlaceholder,
  CustomSelect,
  CustomSelectArrow,
  MainContainer,
  SelectItem,
  SelectItemsContainer,
  SelectSelected,
} from '../Select/components';
import { MultiselectorOptions, MultiselectorProps } from './Multiselector.types';
import { useTheme } from '../../store/use-theme';
import { IconContainer } from '../Icons';

const ContainerInput = styled.div`
  padding: 4px 16px;
  margin: 3px 0;
`;

const Multiselector = ({
  onChange,
  options,
  label,
  placeholder,
  value,
  search,
  istyle,
  disabled,
}: MultiselectorProps) => {
  const { theme } = useTheme();
  const [selectedOption, setSelectedOption] = useState<MultiselectorOptions[]>(value || []);
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [coords, setCoords] = useState<DOMRect>();
  const selectRef = useRef<HTMLDivElement>(null);
  const globalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedOption(value || []);
  }, [value]);

  useClickOutside({ ref: globalRef, callback: () => setIsOpen(false) });
  
  const handleOptionClick = (option: MultiselectorOptions) => {
    const optionIndex = selectedOption.findIndex((item) => item.value === option.value);
    if (optionIndex === -1) {
      setSelectedOption([...selectedOption, option]);
      if (onChange) onChange([...selectedOption, option]);
    } else {
      const newSelectedOption = [...selectedOption];
      newSelectedOption.splice(optionIndex, 1);
      setSelectedOption(newSelectedOption);
      if (onChange) onChange(newSelectedOption);
    }
  };

  useEffect(() => {
    setCoords(selectRef.current?.getBoundingClientRect());
    let body = document.body;
    if (isOpen) {
      body?.setAttribute('style', 'overflow: hidden;');
    } else if (!isOpen) {
      body?.removeAttribute('style');
      setSearchValue('');
    }
  }, [isOpen]);

  if (disabled) {
    return (
      <ContainerCustomSelect>
        {label && (
          <CustomLabel htmlFor="select" style={{ display: 'block' }} theme={theme}>
            {label}
          </CustomLabel>
        )}
        <CustomSelect istyle={istyle} disabled={disabled} theme={theme}>
          <SelectSelected disabled={disabled}>
            <CustomPlaceholder isSelected={selectedOption.length === 0} disabled theme={theme}>
              {selectedOption.length > 0
                ? selectedOption.map((item, i) => {
                    if (i === selectedOption.length - 1) {
                      return item.label;
                    } else {
                      return item.label + ', ';
                    }
                  })
                : placeholder || 'Selecciona una opción'}
            </CustomPlaceholder>
            <CustomSelectArrow>
              <IconContainer>
                <DesplegarIcon/>
              </IconContainer>
            </CustomSelectArrow>
          </SelectSelected>
        </CustomSelect>
      </ContainerCustomSelect>
    );
  }

  return (
    <ContainerCustomSelect>
      {label && (
        <CustomLabel htmlFor="select" style={{ display: 'block' }} theme={theme}>
          {label}
        </CustomLabel>
      )}
      <CustomSelect ref={selectRef} isOpen={isOpen} isVisible={true} istyle={istyle} theme={theme}>
        <SelectSelected isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
          <CustomPlaceholder isSelected={selectedOption.length === 0} theme={theme}>
            {selectedOption.length > 0
              ? selectedOption.map((item, i) => {
                  if (i === selectedOption.length - 1) {
                    return item.label;
                  } else {
                    return item.label + ', ';
                  }
                })
              : placeholder || 'Selecciona una opción'}
          </CustomPlaceholder>
          <CustomSelectArrow><IconContainer>{isOpen ? <PlegarIcon /> : <DesplegarIcon />}</IconContainer></CustomSelectArrow>
        </SelectSelected>
        {isOpen && (
          <MainContainer>
            <ContainetSelectors coords={coords} ref={globalRef}>
              <SelectItemsContainer referencia={selectRef} isOpen={isOpen} isVisible={true} theme={theme}>
                {search && (
                  <ContainerInput>
                    <InputSearch
                      placeholder="Buscar..."
                      autoFocus
                      onChange={(e) => {
                        setSearchValue(e.target.value);
                      }}
                    />
                  </ContainerInput>
                )}
                {options
                  .filter((item) => {
                    return item.label.toLowerCase().includes(searchValue.toLowerCase());
                  })
                  .map((option, index) => (
                    <SelectItem
                      key={index}
                      isSelected={selectedOption.some((item) => item.value === option.value)}
                      onClick={() => handleOptionClick(option)}
                      theme={theme}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
              </SelectItemsContainer>
            </ContainetSelectors>
          </MainContainer>
        )}
      </CustomSelect>
    </ContainerCustomSelect>
  );
};

export default Multiselector;
