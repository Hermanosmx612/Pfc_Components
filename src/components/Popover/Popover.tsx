import styled from 'styled-components';
import useClickOutside from '../../hooks/useClickOutside';
import { PopoverProps } from './Popover.types';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface CSProps {
  coords: DOMRect | null;
  currentTrigger: HTMLDivElement | null;
  ancho: number;
  alto: number;
}

const StyledPopover: any = styled.div`
  background-color: transparent;
  z-index: 9999;

  ${({ coords, ancho, alto }: CSProps) => {
    if (!coords) return 'display: none;';

    // const { scrollHeight: altura} = currentTrigger as HTMLDivElement
    const { left, width, bottom } = coords;

    // const ancho = currentContent?.scrollWidth || width

    const globalWidth = window.innerWidth;
    const globalHeight = window.innerHeight;
    const calculatedTop = () => {
      const height = alto;
      const espacio = globalHeight - bottom;
      if (height > espacio) return (height - espacio) * -1 - 30;
      return 0;
    };
    const calculatedLeft = () => {
      const aux = ancho / 2;
      // si el espacio a la izquierda es menor a la mitad del ancho del contenido
      // calculamos la distancia para que el contenido no se salga de la pantalla
      if (left < aux) return aux - left - width / 2 + 10;
      // si el espacio a la derecha es menor a la mitad del ancho del contenido
      if (aux > globalWidth - left) return aux * -1 + width / 2 - 10;
      return 0;
    };

    const topValue = calculatedTop();
    const leftValue = calculatedLeft();

    return `
            left: ${leftValue}px;
            top: ${topValue}px;           
        `;
  }}
  position: relative;
`;

const StyledContentPopover: any = styled.div`
  position: absolute;
  z-index: 9999;

  ${({ currentTrigger }: CSProps) => {
    if (!currentTrigger) return 'display: none;';

    return `
            top: ${currentTrigger?.scrollHeight}px;
            left: 50%;
            transform: translateX(-50%);
            `;
  }}
`;

const StyledPopoverContainer = styled.div`
  * {
    box-sizing: border-box;
  }

  position: relative;
  display: inline-block;
`;

const StyledContainerTrigger = styled.div``;

const StyledPopoverMain: any = styled.div`
  position: absolute;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
`;

const Popover = (props: PopoverProps) => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [coords, setCoords] = useState<DOMRect>();
  const [trigger, setTrigger] = useState<'hover' | 'click'>('hover');

  useEffect(() => {
    if (props.trigger) {
      setTrigger(props.trigger);
    }
  }, [props.trigger]);

  useEffect(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setCoords(triggerRef.current?.getBoundingClientRect());
    }
  }, [isOpen]);

  const containerTriggerProps: any = {
    onMouseEnter: () => {
      if (trigger === 'hover') {
        setIsOpen(true);
      }
    },
    onClick: () => {
      if (trigger === 'click') {
        setIsOpen(true);
      }
    },
  };

  const mainProps: any = {
    onMouseLeave: () => {
      if (trigger === 'hover') {
        setIsOpen(false);
      }
    },
    onClick: () => {
      if (trigger === 'click') {
        setIsOpen(false);
      }
    },
  };

  return (
    <StyledPopoverContainer>
      <StyledContainerTrigger {...containerTriggerProps} ref={triggerRef}>
        {props.triggerElement}
      </StyledContainerTrigger>
      {isOpen && (
        <StyledPopoverMain {...mainProps}>
          <StyledPopover
            coords={coords}
            {...mainProps}
            alto={contentRef?.current?.scrollHeight}
            ancho={contentRef?.current?.scrollWidth}
          >
            <StyledContentPopover currentTrigger={triggerRef?.current} ref={contentRef}>
              {props.children}
            </StyledContentPopover>
          </StyledPopover>
        </StyledPopoverMain>
      )}
    </StyledPopoverContainer>
  );
};

export default Popover;
