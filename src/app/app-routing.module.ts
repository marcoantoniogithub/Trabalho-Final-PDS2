import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JoinPageComponent } from './join-page/join-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthGuard } from './guards/guard';
import { TopoComponent } from './topo/topo.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { CategoriaPageComponent } from './categoria-page/categoria-page.component';

  const routes: Routes = [
    {
      path: 'login',
      component: LoginPageComponent,
    },
    
    {
      path: '',
      canActivate: [AuthGuard],
      children: [
        {
          path: 'home',
          component: HomePageComponent
        },
        {
          path: 'categoria',
          component: CategoriaPageComponent
        },
        {
          path: 'cadastrar-item',
          component: RegisterPageComponent
        },
        {
          path: 'cadastrar-categoria',
          component: RegisterPageComponent
        },
        {
          path: 'cadastro',
          children: [
            {
              path: '',
              component: JoinPageComponent
            },
            {
              path: ':id',
              component: JoinPageComponent
            }
          ]
        },
        {
          path: ':id',
          component: JoinPageComponent,
          pathMatch: 'full'
        }
      ]
    },
    { path: '**', redirectTo: '' },
  
  ];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
