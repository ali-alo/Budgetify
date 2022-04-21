import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './accounts/accounts.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginFormComponent } from './auth/login-form/login-form.component';
import { CategoriesComponent } from './categories/categories.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { StatisticsComponent } from './statistics/statistics.component';

const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'accounts', component: AccountsComponent, canActivate: [AuthGuard] },
  {
    path: 'categories',
    component: CategoriesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'statistics',
    component: StatisticsComponent,
    canActivate: [AuthGuard],
  },
  { path: '', pathMatch: 'full', redirectTo: 'accounts' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
