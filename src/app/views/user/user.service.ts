import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  SERVER_URL='http://localhost:3000'

  constructor(readonly http:HttpClient) { }

  getUserList():Observable<User[]>{
    return this.http.get<User[]>(this.SERVER_URL+"/users");
  }

  getUserById(id:string):Observable<User>{
    return this.http.get<User>(this.SERVER_URL+"/users/"+id)
  }

  addNew(user:User):Observable<any>{
    return this.http.post(this.SERVER_URL+"/users",user);
  }

  updateUser(user:User):Observable<any>{
    return this.http.patch(this.SERVER_URL+"/users/"+user.id,user);
  }
 
}
