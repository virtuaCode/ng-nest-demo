import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms/forms";
import { AbstractControl } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Validators } from "@angular/forms";
import { LoginData } from "../login-data";
import { AuthService } from "../auth.service";
import { Router, ActivatedRoute } from "@angular/router";
import { IMessage } from "ng2-semantic-ui";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginError: any;
  form: FormGroup;
  username: AbstractControl;
  password: AbstractControl;
  redirectUrl: string;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit() {
    this.redirectUrl = this.route.snapshot.queryParams['redirect'] || '/';

    this.form = this.fb.group({
      username: [
        "",
        [
          Validators.required
        ]
      ],
      password: [
        "",
        [
          Validators.required
        ]
      ]
    });

    this.username = this.form.controls["username"];
    this.password = this.form.controls["password"];
  }

  onSubmit({ value, valid }: { value: LoginData, valid: boolean }) {
    this.loginError = null;

    this.authService.login(value).subscribe(
      (res: boolean) => {
        if (res)
          this.router.navigateByUrl(this.redirectUrl);
      },
      async (err: Response) => {this.password.reset(); this.loginError = await err.json();}
    );
  }
}
