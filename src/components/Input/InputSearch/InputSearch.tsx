import React from 'react';
import { InputSearchProps } from '../Input.types';
import { IconContainer, SearchIcon, CloseIcon } from '../../Icons';

import styled from 'styled-components';
import { useTheme } from '../../../store/use-theme';
import { useDebouncedCallback } from 'use-debounce';

const InputContainer: any = styled.div`
  * {
    box-sizing: border-box;
  }
  display: inline-block;

  ${({ theme }) => {
    return `
            color: ${theme.TextColor};
            font-size: ${theme.fontSize};
        `;
  }}
  label {
    font-weight: 500;
    display: block;
  }
`;

const InputStyled = styled.input`
  padding: 0 0.5rem;
  height: 30px;
  border: none;
  ${({ theme }) => {
    return `
            background-color: ${theme.BackgroundField};
        `;
  }}
  width: 100%;
  border-radius: 7px;

  &:focus {
    outline: none;
  }
`;

const ContianerInputPassword: any = styled.div`
  display: flex;
  border-radius: 7px;
  align-items: center;

  ${({ theme, isFocus }: any) => {
    return `
            color: ${theme.TextColor};
            font-size: ${theme.fontSize};
            background-color: ${theme.BackgroundField};
            border: 1px solid ${isFocus ? `${theme.IconOn}` : `${theme.BackgroundField}`};
        `;
  }}
`;

const ContainerIcon: any = styled.div`
  padding-right: 5px;
`;

const InputSearch = (props: InputSearchProps) => {
  const { theme } = useTheme();
  const [search, setSearch] = React.useState(props.value || '');
  const [isFocus, setIsFocus] = React.useState(false);
  React.useEffect(() => {
    props.value && setSearch(props.value);
  }, [props.value]);
  const handleClick = (e: any) => {
    props.onClick && props.onClick(search as any);
  };

  const debounceTime = props.debounceTime || 500;
  const handleChangeUseDebouncedCallback = useDebouncedCallback((e: any) => {
    props.onChange && props.onChange(e);
  }, debounceTime);

  const handleChange = (e: any) => {
    if (props.debouncedCallback === false) {
      setSearch(e.target.value);
      props.onChange && props.onChange(e);
    } else {
      setSearch(e.target.value);
      handleChangeUseDebouncedCallback(e);
    }
  };

  const clearSearch = () => {
    setSearch('');
    props.onChange && props.onChange({ target: { value: '' } } as any);
  };

  const inputProps = { ...props };
  delete inputProps.istyle;

  return (
    <InputContainer theme={theme}>
      {props.label && <label>{props.label}</label>}
      <ContianerInputPassword isFocus={isFocus} style={props.istyle} theme={theme}>
        <InputStyled
          theme={theme}
          type="text"
          {...inputProps}
          value={search}
          onChange={(e: any) => handleChange(e)}
          onFocus={(e: any) => {
            props.onFocus && props.onFocus(e);
            setIsFocus(true);
          }}
          onBlur={(e: any) => {
            props.onBlur && props.onBlur(e);
            setIsFocus(false);
          }}
          style={props.style}
        />
        <ContainerIcon>
          {props.triggerButton ? (
            <IconContainer>
              <SearchIcon onClick={handleClick} />
            </IconContainer>
          ) : search ? (
            <IconContainer>
              <CloseIcon onClick={clearSearch} />
            </IconContainer>
          ) : (
            <div
              style={{
                width: theme.iconSize,
              }}
            ></div>
          )}
        </ContainerIcon>
      </ContianerInputPassword>
    </InputContainer>
  );
};

export default InputSearch;
