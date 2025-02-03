import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { By } from '@angular/platform-browser';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  const mockUsers = [
    {id: 1, name: 'John Doe',workouts: [
        { type: 'Running', minutes: 30 },
        { type: 'Cycling', minutes: 45 }
      ]},
    {id: 2,name: 'Jane Smith',
      workouts: [
        { type: 'Swimming', minutes: 60 },
        { type: 'Running', minutes: 20 }
      ]}
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;

    // Mock localStorage
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockUsers));
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('create', () => {
    expect(component).toBeTruthy();
  });

  it('initialize with data from localStorage', () => {
    expect(component.users).toEqual(mockUsers);
    expect(localStorage.getItem).toHaveBeenCalledWith('workoutData');
  });

  it('filter users by name', () => {
    component.searchName = 'john';
    fixture.detectChanges();

    expect(component.filteredUsers.length).toBe(1);
    expect(component.filteredUsers[0].name).toBe('John Doe');
  });

  it('filter users by workout type', () => {
    component.selectedWorkoutType = 'Swimming';
    fixture.detectChanges();

    expect(component.filteredUsers.length).toBe(1);
    expect(component.filteredUsers[0].name).toBe('Jane Smith');
  });

  it('paginate users correctly', () => {
    component.pageSize = 1;
    component.page = 1;
    fixture.detectChanges();

    expect(component.paginatedUsers.length).toBe(1);
    expect(component.paginatedUsers[0].name).toBe('John Doe');


    component.onPageChange(2);
    fixture.detectChanges();
    expect(component.paginatedUsers[0].name).toBe('Jane Smith');
  });

  it('update pagination controls correctly', () => {
    component.pageSize = 1;
    fixture.detectChanges();

    const prevButton = fixture.debugElement.query(By.css('button:first-child'));
    const nextButton = fixture.debugElement.query(By.css('button:last-child'));
    expect(prevButton.nativeElement.disabled).toBeTrue();
    expect(nextButton.nativeElement.disabled).toBeFalse();


    component.onPageChange(2);
    fixture.detectChanges();
    expect(prevButton.nativeElement.disabled).toBeFalse();
    expect(nextButton.nativeElement.disabled).toBeTrue();
  });

  it('show no users message when filtered results are empty', () => {
    component.searchName = 'Non-existent User';
    fixture.detectChanges();

    const noUsersMessage = fixture.debugElement.query(By.css('p'));
    expect(noUsersMessage.nativeElement.textContent).toContain('No users found');
  });

  it('handle page change correctly', () => {
    spyOn(component, 'onPageChange').and.callThrough();
    const buttons = fixture.debugElement.queryAll(By.css('button'));


    buttons[1].nativeElement.click();
    fixture.detectChanges();
    expect(component.onPageChange).toHaveBeenCalledWith(2);


    buttons[0].nativeElement.click();
    fixture.detectChanges();
    expect(component.onPageChange).toHaveBeenCalledWith(1);
  });

  it('initialize workout types correctly', () => {
    expect(component.workoutTypes).toEqual([
      'Running', 'Cycling', 'Swimming', 'Yoga', 'Other'
    ]);
  });

  it('render user cards correctly', () => {
    const userCards = fixture.debugElement.queryAll(By.css('.user-card'));
    expect(userCards.length).toBe(2);

    const firstUserWorkouts = userCards[0].queryAll(By.css('li'));
    expect(firstUserWorkouts.length).toBe(2);
    expect(firstUserWorkouts[0].nativeElement.textContent).toContain('Running for 30 minutes');
  });

  it('handle empty localStorage initialization', () => {
    localStorage.getItem = jasmine.createSpy().and.returnValue(null);
    component.ngOnInit();

    expect(component.users).toEqual([]);
  });

  it('update filters and pagination when data changes', fakeAsync(() => {

    expect(component.filteredUsers.length).toBe(2);

    component.users.push({
      id: 3,
      name: 'New User',
      workouts: [{ type: 'Yoga', minutes: 30 }]
    });

    fixture.detectChanges();
    tick();

    expect(component.filteredUsers.length).toBe(3);
    expect(component.paginatedUsers.length).toBe(component.pageSize);
  }));
});
