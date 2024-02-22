import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { projectDetailsResolver } from './resolvers/project-details.resolver';
import { ProjectsService } from './services/projects.service';
import { TasksService } from './services/tasks.service';
import { taskDetailsResolver } from './resolvers/task-details.resolver';
import { UsersService } from './services/users.service';
import { userDetailsResolver } from './resolvers/user-details.resolver';

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
      {
        path: 'tasks',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/tasks/task-list-container/task-list-container.component').then(
                (c) => c.TaskListContainerComponent
              ),
          },
          {
            path: ':id',
            providers: [TasksService],
            resolve: { task: taskDetailsResolver },
            loadComponent: () =>
              import('./pages/tasks/task-details-container/task-details-container.component').then(
                (c) => c.TaskDetailsContainerComponent
              ),
          },
        ],
      },
      {
        path: 'users',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/users/user-list-container/user-list-container.component').then(
                (c) => c.UserListContainerComponent
              ),
          },
          {
            path: ':id',
            providers: [UsersService],
            resolve: { user: userDetailsResolver },
            loadComponent: () =>
              import('./pages/users/user-details-container/user-details-container.component').then(
                (c) => c.UserDetailsContainerComponent
              ),
          },
        ],
      },
      {
        path: 'team',
        loadComponent: () =>
          import('./pages/teams/team-container/team-container.component').then(
            (c) => c.TeamContainerComponent
          ),
      },
      {
        path: 'error',
        loadComponent: () => import('./pages/error/error.component').then((c) => c.ErrorComponent),
      },
      { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
