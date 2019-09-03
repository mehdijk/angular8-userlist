import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.scss']
})
export class UsersDetailsComponent implements OnInit {

  constructor(readonly route:ActivatedRoute,
              readonly service:UserService,
              readonly fb:FormBuilder) { }

  userForm=this.fb.group({
    "name": [''],
    "age": [''],
    "sex": [''],
    "location": [''],
    "generalInfo": [''],
  })

  ngOnInit() {
    const id=this.route.snapshot.params.id;
    this.service.getUserById(id).subscribe(res=>this.userForm.patchValue(res))
  }

}
