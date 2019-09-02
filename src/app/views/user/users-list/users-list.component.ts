import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  users:User[];

  constructor(readonly service:UserService) {}

  ngOnInit() {
    this.service.getUserList().subscribe(res=>this.users=res)
  }

}
