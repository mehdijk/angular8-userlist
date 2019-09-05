import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { debounceTime, concatMap, map } from 'rxjs/operators';
import { User } from '../user';
import { of, Observable } from 'rxjs';
import { Dog } from '../dog';


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

  id:string;
  dogs:Dog[]=new Array();
  allDogs:Dog[];

  userForm=this.fb.group({
    "name": ['',Validators.required],
    "age": [''],
    "sex": [''],
    "location": [''],
    "generalInfo": [''],
  })

  dogForm=this.fb.group({
    "id": [''],
  })

  
  public get name() {
    return this.userForm.get("name");
  }

  public get sex() {
    return this.userForm.get("sex"); 
  }
  
  public get age() {
    return this.userForm.get("age"); 
  }
  
  

  ngOnInit() {
    this.id=this.route.snapshot.params.id;
    if (this.id){
      this.loadDetail();
      this.userForm.valueChanges.pipe(
        debounceTime(500)
      ).subscribe(res=>{
        if (this.userForm.status=='INVALID') {
          this.userForm.markAllAsTouched();
          return ;
        }
        this.updateUser(res)
      })
    }
    this.service.getAllDogs().subscribe(dogs=>this.allDogs=dogs)
  }

  loadDetail(){
    this.service.getUserById(this.id).subscribe(user=>{
      this.userForm.patchValue(user);
      if(user.favoriteDogs) {
        user.favoriteDogs.forEach((id)=>this.service.getDogById(id)
        .subscribe(val=>this.dogs.push(val)));
      }
    })
  }

  addNew(){
    if (this.userForm.status=='INVALID') {
      this.userForm.markAllAsTouched();
      return ;
    }
    const user:User={...this.userForm.value, favoriteDogs:this.dogs.map(dog=>dog.id)};
    this.service.addNew(user).subscribe(res=>this.router.navigate(['users']));
  }

  updateUser(user:User){
    this.service.updateUser({...user,id:+this.id,favoriteDogs:this.dogs.map((x)=>x.id)})
    .subscribe(console.log);
  }

  getDogById(id:number):Observable<Dog>{
    return this.service.getDogById(id);
  }

  delete(dog:Dog){
    const index = this.dogs.indexOf(dog, 0);
    if (index > -1) {
    this.dogs.splice(index, 1);
    this.userForm.updateValueAndValidity();
    }
  }

  addNewfevDog(){
    const val=this.dogForm.value;
    if (val.id==='') return;
    if (this.dogs.filter(dog=>dog.id==val.id).length==0){
      this.dogs.push(this.allDogs.filter((dog)=>dog.id==val.id)[0]);
    }
    this.userForm.updateValueAndValidity();
  }

}
