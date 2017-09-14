import { Component, OnInit } from '@angular/core'

import { User } from '../user'
import { UserService } from "../user.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  users: User[];
  usersError: any;
  selectedUser: User;

  onSelect(user: User): void {
    this.selectedUser = user;
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(
      users => this.users = users,
      error => this.usersError = <any>error
    )
  }

  ngOnInit(): void {
    this.getUsers()
  }
}