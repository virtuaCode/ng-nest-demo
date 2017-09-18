import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Profile } from '../profile';
import { AuthService } from '../auth.service';
import { CustomValidators } from "../custom.validators";
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { ProfileData } from '../profile-data';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  submitError: any;
  apiError: any;
  profile: Profile;

  form: FormGroup;
  displayname: AbstractControl;
  homepage: AbstractControl;
  luckynumber: AbstractControl;

  saved: boolean = false;

  constructor(private userService: UserService, private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      displayname: ["", [Validators.maxLength(25), CustomValidators.notContains([" "])]],
      homepage: ["", [Validators.maxLength(25), CustomValidators.isUrl({})]],
      luckynumber: ["", [CustomValidators.isInt(), CustomValidators.range(-100000, 100000)]],
    });

    this.displayname = this.form.controls["displayname"];
    this.homepage = this.form.controls["homepage"];
    this.luckynumber = this.form.controls["luckynumber"];

    this.userService.getProfile().toPromise()
      .then((res: Profile) => {
        this.profile = res;
      })
      .catch(async (err: Response) => {
        this.apiError = await err.json();
      })

  }

  onSubmit({ value, valid }: { value: ProfileData, valid: boolean }) {
    this.submitError = null;
    this.saved = false;

    this.userService.setProfile(value).subscribe(
      (res: Profile) => {
        this.form.markAsPristine();
        this.form.markAsUntouched();
        this.profile = res;
        this.saved = true;
      },
      async (err: Response) => {
        this.submitError = await err.json();
      }
    );
  }
}
