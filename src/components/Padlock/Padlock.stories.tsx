import { Meta, StoryObj } from '@storybook/react';
import Padlock from './Padlock';
import React from 'react';

const meta = {
  title: 'proyecto-alex/Padlock',
  component: Padlock,
} as Meta<typeof Padlock>;

export default meta;

type Story = StoryObj<typeof Padlock>;

export const Default: Story = {
  args: {
    isLocked: true,
    label: 'Bloquear',
  },
  // decorators: [
  //     (Story) => {
  //         const [isLocked, setIsLocked] = React.useState(true);

  //         const handleClick = (value: boolean) => {
  //             setIsLocked(value);
  //         };

  //         return (
  //             <div style={{ width: "100px" }}>
  //                 <Story
  //                     args={{
  //                         isLocked,
  //                         onClick: handleClick,
  //                         label: "Bloquear",
  //                     }}
  //                 />
  //             </div>
  //         );
  //     },
  // ],
};
