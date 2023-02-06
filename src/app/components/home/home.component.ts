import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ScrStyleService } from 'src/app/servies/scr-style.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  date = '';
  @ViewChild('header', { static: true })
  header!: ElementRef;
  @ViewChild('systemName', { static: true })
  systemName!: ElementRef;
  @ViewChild('systemDate', { static: true })
  systemDate!: ElementRef;
  @ViewChild('Admin', { static: true })
  Admin!: ElementRef;
  @ViewChild('situation', { static: true })
  situation!: ElementRef;
  @ViewChild('access', { static: true })
  access!: ElementRef;
  @ViewChild('monitor', { static: true })
  monitor!: ElementRef;
  @ViewChild('power', { static: true })
  power!: ElementRef;
  @ViewChild('congigure', { static: true })
  congigure!: ElementRef;
  constructor(
    private scrStyleService: ScrStyleService
  ) { }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getScreenSize();
    setInterval(() => {
      const d = new Date();
      this.date = d.getFullYear() + "-" + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + (d.getHours() < 10 ? ('0' + d.getHours()) : d.getHours()) + ':' + (d.getMinutes() < 10 ? ('0' + d.getMinutes()) : d.getMinutes());

    }, 1000)
  }
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any) {
    this.scrStyleService.getScreenSize();
    this.changeSize();

  }
  changeSize() {
    this.header.nativeElement.style = `height:  ${this.scrStyleService.getActHeightSize(100)}px;width: ${this.scrStyleService.getActWidthSize(1920)}px;`;
    this.changeCommontStyle(this.systemName, 368, 20, 55, 33, 40, 20);
    this.changeCommontStyle(this.systemDate, 158, 35, 1557, 17, 40, 20);
    this.changeCommontStyle(this.Admin, 64, 35, 1785, 17, 40, 20);
    this.changeCommontStyle(this.situation, 80, 20, 606, 20, 40, 20);
    this.changeCommontStyle(this.access, 80, 20, 726, 20, 40, 20);
    this.changeCommontStyle(this.monitor, 80, 20, 846, 20, 40, 20);
    this.changeCommontStyle(this.power, 80, 20, 966, 20, 40, 20);
    this.changeCommontStyle(this.congigure, 80, 20, 1076, 20, 40, 20);
  }
  changeCommontStyle(view: any, width: number, height: number, left: number, fontSize: number, top: number, lineHeight: number, color?: string, background?: string) {
    let actView: any;
    let flag = false;
    if (view instanceof HTMLElement) {
      actView = view;
      flag = true;
    } else if (view instanceof ElementRef) {
      actView = view.nativeElement;
      flag = true;
    } else {
    }
    if (flag) {
      actView.style = `width: ${this.scrStyleService.getActWidthSize(width)}px;
      height:  ${this.scrStyleService.getActHeightSize(height)}px;
      left: ${this.scrStyleService.getActWidthSize(left)}px;
      font-size: ${this.scrStyleService.getActWidthSize(fontSize)}px;
      top: ${this.scrStyleService.getActHeightSize(top)}px;
      line-height: ${this.scrStyleService.getActWidthSize(lineHeight)}px;
      color: ${color};
      background: ${background};
      `;
    }

  }

}
