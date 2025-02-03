import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { NgChartsModule } from 'ng2-charts';
import { appRoutes } from './app/app.routes'; // ✅ Import routes

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    importProvidersFrom(NgChartsModule),
    provideRouter(appRoutes) // ✅ Provide router here
  ]
}).catch(err => console.error(err));
