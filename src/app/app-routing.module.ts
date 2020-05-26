import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthGuard } from './guards/guard';
import { RegisterPageComponent } from './register-page/register-page.component';
import { CategoriaPageComponent } from './categoria-page/categoria-page.component';
import { ModalRegisterCategoryComponent } from './modal-register-category/modal-register-category.component';

  const routes: Routes = [
    {
      path: 'home',
      canActivate: [AuthGuard],
      component: HomePageComponent
    },
    {
      path: 'login',
      component: LoginPageComponent,
    },
    {
      path: 'register',
      component: RegisterPageComponent
    },
    {
      path: '',
      canActivate: [AuthGuard],
      children: [
        {
          path: 'categoria',
          component: CategoriaPageComponent
        },
        {
          path: 'cadastrar-item',
          component: ModalRegisterCategoryComponent
        },
        {
          path: 'cadastrar-categoria',
          component: ModalRegisterCategoryComponent
        },
        {
          path: 'cadastro',
          children: [
            {
              path: '',
              component: RegisterPageComponent
            },
            {
              path: ':id',
              component: RegisterPageComponent
            }
          ]
        },
        {
          path: ':id',
          component: RegisterPageComponent,
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
