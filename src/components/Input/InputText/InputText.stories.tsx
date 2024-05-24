import { Meta, StoryObj } from '@storybook/react';
import InputText from './InputText';
import React from 'react';
const meta = {
  title: 'proyecto-alex/Input/InputText',
  component: InputText,
  argTypes: {
    value: { control: 'text' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    required: { control: 'boolean' },
    onChange: { action: 'onChange' },
    textError: { control: 'text' },
    error: { control: 'boolean' },
    debouncedCallback: { control: 'boolean' },
    debounceTime: { control: 'number' },
    istyle: { control: 'object' },
  },
} as Meta<typeof InputText>;

export default meta;

type Story = StoryObj<typeof InputText>;

export const Default: Story = {
  args: {
    label: 'Nombre',
    placeholder: 'Escribe tu nombre',
    required: true,
    value: 'asdfasdfasdasdfasdf',
    istyle: { width: '300px' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};
