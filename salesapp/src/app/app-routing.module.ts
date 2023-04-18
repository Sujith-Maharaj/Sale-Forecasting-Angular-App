import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './components/home/home.component';
import { ViewComponent } from './components/subcomponents/view/view.component';
import { ErrorpageComponent } from './components/errorpage/errorpage.component';
import { FrontpageComponent } from './components/frontpage/frontpage.component';

const routes: Routes = [
  {
    path: "",
    component: FrontpageComponent
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: "main",
    component: MainComponent
  },
  {
    path: 'view',
    component: ViewComponent
  },
  {
    path: "**",
    component: ErrorpageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
