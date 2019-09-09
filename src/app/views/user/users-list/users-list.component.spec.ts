import { async, ComponentFixture, TestBed, tick, fakeAsync, flush } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UsersListComponent } from './users-list.component';
import { UserService } from '../user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { User } from '../user';
import { By } from '@angular/platform-browser';

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;
  let modalService: BsModalService;
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
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, ModalModule.forRoot()],
      declarations: [ UsersListComponent],
      providers: [UserService, BsModalService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    modalService = TestBed.get(BsModalService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('user list table', () => {
    component.users = testUsers;
    fixture.detectChanges();
    const table: HTMLElement = fixture.nativeElement.querySelector('tbody');
    const rows: NodeListOf<HTMLTableRowElement> = table.querySelectorAll('tr');
    expect(rows.length).toBe(2);
    rows.forEach((row , i) => {
      expect(row.querySelector('td').textContent).toEqual(testUsers[i].name);
    });
  });

  it('modal should be appear when delete button is clicked', fakeAsync(() => {
    component.users = testUsers;
    fixture.detectChanges();
    expect(component.modalRef).toBeUndefined();
    const button: HTMLElement = fixture.nativeElement.querySelector('.btn-danger');
    button.dispatchEvent(new Event('click', null));
    tick(1000);
    fixture.detectChanges();
    expect(component.modalRef).not.toBeUndefined();
    component.modalRef.hide();
    tick(1000);
    }));

});
