import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ChangeDetectorRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./routing/app-routing.module";


import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';

import { SuiModule } from "ng2-semantic-ui";
import { HttpModule } from "@angular/http";
import { HttpClientModule } from '@angular/common/http';
import { UserComponent } from "./users/user.component";
import { UserService } from "./user.service";
import { LoginComponent } from './login/login.component';
import { AuthService } from "./auth.service";
import { AuthModule } from "./auth/auth.module";
import { AuthGuard } from "./auth-guard";
import { JwtHelper } from "angular2-jwt/angular2-jwt";
import { HomeComponent } from './home/home.component';
import { LoggedInGuard } from "./loggedin-guard";
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './profile/profile.component';
import { PicturesComponent } from './pictures/pictures.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    SettingsComponent,
    ProfileComponent,
    PicturesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    HttpModule,
    SuiModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    UserService,
    AuthService,
    AuthGuard,
    LoggedInGuard
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
