import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Button from './Button';
import { EliminarIcon } from '../Icons';
const meta = {
  title: 'proyecto-alex/Button',
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    label: 'Confirmación',
    variant: 'confirm',
    children: <EliminarIcon color='red'/>,
  },
};

export const Secondary: Story = {
  args: {
    label: 'Rechazo',
    variant: 'reject',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    disabled: true,
  },
};
