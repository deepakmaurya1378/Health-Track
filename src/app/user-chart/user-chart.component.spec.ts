import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserChartComponent } from './user-chart.component';
import { NgChartsModule } from 'ng2-charts';
import { By } from '@angular/platform-browser';

describe('UserChartComponent', () => {
  let component: UserChartComponent;
  let fixture: ComponentFixture<UserChartComponent>;

  const mockUserData = [
    {
      id: 1,
      name: 'John',
      workouts: [
        { type: 'Running', minutes: 30 },
        { type: 'Cycling', minutes: 45 }
      ]
    },
    {
      id: 2,
      name: 'Jane',
      workouts: [
        { type: 'Swimming', minutes: 60 },
        { type: 'Yoga', minutes: 30 }
      ]
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserChartComponent, NgChartsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(UserChartComponent);
    component = fixture.componentInstance;
  });

  it('create', () => {
    expect(component).toBeTruthy();
  });

  it('initialize with data from localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockUserData));
    spyOn(component, 'updateChartData').and.callThrough();

    fixture.detectChanges();

    expect(component.userData).toEqual(mockUserData);
    expect(component.selectedUser).toEqual(mockUserData[0]);
    expect(component.updateChartData).toHaveBeenCalled();
    expect(component.chartData).toBeTruthy();
  });

  it('handle missing localStorage data', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(console, 'error');

    fixture.detectChanges(); 

    expect(console.error).toHaveBeenCalledWith('No user data found in localStorage');
    expect(component.userData).toEqual([]);
  });

  it('select user and update chart', () => {

    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockUserData));
    spyOn(component, 'updateChartData').and.callThrough();

    fixture.detectChanges();


    expect(component.selectedUser).toEqual(mockUserData[0]);

    component.selectUser(mockUserData[1]);
    expect(component.selectedUser).toEqual(mockUserData[1]);
    expect(component.updateChartData).toHaveBeenCalled();

    expect(component.chartData.labels).toEqual(['Swimming', 'Yoga']);
    expect(component.chartData.datasets[0].data).toEqual([60, 30]);
  });

  it('update chart data correctly', () => {
    component.userData = mockUserData;
    component.selectedUser = mockUserData[0];

    component.updateChartData();

    expect(component.chartData.labels).toEqual(['Running', 'Cycling']);
    expect(component.chartData.datasets[0].label).toBe("John's Workout Minutes");
    expect(component.chartData.datasets[0].data).toEqual([30, 45]);
    expect(component.chartOptions).toBeTruthy();
  });

  it('render user list and handle selection', () => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockUserData));
    fixture.detectChanges();

    const userItems = fixture.debugElement.queryAll(By.css('li'));
    expect(userItems.length).toBe(2);

    expect(userItems[0].nativeElement.classList).toContain('active');
    expect(userItems[1].nativeElement.classList).not.toContain('active');
    userItems[1].nativeElement.click();
    fixture.detectChanges();

    expect(component.selectedUser).toEqual(mockUserData[1]);
    expect(userItems[0].nativeElement.classList).not.toContain('active');
    expect(userItems[1].nativeElement.classList).toContain('active');
  });
});
