import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AuthGuard } from './guards/guard';
import { ProductService } from './service/product.service';
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
import { ReadPurchaseItemComponent } from './layout/purchase-item/read-purchase-item/read-purchase-item.component';
import { ReadPurchaseComponent } from './layout/purchase/read-purchase/read-purchase.component';
import { CreatePurchaseComponent } from './layout/purchase/create-purchase/create-purchase.component';
import { BuyItensComponent } from './layout/purchase/buy-itens/buy-itens.component';
import { HistPurchaseComponent } from './layout/purchase/hist-purchase/hist-purchase.component';
import { ViewPurchaseComponent } from './layout/purchase/view-purchase/view-purchase.component';



@NgModule({
  declarations: [
    AppComponent,
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
    ReadPurchaseItemComponent,
    ReadPurchaseComponent,
    CreatePurchaseComponent,
    BuyItensComponent,
    HistPurchaseComponent,
    ViewPurchaseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,    
    LayoutModule,
    MaterialModule,    
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AuthGuard, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
