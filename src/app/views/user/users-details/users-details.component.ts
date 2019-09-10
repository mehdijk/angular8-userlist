import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { debounceTime, concatMap, map, switchMap, tap, filter, mergeMap, toArray } from 'rxjs/operators';
import { User } from '../user';
import { Observable, of, forkJoin } from 'rxjs';
import { Dog } from '../dog';


@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.scss']
})
export class UsersDetailsComponent implements OnInit {
  id: string;
  dogs: Dog[] = new Array<Dog>();
  allDogs: Dog[];

  userForm = this.fb.group({
    name: ['', Validators.required],
    age: [''],
    sex: [''],
    location: [''],
    generalInfo: [''],
  });

  dogForm = this.fb.group({
    id: [''],
  });

  public get name() {
    return this.userForm.get('name');
  }

  public get sex() {
    return this.userForm.get('sex');
  }

  public get age() {
    return this.userForm.get('age');
  }

  constructor(readonly route: ActivatedRoute,
    readonly service: UserService,
    readonly fb: FormBuilder,
    readonly router: Router) { }

  ngOnInit() {
    // this.id = this.route.snapshot.params.id;
    this.route.paramMap.pipe(
      map(params => {
        this.id = params.get('id');
        return this.id;
      }),
      filter(id => Boolean(id)),
      switchMap(() => {
        return this.loadDetail().pipe(
          concatMap(details => {
            this.userForm.patchValue(details);
            return this.userForm.valueChanges.pipe(
              debounceTime(500),
              concatMap(user => this.updateUser({ ...user, id: +this.id, favoriteDogs: this.dogs.map((x) => x.id) }))
            );
          })
        );
      }),
    ).subscribe((user) => {
      this.userForm.patchValue(user, { emitEvent: false });
    });


    this.service.getAllDogs().subscribe(dogs => this.allDogs = dogs);
  }

  loadDetail(): Observable<User> {
    return this.service.getUserById(this.id).pipe(
      tap(user => {
        this.userForm.patchValue(user);
      }),
      concatMap(user => {
        return of(user).pipe(
          mergeMap(user => user.favoriteDogs),
          mergeMap(dogId => {
            return this.service.getDogById(dogId);
          }),
          toArray(),
          map(favoriteDogs => {
            this.dogs = favoriteDogs;
            return user;
          }),
        );
      }),
    );
  }

  addNew() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const user: User = { ...this.userForm.value, favoriteDogs: this.dogs.map(dog => dog.id) };
    this.service.addNew(user).subscribe(res => this.router.navigate(['users']));
  }

  updateUser(user: User): Observable<User> {
    if (this.userForm.status === 'INVALID') {
      this.userForm.markAllAsTouched();
      return of(user);
    } else {
      return this.service.updateUser(user);
    }
  }

  getDogById(id: number): Observable<Dog> {
    return this.service.getDogById(id);
  }

  delete(dog: Dog) {
    const index = this.dogs.indexOf(dog, 0);
    if (index > -1) {
      this.dogs.splice(index, 1);
      this.userForm.updateValueAndValidity();
    }
  }

  addNewfevDog() {
    const val = this.dogForm.value;
    if (val.id === '') { return; }
    if (this.dogs.filter(dog => dog.id === +val.id).length === 0) {
      this.dogs.push(this.allDogs.filter((dog) => dog.id === +val.id)[0]);
    }
    this.userForm.updateValueAndValidity();
  }

}
