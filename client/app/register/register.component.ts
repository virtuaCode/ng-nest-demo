import { Component, OnInit } from '@angular/core';
import { User } from "../user";
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { UserCreate } from "../user-create";
import { AuthService } from "../auth.service";
import { CustomValidators } from "../custom.validators";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  form: FormGroup;
  displayname: AbstractControl;
  username: AbstractControl;
  password: AbstractControl;

  alert: null | {type:string, message:string} = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      displayname: [
        "",
        [
          Validators.maxLength(25), 
          CustomValidators.notContains([" "])
        ]
      ],
      username: [
        "",
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(25),
          Validators.pattern(/^[a-z0-9]*$/i)
        ]
      ],
      password: [
        "",
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(64)
        ]
      ]
    });

    this.displayname = this.form.controls["displayname"];
    this.username = this.form.controls["username"];
    this.password = this.form.controls["password"];
  }

  public onSubmit({ value, valid }: { value: UserCreate, valid: boolean }) {
    this.alert = null;

    this.authService.register(value).subscribe(
      (res: boolean) => {
        if (res)
          this.router.navigate(["/"]);
      },
      async (err: Response) => {
        const error = await err.json();
        this.alert = {
          type:"danger",
          message: error.message
        }
      }
    );
  }
}
