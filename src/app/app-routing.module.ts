import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/guard';
import { HomePageComponent } from './layout/purchase-item/home-page/home-page.component';
import { LoginPageComponent } from './layout/core/login-page/login-page.component';
import { RegisterPageComponent } from './layout/core/register-page/register-page.component';
import { RegisterPurchaseItemComponent } from './layout/purchase-item/register-purchase-item/register-purchase-item.component';
import { ReadCategoryComponent } from './layout/category/read-category/read-category.component';
import { RegisterCategoryComponent } from './layout/category/register-category/register-category.component';

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
      path: 'categoria',   
      canActivate: [AuthGuard],   
      children: [
            { 
              path:'',
              component: ReadCategoryComponent
            },
            {
              path:'cadastrar',
              children: [
                  {
                    path: '',
                    component: RegisterCategoryComponent
                  },
                  {
                    path: ':id',
                    component: RegisterCategoryComponent
                  }
                ]              
            }
    
       /* {
          path: 'cadastrar-item',
          component: RegisterPurchaseItemComponent
        },
        {
          path: 'cadastrar-categoria',
          component: RegisterPurchaseItemComponent
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
      */      
      ]
    },
    { path: '**', redirectTo: '' },
  ];

  
  
  



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
