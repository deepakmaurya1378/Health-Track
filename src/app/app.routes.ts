import { Routes } from '@angular/router';
import { UserFormComponent } from './user-form/user-form.component';
import { UserChartComponent } from './user-chart/user-chart.component';
import { UserListComponent } from './user-list/user-list.component';

export const appRoutes: Routes = [
  { path: "form", component: UserFormComponent },
  { path: "list", component: UserListComponent },
  { path: "chart", component: UserChartComponent },
  { path: "**", redirectTo: "form" } // Optional: Redirect unknown paths to "home"
];
