import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import BloquearIcon from './BloquearIcon';
import EliminarIcon from './EliminarIcon';
import styled from 'styled-components';
import EditarIcon from './EditarIcon';
import DesplegarIcon from './DesplegarIcon';
// import SwitchOffIcon from "./SwitchOffIcon";
import SearchIcon from './SearchIcon';
import PlegarIcon from './PlegarIcon';
import DesbloquearIcon from './DesbloquearIcon';
import DateIcon from './DateIcon';
import CloseIcon from './CloseIcon';
import ResetIcon from './ResetIcon';
import CalendarioCheckIcon from './CalendarioCheckIcon';
import { InputSearch, InputText } from '../Input';
import PasoAtrasIcon from './PasoAtrasIcon';
import CargandoIcon from './CargandoIcon';

const DivElement = styled.div``;

const meta = {
  title: 'proyecto-alex/Icon',
  component: DivElement,
} as Meta<typeof HTMLDivElement>;

export default meta;

type Icons = StoryObj<typeof HTMLDivElement>;

const IconPrueba = ({ icon, name }: { icon: any; name: string }) => {
  return (
    <div
      style={{
        display: 'grid',
        placeItems: 'center',
        padding: '10px',
      }}
    >
      <div>{icon}</div>
      <span>{name}</span>
    </div>
  );
};

const IconModificable = ({}) => {
  const [size, setSize] = React.useState('50px');
  const [disabled, setDisabled] = React.useState(false);
  const [inactive, setInactive] = React.useState(false);
  const [click, setClick] = React.useState(false);

  const eliminarProps = {
    size,
    disabled,
    inactive,
    onClick: click ? () => console.log('click') : undefined,
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        gap: '50px',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '5px',
          flexDirection: 'column',
        }}
      >
        <InputText defaultValue={size} onChange={(e) => setSize(e.target.value)} label="size" />
      </div>
      <EliminarIcon {...eliminarProps} />
    </div>
  );
};

const IconsArry: any = [
  { icon: <EliminarIcon onClick={() => {}} />, name: 'EliminarIcon' },
  { icon: <BloquearIcon onClick={() => {}} />, name: 'BloquearIcon' },
  { icon: <DesbloquearIcon onClick={() => {}} />, name: 'DesbloquearIcon' },
  { icon: <EditarIcon onClick={() => {}} />, name: 'EditarIcon' },
  { icon: <DesplegarIcon small={true} onClick={() => {}} />, name: 'DesplegarIcon' },
  { icon: <PlegarIcon small={true} onClick={() => {}} />, name: 'PlegarIcon' },
  { icon: <SearchIcon onClick={() => {}} />, name: 'SearchIcon' },
  { icon: <DateIcon onClick={() => {}} />, name: 'DateIcon' },
  { icon: <CloseIcon onClick={() => {}} />, name: 'CloseIcon' },
  { icon: <ResetIcon onClick={() => {}} />, name: 'ResetIcon' },
  { icon: <CalendarioCheckIcon onClick={() => {}} />, name: 'CalendarioCheckIcon' },
  { icon: <PasoAtrasIcon onClick={() => {}} />, name: 'PasoAtras' },
  { icon: <CargandoIcon onClick={() => {}} />, name: 'CargandoIcon' },

];

export const Default: Icons = {
  decorators: [
    (Story) => {
      const [search, setSearch] = React.useState('');
      return (
        <div>
          <div>
            <IconModificable />
          </div>
          <hr />
          <InputSearch placeholder="Buscar..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              width: '100%',
            }}
          >
            {IconsArry.filter((item: any) => item.name.toLowerCase().includes(search.toLowerCase())).map(
              (icon: any) => (
                <IconPrueba key={icon.name} {...icon} />
              )
            )}
          </div>
        </div>
      );
    },
  ],
};
