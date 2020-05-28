import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule} from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './guards/guard';
import { ProductService } from './service/product.service';
import { HomePageComponent } from './layout/purchase-item/home-page/home-page.component';
import { LoginPageComponent } from './layout/core/login-page/login-page.component';
import { RodapeComponent } from './layout/core/rodape/rodape.component';
import { RegisterPageComponent } from './layout/core/register-page/register-page.component';
import { DespensaPageComponent } from './layout/storeroom/despensa-page/despensa-page.component';
import { NavBarComponent } from './layout/core/nav-bar/nav-bar.component';
import { RegisterPurchaseItemComponent } from './layout/purchase-item/register-purchase-item/register-purchase-item.component';
import { RegisterCategoryComponent } from './layout/category/register-category/register-category.component';
import { ReadCategoryComponent } from './layout/category/read-category/read-category.component';



@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginPageComponent,
    RodapeComponent,
    RegisterPageComponent,
    ReadCategoryComponent,
    DespensaPageComponent,
    NavBarComponent,
    RegisterPurchaseItemComponent,
    RegisterCategoryComponent,
    ReadCategoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatCheckboxModule,

    
  ],
  providers: [AuthGuard,
             ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
