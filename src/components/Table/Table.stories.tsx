import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Table from './components/Table';
import Tbody from './components/Tbody';
import Thead from './components/Thead';
import Tr from './components/Tr';
import Th from './components/Th';
import Tfoot from './components/Tfoot';
import Td from './components/Td';

const meta = {
  title: 'proyecto-alex/Table',
  component: Table,
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof Table>;

export const Default: Story = {
  args: {
    stickyHead: true,
    children: (
      <Table>
        <Thead>
          <Tr>
            <Th scope="col">
              Person
            </Th>
            <Th maxWidth={"500px"} scope="col">
              Most interest in
            </Th>
            <Th scope="col">Ageee</Th>
            <Th scope="col">Hobbies</Th>
            <Th scope="col">Country</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>John</Td>
            <Td>Web developmenyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyt</Td>
            <Td>28</Td>
            <Td>Reading, coding</Td>
            <Td>United States</Td>
          </Tr>
          <Tr>
            <Td>Amy</Td>
            <Td>Data science</Td>
            <Td>32</Td>
            <Td>Hiking, painting</Td>
            <Td>Canada</Td>
          </Tr>
          <Tr>
            <Td>Lisa</Td>
            <Td>Machine learning</Td>
            <Td>35</Td>
            <Td>Traveling, photography</Td>
            <Td>United Kingdom</Td>
          </Tr>
          <Tr>
            <Td>Lisa</Td>
            <Td>Machine learning</Td>
            <Td>35</Td>
            <Td>Traveling, photography</Td>
            <Td>United Kingdom</Td>
          </Tr>
          <Tr>
            <Td>Lisa</Td>
            <Td>Machine learning</Td>
            <Td>35</Td>
            <Td>Traveling, photography</Td>
            <Td>United Kingdom</Td>
          </Tr>
          <Tr>
            <Td>Lisa</Td>
            <Td>Machine learning</Td>
            <Td>35</Td>
            <Td>Traveling, photography</Td>
            <Td>United Kingdom</Td>
          </Tr>
          <Tr>
            <Td>Lisa</Td>
            <Td>Machine learning</Td>
            <Td>35</Td>
            <Td>Traveling, photography</Td>
            <Td>United Kingdom</Td>
          </Tr>
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>Average age</Th>
            <Td>31.67</Td>
            <Td>31.67</Td>
            <Td>31.67</Td>
            <Td>31.67</Td>
          </Tr>
        </Tfoot>
      </Table>
    ),
  },
  decorators: [
    (Story) => (
      <div
        style={{
          height: '400px',
        }}
      >
        <Story />
      </div>
    ),
  ],
};
