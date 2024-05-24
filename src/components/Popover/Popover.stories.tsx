import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Popover from './Popover';
import Button from '../Button/Button';
const meta = {
  title: 'proyecto-alex/Popover',
  component: Popover,
} as Meta<typeof Popover>;

export default meta;

type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  args: {
    triggerElement: <Button label="Hover me!" />,
    children: (
      <div
        style={{
          width: '500px',
          wordWrap: 'break-word',
          backgroundColor: 'red',
          color: 'white',
        }}
      >
        Content
      </div>
    ),
  },
  decorators: [
    (Story) => (
      <div>
        <div style={{ display: 'flex', gap: '50px', flex: '1' }}>
          {new Array(10).fill('.').map((_, index) => (
            <Story key={index} />
          ))}
        </div>
        <br />
        <div style={{ display: 'flex', gap: '50px', flex: '1' }}>
          {new Array(10).fill('.').map((_, index) => (
            <Story key={index} />
          ))}
        </div>
      </div>
    ),
  ],
};

export const NoSaleDeLaPantallaELContenido: Story = {
  args: {
    triggerElement: <Button label="Hover me!" />,
    children: (
      <div
        style={{
          width: '500px',
          height: '500px',
          wordWrap: 'break-word',
          backgroundColor: 'red',
          color: 'white',
        }}
      >
        Content
      </div>
    ),
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: '3000px',
          height: '100vh',
          paddingLeft: '1500px',
          paddingTop: '210px',
        }}
      >
        <Story />
      </div>
    ),
  ],
};
