const light = '#F5F5F5';
const dark = '#1E1E1E';
const black = '#000000';
const black10 = '#00000010';
const white10 = '#FFFFFF10';
const white50 = '#FFFFFF50';
const black50 = '#00000050';
const darkOne = '#202732';
const darkTwo = '#414F64';
const darkThree = '#8597AC';
const lightOne = '#EF1F3D';
const lightTwo = '#F7D3DC';
const lightTwo15 = '#F7D3DC15';
const transparent = '#00000000';
const grey = '#A8ABAD';
const lightGrey = '#D9DADC';
const red15 = '#FF000015';
const red25 = '#FF000025';

export default {
  dark: {
    screen: {
      overlay: black50,
      background: darkOne,
      text: light,
      shadow: black,
      main: {
        iconContainer: darkTwo,
        icon: light,
      },
      editCells: {
        icon: light,
      },
      report: {
        footerText: grey,
      },
    },
    component: {
      mainOption: {
        background: darkTwo,
      },
      header: {
        iconContainer: darkTwo,
        title: light,
        icon: light,
      },
      settingsOption: {
        icon: lightTwo,
      },
      cellListOption: {
        background: darkTwo,
        iconContainer: darkTwo,
        icon: light,
        iconDot: light,
      },
      button: {
        primary: {
          active: darkThree,
          text: light,
          disabled: darkTwo,
          disabledText: darkOne,
        },
        secondary: {
          active: darkThree,
          text: light,
        },
      },
      footer: {
        borderTop: white10,
      },
      input: {
        underline: transparent,
        borderBottom: lightGrey,
        cursor: white50,
        selection: white50,
        icon: light,
        text: light,
        placeholder: white50,
      },
      picker: {
        background: darkTwo,
        selected: lightTwo15,
      },
      gradient: {
        gradientStart: light,
        gradientEnd: lightOne,
      },
      cellCount: {
        erit: lightOne,
        text: dark,
      },
      cellBadge: {
        background: light,
        text: dark,
        border: dark,
      },
      modalShare: {
        icon: lightTwo,
      },
    },
  },
  light: {
    screen: {
      overlay: black50,
      background: light,
      text: dark,
      shadow: black,
      main: {
        iconContainer: red25,
        icon: dark,
      },
      editCells: {
        icon: dark,
      },
      report: {
        footerText: grey,
      },
    },
    component: {
      mainOption: {
        background: light,
      },
      header: {
        iconContainer: red25,
        title: dark,
        icon: dark,
      },
      settingsOption: {
        icon: lightOne,
      },
      cellListOption: {
        background: light,
        iconContainer: lightOne,
        icon: light,
        iconDot: lightOne,
      },
      button: {
        primary: {
          active: lightOne,
          text: light,
          disabled: lightGrey,
          disabledText: grey,
        },
        secondary: {
          active: light,
          text: lightOne,
        },
      },
      footer: {
        borderTop: black10,
      },
      input: {
        underline: transparent,
        borderBottom: lightGrey,
        cursor: black50,
        selection: black50,
        icon: dark,
        text: dark,
        placeholder: black50,
      },
      picker: {
        background: light,
        selected: red15,
      },
      gradient: {
        gradientStart: light,
        gradientEnd: lightOne,
      },
      cellCount: {
        erit: lightOne,
        text: light,
      },
      cellBadge: {
        background: light,
        text: dark,
        border: dark,
      },
      modalShare: {
        icon: lightOne,
      },
    },
  },
};
