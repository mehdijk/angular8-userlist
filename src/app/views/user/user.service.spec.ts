import { TestBed  } from '@angular/core/testing';

import { UserService } from './user.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from './user';


describe('UserService testing', () => {
  let httpTestingController: HttpTestingController;
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        UserService
      ]
    });
    service = TestBed.get(UserService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  const testUsers: User[] = [{
    name: 'ben',
    id: 1,
    age: 39,
    sex: 'male',
    location: 'via foo',
    generalInfo: 'other info',
    favoriteDogs: [2, 4],
  },
  {
    name: 'eli',
    id: 2,
    age: 22,
    sex: 'female',
    location: 'via blabla',
    generalInfo: 'other info',
    favoriteDogs: [1],
  },
];

  it('can test getUserById', () => {
    service.getUserById('1').subscribe(user => {
      expect(user).toEqual(testUsers[0]);
    }, fail);
    const req = httpTestingController.expectOne(service.SERVER_URL + '/users/1');
    expect(req.request.method).toEqual('GET');
    req.flush(testUsers[0]);
  });

  it('can test getUserList', () => {
    service.getUserList().subscribe(users => {
      expect(users.length).toBe(2);
    }, fail);
    const req = httpTestingController.expectOne(service.SERVER_URL + '/users');
    expect(req.request.method).toEqual('GET');
    req.flush(testUsers);
  });


});
