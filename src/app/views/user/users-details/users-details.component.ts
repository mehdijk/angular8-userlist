import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { User } from '../user';


@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.scss']
})
export class UsersDetailsComponent implements OnInit {

  constructor(readonly route:ActivatedRoute,
              readonly service:UserService,
              readonly fb:FormBuilder,
              readonly router:Router) { }

  id:string

  userForm=this.fb.group({
    "name": [''],
    "age": [''],
    "sex": [''],
    "location": [''],
    "generalInfo": [''],
  })

  ngOnInit() {
    this.id=this.route.snapshot.params.id;
    if (this.id){
      this.loadDetail();
      this.userForm.valueChanges.pipe(
        debounceTime(500)
      ).subscribe(res=>this.updateUser(res))
    }
  }

  loadDetail(){
    this.service.getUserById(this.id).subscribe(res=>this.userForm.patchValue(res))
  }

  addNew(){
    const user:User=this.userForm.value;
    this.service.addNew(user).subscribe(res=>this.router.navigate(['users']));
  }

  updateUser(user:User){
    this.service.updateUser({...user,id:+this.id}).subscribe(res=>console.log(res))
  }

}
