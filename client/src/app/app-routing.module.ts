import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { projectDetailsResolver } from './resolvers/project-details.resolver';
import { ProjectsService } from './services/projects.service';

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
        children: [
          {
            path: '',
            loadComponent: () =>
              import(
                './pages/projects/project-list-container/project-list-container.component'
              ).then((c) => c.ProjectListContainerComponent),
          },
          {
            path: ':id',
            providers: [ProjectsService],
            resolve: { project: projectDetailsResolver },
            loadComponent: () =>
              import(
                './pages/projects/project-details-container/project-details-container.component'
              ).then((c) => c.ProjectDetailsContainerComponent),
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
