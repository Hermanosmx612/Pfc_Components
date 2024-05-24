import { Meta, StoryObj } from '@storybook/react';
import Select from './Select';
import React from 'react';
import { InputText } from '../Input';

const meta = {
  title: 'proyecto-alex/Select',
  component: Select,
} as Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    // label: "Default",
    options: [
      { label: 'Sección 1', value: 'seccion-1', separador: true },
      { label: 'Option 1', value: 'option-1' },
      { label: 'Option 2', value: 'option-2' },
      { label: 'Option 3', value: 'option-3' },
      { label: 'Sección 2', value: 'seccion-2', separador: true },
      { label: 'Oprion 4', value: 'option-4' },
      { label: 'Oprion 5', value: 'option-5' },
      { label: 'Oprion 6', value: 'option-6' },
      { label: 'Oprion 7', value: 'option-7' },
      { label: 'Oprion 8', value: 'option-8' },
    ],
    search: true,
    value: 'option-1',
    onChange: (e) => console.log(e),
    istyle: {
      width: '300px',
    },
    // style:
  },
};

export const NoSaleDeLaPantallaELContenido: Story = {
  args: {
    // label: "Default",
    options: [
      { label: 'Sección 1', value: 'seccion-1', separador: true },
      { label: 'Option 1', value: 'option-1' },
      { label: 'Option 2', value: 'option-2' },
      { label: 'Option 3', value: 'option-3' },
      { label: 'Sección 2', value: 'seccion-2', separador: true },
      { label: 'Oprion 4', value: 'option-4' },
      { label: 'Oprion 5', value: 'option-5' },
      { label: 'Oprion 6', value: 'option-6' },
      { label: 'Oprion 7', value: 'option-7' },
      { label: 'Oprion 8', value: 'option-8' },
    ],
    search: true,
    value: 'option-1',
    onChange: (e) => console.log(e),
    istyle: {
      width: '300px',
    },
    // style:
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: '3000px',
          height: '100vh',
          paddingLeft: '1000px',
          paddingTop: '1000px',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const BootomOfPage: Story = {
  args: {
    label: 'Default',
    options: [
      { label: 'Option 1', value: 'option-1' },
      { label: 'Option 2', value: 'option-2' },
      { label: 'Option 3', value: 'option-3' },
      { label: 'Oprion 4', value: 'option-4' },
      { label: 'Oprion 5', value: 'option-5' },
      { label: 'Oprion 6', value: 'option-6' },
      { label: 'Oprion 7', value: 'option-7' },
      { label: 'Oprion 8', value: 'option-8' },
      { label: 'Oprion 9', value: 'option-9' },
      { label: 'Oprion 10', value: 'option-10' },
      { label: 'Oprion 11', value: 'option-11' },
      { label: 'Oprion 12', value: 'option-12' },
    ],
    search: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <div style={{ height: '80vh' }} />
        <Story />
      </div>
    ),
  ],
};
