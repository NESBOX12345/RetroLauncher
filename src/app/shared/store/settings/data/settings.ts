import { Preferences } from '../types';

const preferences: Preferences = {
  account: null,
  interface: {
    language: null,
    theme: {
      value: 'dark',
      options: [],
      colorSchemes: {
        light: [
          {
            id: '--main-color',
            label: 'Main Color',
            value: 'rgb(225, 225, 225)'
          },
          {
            id: '--accent-color',
            label: 'Accent Color',
            value: ' rgb(230, 230, 230)'
          },
          {
            id: '--main-txt-color',
            label: 'Main Text Color',
            value: 'rgb(30, 30, 30)'
          },
          {
            id: '--accent-text-color',
            label: 'Accent Text Color',
            value: 'rgb(225, 0, 225)'
          },
          {
            id: '--main-logo-color',
            label: 'Main Logo Color',
            value: 'rgb(255, 0, 0)'
          },
          {
            id: '--accent-logo-color',
            label: 'Accent Logo Color',
            value: 'rgb(255, 255, 0)'
          }
        ],
        dark: [
          {
            id: '--main-color',
            label: 'Main Color',
            value: 'rgb(30, 30, 30)'
          },
          {
            id: '--accent-color',
            label: 'Accent Color',
            value: 'rgb(25, 25, 25)'
          },
          {
            id: '--main-txt-color',
            label: 'Main Text Color',
            value: 'rgb(225, 225, 225)'
          },
          {
            id: '--accent-text-color',
            label: 'Accent Text Color',
            value: 'rgb(225, 0, 225)'
          },
          {
            id: '--main-logo-color',
            label: 'Main Logo Color',
            value: 'rgb(255, 0, 0)'
          },
          {
            id: '--accent-logo-color',
            label: 'Accent Logo Color',
            value: 'rgb(255, 255, 0)'
          }
        ]
      }
    },
    start: {
      runOnStart: false,
      fullscreen: false
    }
  },
  cloud: {
    syncSettings: false,
    syncEmulators: false,
    syncSaves: false,
    syncRooms: false
  }
};

export default preferences;
