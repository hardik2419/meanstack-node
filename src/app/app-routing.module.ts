import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guard/auth.guard';
import { UserComponent } from './user/user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { DetailsUserComponent } from './details-user/details-user.component';
const appRoutes: Routes = [
    {
      path: 'users',
      component: UserComponent,
      data: { title: 'user List' }
    },
    {
      path: 'user-details/:id',
      component: DetailsUserComponent,
      data: { title: 'user Details' }
    },
    {
      path: 'user-create',
      component: AddUserComponent,
      data: { title: 'Create user' }
    },
    {
      path: 'user-edit/:id',
      component: EditUserComponent,
      data: { title: 'Edit user' }
    },
    { path: '',
      redirectTo: '/users',
      pathMatch: 'full'
    }
  ];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule {}
