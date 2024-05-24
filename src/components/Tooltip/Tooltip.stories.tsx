import { Meta, StoryObj } from '@storybook/react';
import Tooltip from './Tooltip';
import { EliminarIcon } from '../Icons';
import React from 'react';

const meta = {
  title: 'proyecto-alex/Tooltip',
  component: Tooltip,
} as Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    title: 'Tooltip title',
    children: <EliminarIcon />,
  },
  decorators: [
    (Story: any) => (
      <div style={{ margin: '5rem' }}>
        <Story />
      </div>
    ),
  ],
};
