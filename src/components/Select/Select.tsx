import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import useClickOutside from '../../hooks/useClickOutside';
import { PlegarIcon, DesplegarIcon }from '../Icons';

import { SelectProps } from './Select.types';
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
  SelectSection,
  SelectSelected,
} from './components';
import { useTheme } from '../../store/use-theme';
import { IconContainer } from '../Icons';

const InputStyled = styled.input`
  width: 100%;
  border: none;
  margin: 0;
  padding: 0;
  outline: none;
  height: 100%;
  ${({ theme }: any) => {
    return `
            color: ${theme.TextColor};
            font-size: ${theme.fontSize};
            background: ${theme.BackgroundField};
        `;
  }}
`;

const Select = ({ onChange, options, label, value, placeholder, istyle, search, disabled }: SelectProps) => {
  const { theme } = useTheme();
  const [selectedOption, setSelectedOption] = useState<string>(value || '');
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [coords, setCoords] = useState<DOMRect>();
  const selectRef = useRef<HTMLDivElement>(null);
  const globalRef = useRef<HTMLDivElement>(null);
  const selectItemsContainerRef = useRef<HTMLDivElement>(null);
  const [isWhithSection, setIsWhithSection] = useState(false);

  useEffect(() => {
    if (value) {
      setSelectedOption(value);
    }
  }, [value]);

  useClickOutside({ ref: globalRef, callback: () => setIsOpen(false) });

  const handleOptionClick = (option: any) => {
    setSelectedOption(option.value || '');
    setIsOpen(false);
    setSearchValue('');
    if (onChange) {
      onChange(option);
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

  useEffect(() => {
    setIsWhithSection(options.some((option) => option.separador));
  }, [options]);

  useEffect(() => {
    if (disabled) {
      setIsOpen(false);
    }
  }, [disabled]);

  const findLabelByValue = useMemo(() => options.find((i) => i.value == selectedOption)?.label, [selectedOption]);

  if (disabled) {
    return (
      <ContainerCustomSelect>
        {label && (
          <CustomLabel htmlFor="select" style={{ display: 'block' }} theme={theme}>
            {label}
          </CustomLabel>
        )}
        <CustomSelect disabled={disabled} istyle={istyle} theme={theme}>
          <SelectSelected disabled={disabled}>
            <CustomPlaceholder isSelected={!findLabelByValue} disabled theme={theme}>
              {findLabelByValue || placeholder || 'Selecciona una opción'}
            </CustomPlaceholder>
            <CustomSelectArrow>
                <DesplegarIcon />
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
      <CustomSelect ref={selectRef} isOpen={isOpen} istyle={istyle} theme={theme}>
        <SelectSelected isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
          <CustomPlaceholder isSelected={!findLabelByValue} theme={theme}>
            {search && isOpen ? (
              <InputStyled
                type="text"
                value={searchValue}
                autoFocus
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Buscar..."
                theme={theme}
              />
            ) : (
              findLabelByValue || placeholder || 'Selecciona una opción'
            )}
          </CustomPlaceholder>

          <CustomSelectArrow>{isOpen ? <PlegarIcon /> : <DesplegarIcon />}</CustomSelectArrow>
        </SelectSelected>
        {isOpen && (
          <MainContainer>
            <ContainetSelectors coords={coords} ref={globalRef} altura={selectItemsContainerRef.current?.scrollHeight}>
              <SelectItemsContainer isOpen={isOpen} referencia={selectRef} ref={selectItemsContainerRef} theme={theme}>
                {options
                  .filter((item) => {
                    if (searchValue) {
                      return item.label.toLowerCase().includes(searchValue.toLowerCase());
                    }
                    return true;
                  })
                  .map((option, index) => {
                    return option.separador ? (
                      <SelectSection key={index} theme={theme}>
                        {option.label}
                      </SelectSection>
                    ) : (
                      <SelectItem
                        key={index}
                        isSelected={option.value === selectedOption}
                        isWhithSection={isWhithSection}
                        onClick={() => handleOptionClick(option)}
                        theme={theme}
                      >
                        {option.label}
                      </SelectItem>
                    );
                  })}
              </SelectItemsContainer>
            </ContainetSelectors>
          </MainContainer>
        )}
      </CustomSelect>
    </ContainerCustomSelect>
  );
};
export default Select;
