import {MD3LightTheme, MD3DarkTheme} from 'react-native-paper';

export const lightTheme = {
  ...MD3LightTheme,
  dark: false,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#9B51E0',
    secondary: '#2D9CDB',
    background: '#F2F2F2',
    surface: '#FFFFFF',
    onPrimary: '#FFFFFF',
    onBackground: '#0B0F2B',
    onSurface: '#333333',
    outline: '#DDDDDD',
    error: '#EB5757',
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  dark: true,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#9B51E0',
    secondary: '#2D9CDB',
    background: '#0B0F2B',
    surface: '#1B1F3B',
    onPrimary: '#FFFFFF',
    onBackground: '#F2F2F2',
    onSurface: '#D3D3E2',
    outline: '#3C3C59',
    error: '#EB5757',
  },
};
