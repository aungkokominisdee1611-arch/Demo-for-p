import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { UserListComponent } from './features/users/user-list/user-list.component';
import { UserFormComponent } from './features/users/user-form/user-form.component';
import { UserDetailComponent } from './features/users/user-detail/user-detail.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'users', component: UserListComponent },
      { path: 'users/new', component: UserFormComponent },
      { path: 'users/:id', component: UserDetailComponent },
      { path: 'users/:id/edit', component: UserFormComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
