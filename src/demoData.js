export const selectListArray = [
   {
      id: 1,
      name: 'measureRoot',
      mainLabel: 'Select a measure-root',
      subLists: [
         {
            id: 101,
            subLabel: 'Measures',
            values: ['sub-filter', 'number'],
         },
         {
            id: 102,
            subLabel: 'Stock attributes',
            values: [
               'symbol',
               'industry',
               'sector',
               'marketcapname',
               'open',
               'high',
               'low',
               'close',
               'volume',
               'change',
            ],
         },
      ],
   },
   {
      id: 2,
      name: 'operation',
      mainLabel: 'Select an operation',
      subLists: [
         {
            id: 201,
            subLabel: 'Operations',
            values: ['Remove all on right'],
         },
         {
            id: 202,
            subLabel: 'Arithmetic Operations',
            values: ['+', '-', '*', '/'],
         },
         {
            id: 203,
            subLabel: 'Comparison Operations',
            values: [
               'Equals',
               'Not equals',
               'Greater than',
               'Greater than equal to',
               'Less than',
               'Less than equal to',
            ],
         },
         {
            id: 204,
            subLabel: 'Cross Operations',
            values: ['Crossed above', 'Crossed below'],
         },
      ],
   },
   {
      id: 3,
      name: 'measure',
      mainLabel: 'Select a measure',
      subLists: [
         {
            id: 301,
            subLabel: 'Measures',
            values: ['Number'],
         },
         {
            id: 302,
            subLabel: 'Stock attributes',
            values: [
               'Symbol',
               'Industry',
               'Sector',
               'Marketcapname',
               'Open',
               'High',
               'Low',
               'Close',
               'Volume',
            ],
         },
      ],
   },
];
