import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersDetailsComponent } from './users-details/users-details.component';

const routes: Routes = [
  {
    path: '',
    component: UsersListComponent,
    data: {
      title: 'All users'
    }
  },
  {
    path: ':id/detail',
    component: UsersDetailsComponent,
    data: {
      title: 'User detail'
    }
  },
  {
    path: 'new',
    component: UsersDetailsComponent,
    data: {
      title: 'New user'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
