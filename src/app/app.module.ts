import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthGuard } from './guards/guard';
import { ProductService } from './service/product.service';
import { HomePageComponent } from './layout/purchase-item/home-page/home-page.component';
import { LoginPageComponent } from './layout/core/login-page/login-page.component';
import { RodapeComponent } from './layout/core/rodape/rodape.component';
import { RegisterPageComponent } from './layout/core/register-page/register-page.component';
import { NavBarComponent } from './layout/core/nav-bar/nav-bar.component';
import { RegisterPurchaseItemComponent } from './layout/purchase-item/register-purchase-item/register-purchase-item.component';
import { RegisterCategoryComponent } from './layout/category/register-category/register-category.component';
import { ReadCategoryComponent } from './layout/category/read-category/read-category.component';
import { MaterialModule } from './layout/core/material/material.module';
import { ReadStoreroomComponent } from './layout/storeroom/read-storeroom/read-storeroom.component';
import { RegisterStoreroomComponent } from './layout/storeroom/register-storeroom/register-storeroom.component';
import { LoaderComponent } from './layout/core/loader/loader.component';



@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginPageComponent,
    RodapeComponent,
    RegisterPageComponent,
    ReadCategoryComponent,
    NavBarComponent,
    RegisterPurchaseItemComponent,
    RegisterCategoryComponent,
    ReadCategoryComponent,
    ReadStoreroomComponent,
    RegisterStoreroomComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,    
    LayoutModule,
    MaterialModule,    
    ReactiveFormsModule,
    HttpClientModule,
    
  ],
  providers: [AuthGuard, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
