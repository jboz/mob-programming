import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { MaterialCssVarsModule } from 'angular-material-css-vars';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MobsService } from './mob/mob.service';
import { MobState } from './mob/mob.store';
import { SettingsState } from './settings/settings.store';
import { ThemePickerModule } from './theme-picker/theme-picker.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),

    NgxsModule.forRoot([MobState, SettingsState], { developmentMode: !environment.production }),
    NgxsStoragePluginModule.forRoot({
      key: [MobState, SettingsState],
      deserialize: (json: string) => {
        const item = JSON.parse(json);
        if (item.mob) {
          return { ...item, mob: MobsService.fromEntity(item.mob) };
        }
        return { ...item };
      }
    }),
    MaterialCssVarsModule.forRoot({ isAutoContrast: true }),

    ThemePickerModule
  ],
  providers: [Location, { provide: LocationStrategy, useClass: PathLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule {}
