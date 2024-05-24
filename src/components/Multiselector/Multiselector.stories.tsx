import { Meta, StoryObj } from '@storybook/react';
import Multiselector from './Multiselector';
import React from 'react';
const meta = {
  title: 'proyecto-alex/Multiselector',
  component: Multiselector,
} as Meta<typeof Multiselector>;

export default meta;

type Story = StoryObj<typeof Multiselector>;

export const Default: Story = {
  args: {
    label: 'Multiselector',
    options: [
      {
        label: 'vid',
        value: ['video/x-m4v', 'audio/mpeg', 'video/quicktime'],
      },
      {
        label: 'pdf',
        value: ['application/pdf'],
      },
      {
        label: 'img',
        value: ['image/jpeg', 'image/png', 'application/zip'],
      },
      {
        label: 'doc',
        value: ['application/vnd.openxmlformats-officedocument.presentationml.presentation'],
      },
      {
        label: 'ico',
        value: ['image/vnd.microsoft.icon'],
      },
      {
        label: 'ppt',
        value: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
      },
      {
        label: 'xls',
        value: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
      },
      {
        label: 'docx',
        value: ['application/vnd.openxmlformats-officedocument.presentationml.presentation'],
      },
      {
        label: 'pptx',
        value: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
      },
      {
        label: 'xlsx',
        value: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
      },
      {
        label: 'txt',
        value: ['text/plain'],
      },
      {
        label: 'zip',
        value: ['application/zip'],
      },
      {
        label: 'rar',
        value: ['application/x-rar-compressed'],
      },
      {
        label: 'csv',
        value: ['text/csv'],
      },
      {
        label: 'mp3',
        value: ['audio/mpeg'],
      },
      {
        label: 'mp4',
        value: ['video/mp4'],
      },
      {
        label: 'mov',
        value: ['video/quicktime'],
      },
      {
        label: 'wav',
        value: ['audio/wav'],
      },
      {
        label: 'avi',
        value: ['video/x-msvideo'],
      },
      {
        label: 'wmv',
        value: ['video/x-ms-wmv'],
      },
    ],
    istyle: { width: '250px' },
    value: [],
    onChange: (value) => console.log(value),
  },
};
