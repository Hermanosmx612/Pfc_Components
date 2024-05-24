import { Meta, StoryObj } from '@storybook/react';
import Checkbox from './Checkbox';
import React, { ChangeEvent, FormEventHandler } from 'react';

const meta = {
  title: 'proyecto-alex/Checkbox',
  component: Checkbox,
} as Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: 'Option',
    value: 'Option',
  },
  decorators: [
    (Story) => (
      <form>
        <Story />
        <Story />
        <Story />
      </form>
    ),
  ],
};

export const Disabled: Story = {
  args: {
    disabled: true,
    // onChange: (value: boolean) => console.log(value),
    label: 'Option',
    checked: true,
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
        <Story />
        <Story />
      </div>
    ),
  ],
};

export const SinLabel: Story = {
  args: {
    // onChange: (value: boolean) => console.log(value),
  },
};
