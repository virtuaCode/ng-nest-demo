import { Component, OnInit } from '@angular/core';
import { ProfileData } from '../profile-data';
import { UserService } from '../user.service';
import { Profile } from '../profile';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  submitError: any;
  profile: Profile;

  form: FormGroup;
  displayname: AbstractControl;
  homepage: AbstractControl;
  luckynumber: AbstractControl;

  constructor(private userService: UserService, private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      displayname: ["", [Validators.maxLength(25)]],
      homepage: ["", [Validators.maxLength(25)]],
      luckynumber: ["", []],
    });

    this.displayname = this.form.controls["displayname"];
    this.homepage = this.form.controls["homepage"];
    this.luckynumber = this.form.controls["luckynumber"];

    this.userService.getProfile().toPromise()
      .then((res: Profile) => { this.profile = res; })
      .catch(async (err: Response) => { this.submitError = await err.json(); })

  }

  onSubmit({ value, valid }: { value: ProfileData, valid: boolean }) {
    this.submitError = null;

    this.userService.setProfile(value).subscribe(
      (res: Profile) => { this.profile = res; },
      async (err: Response) => { this.submitError = await err.json(); }
    );
  }
}
