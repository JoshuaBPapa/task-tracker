import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/auth/auth-container/auth-container.component').then(
        (c) => c.AuthContainerComponent
      ),
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./core/components/base/base.component').then((c) => c.BaseComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard-container/dashboard-container.component').then(
            (c) => c.DashboardContainerComponent
          ),
      },
      {
        path: 'projects',
        loadComponent: () =>
          import('./pages/projects/project-list-container/project-list-container.component').then(
            (c) => c.ProjectListContainerComponent
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
