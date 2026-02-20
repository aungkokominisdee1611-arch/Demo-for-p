import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { UserListComponent } from './features/users/user-list/user-list.component';
import { UserFormComponent } from './features/users/user-form/user-form.component';
import { UserDetailComponent } from './features/users/user-detail/user-detail.component';
import { CategoryComponent } from './features/users/category/category.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'products', component: UserListComponent },
      { path: 'products/new', component: UserFormComponent },
      { path: 'products/:id', component: UserDetailComponent },
      { path: 'products/:id/edit', component: UserFormComponent },
      {
        path: 'categories/new',
        component: CategoryComponent,
      },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
