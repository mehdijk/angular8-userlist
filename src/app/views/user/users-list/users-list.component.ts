import { Component, OnInit, TemplateRef, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  users: User[];
  modalRef: BsModalRef;
  deleteUser: User;


  constructor(readonly service: UserService,
              readonly modalService: BsModalService,
              readonly changeDetection: ChangeDetectorRef) {}

  ngOnInit() {
    this.getUserList();
  }

  getUserList() {
    this.service.getUserList().subscribe(res => this.users = res);
  }

  addNewUser(user: User) {
    this.service.addNew(user).subscribe(res => this.getUserList());
  }

  delete(user: User, template: TemplateRef<any>) {
    this.deleteUser = user;
    this.modalRef = this.modalService.show(template);
  }

  ConfirmDelete() {
    this.modalRef.hide();
    this.service.deleteUser(this.deleteUser).subscribe(res => this.getUserList());
    this.deleteUser = undefined;
  }

}
