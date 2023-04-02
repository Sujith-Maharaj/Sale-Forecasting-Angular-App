import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForecastComponent } from './components/forecast/forecast.component'
import { ErrorpageComponent } from './components/errorpage/errorpage.component';
import { NavbarComponent } from './components/navbar/navbar.component'
import { AngularMaterialModule } from "./angular.material.module"

@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    FileUploadComponent,
    LoginComponent,
    RegisterComponent,
    ErrorpageComponent,
    DashboardComponent,
    ForecastComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
