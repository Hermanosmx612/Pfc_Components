import React, { Children } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import DataGrid from './DataGrid';
import { Column } from './DataGrid.types';
import rows from './dummies';
import { DesbloquearIcon, EditarIcon, EliminarIcon } from '../Icons';

const meta = {
  title: 'proyecto-alex/Datagrid',
  component: DataGrid,
} satisfies Meta<typeof DataGrid>;

export default meta;

type Story = StoryObj<typeof DataGrid>;

const columns: Column[] = [
  {
    field: 'id',
    label: 'ID',
    sort: true,
    blockColumn: true,
    type: 'string',
  },
  {
    field: 'firstName',
    label: 'First name',
    sort: true,
    filter: { type: 'string', placeHolder: ['Buscar'] },
    editable: true,
    type: 'string',
  },
  {
    field: 'age',
    label: 'Age',
    sort: true,
    filter: { type: 'number', placeHolder: ['Buscar'] },
    blockColumn: true,
    type: 'number',
    editable: false,
  },
  {
    field: 'registered',
    label: 'Registered',
    sort: true,
    filter: { type: 'date', placeHolder: ['Desde', 'Hasta'] },
    blockColumn: true,
    editable: false,
    type: 'date',
  },
  {
    field: 'gender',
    label: 'Genero',
    sort: true,
    filter: {
      type: 'multiselector',
      placeHolder: ['Select'],
      valuesSelector: [
        { label: 'Mujer', value: 'female' },
        { label: 'Hombre', value: 'male' },
        { label: 'Pepe', value: 'pepe' },
      ],
    },
    blockColumn: true,
    type: 'selector',
    selectorOptions: [
      { value: 'male', label: 'Hombre' },
      { value: 'female', label: 'Mujer' },
    ],
    editable: false,
  },
  {
    field: 'lastName',
    label: 'Last name',
    sort: true,
    filter: { type: 'string', placeHolder: ['Buscar'] },
    blockColumn: true,
    editable: false,
    type: 'string',
    // maxWidth: '70em',
  },
];

export const Default: Story = {
  args: {
    stickyHead: true,
    rows: rows,
    columns: columns,
    initialState: {
      pagination: {
        page: 1,
        pageSize: 3,
      },
    },
    checkboxSelection: true,
    pageSizeOptions: [4, 15, 30],
    actions: [
      { label: 'Eliminar', icon: <EliminarIcon />, action: (e) => console.log(e) },
      { label: 'Editar', icon: <EditarIcon />, action: (e) => console.log(e) },
    ],
    position: "flex-start",
    saveButton: { label: 'Save', action: (e) => console.log(e) },
    buttons: [
      { label: 'Prueba1', icon: <DesbloquearIcon color="blue" />, action: () => console.log('Prueba1') },
      { label: 'Prueba2', action: () => console.log('Prueba2') },
    ],
    
  },
  decorators: [
    (Story) => (
      <div
        style={{
          height: '95vh',
        }}
      >
        <Story />
      </div>
    ),
  ],
};
