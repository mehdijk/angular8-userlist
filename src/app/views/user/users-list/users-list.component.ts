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
    this.getUserList();
  }

  getUserList(){
    this.service.getUserList().subscribe(res=>this.users=res)
  }

  addNewUser(user){
    this.service.addNew(user).subscribe(res=>this.getUserList())
  }

  delete(user:User){
    this.service.deleteUser(user).subscribe(res=>this.getUserList());
    
  }
}
