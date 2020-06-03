import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/guard';
import { LoginPageComponent } from './layout/core/login-page/login-page.component';
import { RegisterPageComponent } from './layout/core/register-page/register-page.component';
import { RegisterPurchaseItemComponent } from './layout/purchase-item/register-purchase-item/register-purchase-item.component';
import { ReadCategoryComponent } from './layout/category/read-category/read-category.component';
import { RegisterCategoryComponent } from './layout/category/register-category/register-category.component';
import { ReadStoreroomComponent } from './layout/storeroom/read-storeroom/read-storeroom.component';
import { RegisterStoreroomComponent } from './layout/storeroom/register-storeroom/register-storeroom.component';
import { ReadPurchaseItemComponent } from './layout/purchase-item/read-purchase-item/read-purchase-item.component'
import { FormPurchaseComponent } from './layout/purchase/form-purchase/form-purchase.component';
const routes: Routes = [
  {
    path:'',
    canActivate: [AuthGuard],
    children: [
      {
        path:'item',
        children: [
          {
            path: '',
            component: ReadPurchaseItemComponent
          },
          {
            path: 'cadastrar',
            children: [
            {
              path: '',
              component: RegisterPurchaseItemComponent
            },
            {
              path: ':id',
              component: RegisterPurchaseItemComponent
            }
            ]
          }
        ]
      },
      {
        path: 'categoria',
        children: [
          {
            path: '',
            component: ReadCategoryComponent
          },
          {
            path: 'cadastrar',
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
        ]
      },
      {
        path: 'despensa',
        children: [
          {
            path: '',
            component: ReadStoreroomComponent
          },
          {
            path: 'cadastrar',
            children: [
              {
                path: '',
                component: RegisterStoreroomComponent
              },
              {
                path: ':id',
                component: RegisterStoreroomComponent
              }
            ]
          }
        ]
      },
      {
        path: 'comprar',
        component: FormPurchaseComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'cadastrar',
    component: RegisterPageComponent
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
