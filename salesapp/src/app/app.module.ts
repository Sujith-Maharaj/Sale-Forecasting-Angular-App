import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './components/signup/signup.component';
import { AngularMaterialModule } from './angular.material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/subcomponents/about/about.component';
import { ContactComponent } from './components/subcomponents/contact/contact.component';
import { FooterComponent } from './components/subcomponents/footer/footer.component';
import { LandingpageComponent } from './components/subcomponents/landingpage/landingpage.component';
import { NavbarComponent } from './components/subcomponents/navbar/navbar.component';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { ViewComponent } from './components/subcomponents/view/view.component';
import { ErrorpageComponent } from './components/errorpage/errorpage.component';
import { FrontpageComponent } from './components/frontpage/frontpage.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    MainComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    FooterComponent,
    LandingpageComponent,
    NavbarComponent,
    ViewComponent,
    ErrorpageComponent,
    FrontpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxMatFileInputModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
