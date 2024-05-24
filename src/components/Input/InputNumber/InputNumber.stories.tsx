import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import InputNumber from './InputNumber';

const meta = {
  title: 'proyecto-alex/Input/InputNumber',
  component: InputNumber,
} as Meta<typeof InputNumber>;

export default meta;

type Story = StoryObj<typeof InputNumber>;

export const Number: Story = {
  args: {
    required: true,
    label: 'Number',
    placeholder: 'Escribe tu edad',
  },
};
