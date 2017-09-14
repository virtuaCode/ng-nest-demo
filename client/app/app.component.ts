import { Component, OnInit } from '@angular/core'
import { AuthService } from "./auth.service";
import { Observable } from "rxjs/Observable";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  title = 'Users'

  isLoggedIn: Observable<boolean>;


  constructor(
    private authService: AuthService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.isLoggedIn = this.authService.loggedIn;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/"]);
  }
}