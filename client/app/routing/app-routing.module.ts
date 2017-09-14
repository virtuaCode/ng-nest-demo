import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";

import { UserComponent } from "../users/user.component";
import { LoginComponent } from "../login/login.component";
import { RegisterComponent } from "../register/register.component";
import { AuthGuard } from "../auth-guard";
import { HomeComponent } from "../home/home.component";
import { LoggedInGuard } from "../loggedin-guard";
import { SettingsComponent } from "../settings/settings.component";
import { ProfileComponent } from "../profile/profile.component";
import { PicturesComponent } from "../pictures/pictures.component";


const ROUTES: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [LoggedInGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [LoggedInGuard] },
  { path: 'users', component: UserComponent, canActivate: [AuthGuard] },
  {
    path: 'settings', component: SettingsComponent, canActivate: [AuthGuard], children:
    [
      { path: '', redirectTo: '/settings/profile', pathMatch: 'full' },
      { path: 'profile', component: ProfileComponent },
      { path: 'pictures', component: PicturesComponent },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(ROUTES)
  ],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule { }
