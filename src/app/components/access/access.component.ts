import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ScrStyleService } from 'src/app/servies/scr-style.service';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.less']
})
export class AccessComponent implements OnInit {
  @ViewChild('leftMenu', { static: true })
  leftMenu!: ElementRef;
  @ViewChild('carsButton', { static: true })
  carsButton!: ElementRef;
  @ViewChild('usersButton', { static: true })
  usersButton!: ElementRef;
  @ViewChild('rightBoard', { static: true })
  rightBoard!: ElementRef;
  constructor(
    private scrStyleService: ScrStyleService,
    private homeComponent: HomeComponent,
    private router: Router,
  ) { }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getScreenSize();
  }
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any) {
    this.scrStyleService.getScreenSize();
      this.changeSize();

  }
  changeSize() {
    this.homeComponent.changeCommontStyle(this.leftMenu, 164, 980, 0, 0, 100, 0);
    this.homeComponent.changeCommontStyle(this.carsButton, 164, 45, 0, 10, 0, 18);
    this.homeComponent.changeCommontStyle(this.usersButton, 164, 45, 0, 10, 142, 18);
    this.homeComponent.changeCommontStyle(this.rightBoard, 1756, 980, 164, 0, 100, 0);
  }
  clickButton(event: string) {
    if (event === 'cars') {
      this.router.navigateByUrl("/home/access/cars");
    } else if (event === 'users') {
      this.router.navigateByUrl("/home/access/users");
    }
  }
}
