"use client";

import { createTheme, 
         mergeMantineTheme,
         DEFAULT_THEME,
         rem,
         CSSVariablesResolver,
         Select, } from '@mantine/core';
import ButtonExtend from  './extends/Button/index';
import InputExtend from './extends/Input';
import MenuExtend from './extends/Menu';
import SelectExtend from './extends/Select';

export const resolver: CSSVariablesResolver = (theme) => ({
  variables: {
    '--color-shadow': theme.other.shadow,
    '--color-divider': theme.other.divider,
    '--color-border': theme.other.border,
  },
  dark: {},
  light: {},
})

export const themeOverride = createTheme({
  primaryColor: 'primary',
  primaryShade: 0,
  fontFamily: 'var(--font-inter), var(--font-noto-thai), sans-serif',

  colors: {
    primary: [
      '#282828', // 0 near black
      '#31AB4A', // 1 green
      '#FFFFFF', // 2 white
      '#FFC72D', // 3 yellow
      '#FF4146', // 4 red
      '#1CD276', // 5 green
      '#4082FF', // 6 blue
      '#746AF5', // 7 purple
      '#000000',
      '#000000',
    ],

    primary_ts: [
      '#231F201A', // 0 near black
      '#FF42401A', // 1 coral
      '#FFFFFF1A', // 2 white
      '#FFC72D1A', // 3 yellow
      '#FF41461A', // 4 red
      '#1CD2761A', // 5 green
      '#4082FF1A', // 6 blue
      '#746AF51A', // 7 purple
      '#0000001A',
      '#0000001A',
    ],

    grays: [
      '#727272', // 0 headerGray
      '#6A6A6A', // 1 textgray
      '#F5F5F5', // 2 backdropGray
      '#E0E0E0', // 3 disabled, border
      '#B4B4B4', // 
      '#000000',
      '#000000',
      '#000000',
      '#000000',
      '#000000',
    ]
  },



  fontSizes: {
    xs: rem(12),
    sm: rem(14),
    md: rem(16),
    lg: rem(18),
     l: rem(24),
    xl: rem(32),
    xxl: rem(64),
  },

  components: {
    Button: ButtonExtend,
    Input: InputExtend,
    Menu: MenuExtend,
    Select: SelectExtend,
  }

});

export const mergedTheme = mergeMantineTheme(DEFAULT_THEME, themeOverride);