import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JoinPageComponent } from './join-page/join-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthGuard } from './guards/guard';
import { TopoComponent } from './topo/topo.component';
import { RegisterPageComponent } from './register-page/register-page.component';


/*const routes: Routes = [
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
    component: TopoComponent,
  },{
    path: 'home',
    children: [
      {
        path: '',
        component: HomePageComponent
      }
    ]
  },
  { path: '**', redirectTo: '' },

];
*/

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
