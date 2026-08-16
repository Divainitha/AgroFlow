import { PendingApprovals } from './pages/pending-approvals/pending-approvals';import { Routes } from '@angular/router';

import { MainLayout } from './layouts/main-layout/main-layout';

import { Dashboard } from './pages/dashboard/dashboard';
import { Requests } from './pages/requests/requests';
import { Approvals } from './pages/approvals/approvals';
import { NewRequest } from './pages/new-request/new-request';
import { Reports } from './pages/reports/reports';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: Dashboard
      },
      {
        path: 'requests',
        component: Requests
      },
      {
        path: 'approvals',
        component: Approvals
      },
      {
        path: 'new-request',
        component: NewRequest
      },
      {
        path: 'reports',
        component: Reports
      }, 
      {
        path: 'pending-approvals',
        component: PendingApprovals
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];