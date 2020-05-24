import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JoinPageComponent } from './join-page/join-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthGuard } from './guards/guard';
import { RegisterPageComponent } from './register-page/register-page.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'join',
    component: JoinPageComponent,
  },
  {
    path: '',
    canActivate: [AuthGuard],
    component: HomePageComponent,
  },
  {
    path: 'cadastrar-item',
    canActivate: [AuthGuard],
    component: RegisterPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
