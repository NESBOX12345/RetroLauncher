import { Injectable } from '@angular/core';

import { LangData } from '@store/lang/types';
import { ElectronService } from '@services/electron/electron.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  constructor(private electronService: ElectronService) {}

  get en(): LangData {
    return {
      preferences: {
        account: {
          label: 'Account'
        },
        interface: {
          label: 'Interface',
          language: {
            label: 'Language',
            description: 'Select the language to be used by Retro Launcher',
            options: [
              { label: 'Español', value: 'es' },
              { label: 'English', value: 'en' }
            ]
          },
          theme: {
            label: 'Appearance',
            description: 'Select the appearance to be used by Retro Launcher',
            options: [
              {
                label: 'Light',
                value: 'light',
                default: true
              },
              {
                label: 'Dark',
                value: 'dark',
                default: true
              }
            ]
          },
          newTheme: {
            label: 'Create a Theme',
            description: 'Create your very own colour scheme',
            options: []
          },
          start: {
            label: 'Start Options',
            description: 'Select the behaviour when Retro Launcher starts',
            options: [
              {
                id: 'runOnStart',
                label: 'Run Retro Launcher when my computer starts'
              },
              {
                id: 'fullscreen',
                label: 'Start Retro Launcher in fullscreen'
              }
            ]
          }
        },
        cloud: {
          label: 'Cloud',
          backup: {
            label: 'Backup',
            description: 'Retro Launcher synchronization options',
            options: [
              {
                id: 'syncSettings',
                label:
                  'Enable synchronization of Retro Launcher settings on your Google Drive Account'
              },
              {
                id: 'syncEmulators',
                label:
                  'Enable synchronization of your installed emulators with your Google Drive Account'
              },
              {
                id: 'syncSaves',
                label:
                  'Enable synchronization of your save data with your Google Drive Account'
              },
              {
                id: 'syncRooms',
                label:
                  'Enable synchronization of your installed ROOMS with your Google Drive Account. (Note: You still need to choose which ROOM or group of rooms will backup )'
              }
            ]
          }
        }
      },
      menus: [
        {
          label: 'Retro Launcher',
          role: 'appMenu',
          submenu: [
            { label: 'About Retro Launcher', role: 'about' },
            { type: 'separator' },
            {
              id: 'preferences',
              label: 'Preferences...',
              accelerator: 'CmdOrCtrl+P',
              click: () =>
                this.electronService.createWindow('preferences', 'Preferences')
            },
            { label: 'Check For Updates...' },
            { type: 'separator' },
            { label: 'Quit Retro Launcher', role: 'quit' }
          ]
        },
        {
          label: 'File',
          role: 'fileMenu',
          submenu: [
            {
              label: 'Add Emulator...'
            }
          ]
        },
        {
          label: 'Help',
          role: 'help',
          submenu: [
            {
              label: 'Toggle Developer Tools',
              role: 'toggleDevTools'
            }
          ]
        }
      ]
    };
  }

  get es(): LangData {
    return {
      preferences: {
        account: {
          label: 'Account'
        },
        interface: {
          label: 'Interface',
          language: {
            label: 'Language',
            description: 'Select the language to be used by Retro Launcher',
            options: [
              { label: 'Español', value: 'es' },
              { label: 'English', value: 'en' }
            ]
          },
          theme: {
            label: 'Appearance',
            description: 'Select the appearance to be used by Retro Launcher',
            options: [
              {
                label: 'Light',
                value: 'light',
                default: true
              },
              {
                label: 'Dark',
                value: 'dark',
                default: true
              }
            ]
          },
          newTheme: {
            label: 'Create a Theme',
            description: 'Create your very own colour scheme',
            options: []
          },
          start: {
            label: 'Start Options',
            description: 'Select the behaviour when Retro Launcher starts',
            options: [
              {
                id: 'runOnStart',
                label: 'Run Retro Launcher when my computer starts'
              },
              {
                id: 'fullscreen',
                label: 'Start Retro Launcher in fullscreen'
              }
            ]
          }
        },
        cloud: {
          label: 'Cloud',
          backup: {
            label: 'Backup',
            description: 'Retro Launcher synchronization options',
            options: [
              {
                id: 'syncSettings',
                label:
                  'Enable synchronization of Retro Launcher settings on your Google Drive Account'
              },
              {
                id: 'syncEmulators',
                label:
                  'Enable synchronization of your installed emulators with your Google Drive Account'
              },
              {
                id: 'syncSaves',
                label:
                  'Enable synchronization of your save data with your Google Drive Account'
              },
              {
                id: 'syncRooms',
                label:
                  'Enable synchronization of your installed ROOMS with your Google Drive Account. (Note: You still need to choose which ROOM or group of rooms will backup )'
              }
            ]
          }
        }
      },
      menus: [
        {
          label: 'Retro Launcher',
          role: 'appMenu',
          submenu: [
            { label: 'Acerca de Retro Launcher', role: 'about' },
            { type: 'separator' },
            {
              id: 'preferences',
              label: 'Preferencias...',
              accelerator: 'CmdOrCtrl+P',
              click: () =>
                this.electronService.createWindow('preferences', 'Preferencias')
            },
            { label: 'Buscar actualizaciones...' },
            { type: 'separator' },
            { label: 'Salir de Retro Launcher', role: 'quit' }
          ]
        },
        {
          label: 'File',
          role: 'fileMenu',
          submenu: [
            {
              label: 'Add Emulator...'
            }
          ]
        },
        {
          label: 'Help',
          role: 'help',
          submenu: [
            {
              label: 'Toggle Developer Tools',
              role: 'toggleDevTools'
            }
          ]
        }
      ]
    };
  }

  language(lang: string): LangData {
    switch (lang) {
      case 'en':
        return this.en;
      case 'es':
        return this.es;
      default:
        return this.en;
    }
  }
}
