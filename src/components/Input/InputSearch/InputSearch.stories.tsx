import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import InputSearch from './InputSearch';

const meta = {
  title: 'proyecto-alex/Input/InputSearch',
  component: InputSearch,
} satisfies Meta<typeof InputSearch>;
export default meta;

type Story = StoryObj<typeof meta>;

export const InputSearchStory: Story = {
  args: {
    label: 'Que estas buscando?',
    placeholder: 'Buscar...',
    istyle: { width: '300px' },
    defaultValue: 'Defualt value',
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log('InputSearch', e.target.value);
    },
  },
  // decorators: [
  //     (Story) => (
  //         <div >
  //             <Story />
  //         </div>
  //     ),
  // ],
};
