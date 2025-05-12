// src/theme.ts
import { createTheme } from '@mantine/core';

export const theme = createTheme({
  colors: {
    primary: [
      'var(--primary-0, #f5fbfb)',  // lightest
      'var(--primary-1, #e5f1f1)',  // your --primary-light
      'var(--primary-2, #c6e3e3)',
      'var(--primary-3, #96d0d0)',
      'var(--primary-4, #5cbcbc)',
      'var(--primary-5, #008080)',  // your --primary (base)
      'var(--primary-6, #006d6d)',
      'var(--primary-7, #005a5a)',
      'var(--primary-8, #004747)',
      'var(--primary-9, #003434)'   // darkest
    ],
  },
  primaryColor: 'primary',
});