import { Component } from '@angular/core';
import { MaterialCssVarsService } from 'angular-material-css-vars';
import { DocsSiteTheme, ThemeStorage } from './theme-storage.service';

@Component({
  selector: 'app-theme-picker',
  templateUrl: 'theme-picker.component.html'
})
export class ThemePickerComponent {
  themes: DocsSiteTheme[] = [
    {
      name: 'deeppurple-amber',
      displayName: 'Deep Purple & Amber',
      primary: '#673ab7',
      accent: '#ffc107',
      isDark: false
    },
    {
      name: 'indigo-pink',
      displayName: 'Indigo & Pink',
      primary: '#3f51b5',
      accent: '#ff4081',
      isDark: false
    },
    {
      name: 'pink-bluegrey',
      displayName: 'Pink & Blue-grey',
      primary: '#e91e63',
      accent: '#607d8b',
      isDark: true
    },
    {
      name: 'purple-green',
      displayName: 'Purple & Green',
      primary: '#9c27b0',
      accent: '#4caf50',
      isDark: true,
      isDefault: true
    },
    {
      name: 'red-blue',
      displayName: 'Red & Blue',
      primary: '#da2323',
      accent: '#3f51b5',
      isDark: false
    },
    {
      name: 'teams-light',
      displayName: 'Teams Light',
      primary: '#464775',
      accent: '#3f51b5',
      isDark: false
    },
    {
      name: 'teams-dark',
      displayName: 'Teams Dark',
      primary: '#464775',
      accent: '#ff4081',
      isDark: true
    }
  ];

  constructor(private _themeStorage: ThemeStorage, public materialCssVarsService: MaterialCssVarsService) {
    const themeName = this._themeStorage.getStoredThemeName();
    this.selectTheme(themeName);
  }

  selectTheme(themeName: string) {
    const theme = this.themes.find(theme => theme.name === themeName) || this.themes.find(theme => theme.isDefault);

    if (!theme) {
      return;
    }

    this.materialCssVarsService.setPrimaryColor(theme.primary);
    this.materialCssVarsService.setAccentColor(theme.accent);
    this.materialCssVarsService.setDarkTheme(theme.isDark);

    this._themeStorage.storeTheme(theme);
  }
}
