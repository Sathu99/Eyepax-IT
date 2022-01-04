export const routes = [
  {
    value: '0',
    label: 'Current Route',
    disable: true,
  },
  {
    value: 'colombo',
    label: 'Colombo',
    disable: false,
  },
  {
    value: 'jaffna',
    label: 'Jaffna',
    disable: false,
  },
  {
    value: 'kandy',
    label: 'Kandy',
    disable: false,
  },
  {
    value: 'vavniya',
    label: 'Vavuniya',
    disable: false,
  },
];

export const column = [
  { id: 'id', label: 'ID', minWidth: 50 },
  { id: 'name', label: 'Name', minWidth: 100, align: 'left' },
  {
    id: 'email',
    label: 'Email',
    minWidth: 100,
    align: 'left',
  },

  {
    id: 'telephone',
    label: 'Telephone',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'route',
    label: 'Current Routes',
    minWidth: 150,
    align: 'center',
  },
];
