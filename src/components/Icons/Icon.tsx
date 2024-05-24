import styled from 'styled-components';
import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../store/use-theme';

export const ContainerIcon: any = styled.div`
  * {
    box-sizing: border-box;
  }
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ size, small = false }: any) => {
    let [sizeNumber, sizeUnit] = size.match(/\d+|\D+/g);

    let sizeNumberAux = small ? Number(sizeNumber) * 1.3 : Number(sizeNumber) * 0.7;

    return `
            width: ${size};
            height: ${size};

            & svg {
                width: ${sizeNumberAux}${sizeUnit};
                height: ${sizeNumberAux}${sizeUnit};
            }
        
        `;
  }}
  ${({ active, color }: any) => active && `background-color: ${color};`}
    

    svg {
    ${({ inactive, color, active, disabled }: any) => {
      if (disabled) return `fill: #bcbcbc;`;
      if (inactive) return `fill: #3d4d55;`;
      if (active) return `fill: #fff;`;
      return `fill: ${color};`;
    }}
  }

  ${({ onClick, disabled }: any) => {
    if (!!onClick) {
      let aux = `&:hover {
                    background-color: ${!disabled ? `rgba(0, 0, 0, 0.1);` : 'none;'};
                    }};
                }`;

      if (!disabled) {
        aux += `cursor: pointer;`;
      }
      return aux;
    } else if (!onClick && disabled) return `cursor: not-allowed;`;
  }}
`;

const Span = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const IconMain = ({ children, ...props }: any) => {
  const spanRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<DOMRect>();

  const { theme } = useTheme();

  useEffect(() => {
    if (spanRef.current) {
      setCoords(spanRef.current?.getBoundingClientRect());
    }
  }, []);

  const refactorSize = (size: string) => {
    if (size && !isNaN(Number(size))) {
      return size + 'px';
    }
    return size;
  };

  return (
    <ContainerIcon
      {...props}
      referencia={coords}
      size={refactorSize(props.size || theme.iconSize)}
      color={props.color || theme.IconOn}
    >
      <Span ref={spanRef}>{children}</Span>
    </ContainerIcon>
  );
};
