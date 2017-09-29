import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {


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
