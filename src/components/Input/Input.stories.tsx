import { Meta, StoryObj } from '@storybook/react';
import Input from './Input';
import React from 'react';
const meta = {
  title: 'proyecto-alex/Input',
  component: Input,
} as Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: 'Nombre',
    placeholder: 'Escribe tu nombre',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
};
