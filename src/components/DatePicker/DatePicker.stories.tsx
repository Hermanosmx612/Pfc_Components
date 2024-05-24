import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import DatePicker from './DatePicker';

const meta = {
  title: 'proyecto-alex/DatePicker',
  component: DatePicker,
} as Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: {
    onChange: (date: any) => console.log(date),
    style: {
      width: '280px',
    },
  },
};
