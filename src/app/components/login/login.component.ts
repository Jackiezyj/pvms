import { Component, ElementRef, HostListener, OnInit, ViewChild, ViewChildren, AfterViewInit } from '@angular/core';
// import * as sreenSite from '../utilities/sreenSite';
import { FormBuilder } from '@angular/forms'
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { ScrStyleService } from 'src/app/servies/scr-style.service';
import { LoginGuard } from 'src/app/utilities/login.guard';
import { AppState } from 'src/app/utilities/ngrxStore/state';
import { HomeComponent } from '../home/home.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})


export class LoginComponent implements OnInit, AfterViewInit {
  todolist: any;
  checkoutForm = this.formBuilder.group({
    employeeID: '',
    possword: ''
  });
  c: any;
  ctx: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store<AppState>,
    private scrStyleService: ScrStyleService,
    private loginGuard: LoginGuard,
    private homeComponent: HomeComponent
  ) {
    var streamto = store.pipe(select('todos'));
    streamto.subscribe((res) => {
      this.todolist = res;
    })
  }

  @ViewChild('backdiv', { static: true })
  backdiv!: ElementRef;
  @ViewChild('login', { static: true })
  login!: ElementRef;
  @ViewChild('titleText', { static: true })
  titleText!: ElementRef;
  @ViewChild('employeeID', { static: true })
  employeeID!: ElementRef;
  @ViewChild('possword', { static: true })
  possword!: ElementRef;
  @ViewChild('employeeIDLebal', { static: true })
  employeeIDLebal!: ElementRef;
  @ViewChild('posswordLebal', { static: true })
  posswordLebal!: ElementRef;
  @ViewChild('loginButton', { static: true })
  loginButton!: ElementRef;
  @ViewChild('formTitle', { static: true })
  formTitle!: ElementRef;
  @ViewChild('label', { static: true })
  label!: ElementRef;
  @ViewChild('backdivTitle', { static: true })
  backdivTitle!: ElementRef;
  ngOnInit(): void {
    this.getScreenSize();
    this.checkoutForm.setValue({
      employeeID: 'Admin',
      possword: 'Admin'
    });
  }
  ngAfterViewInit(): void {
    this.initCanvas();
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any) {
    this.scrStyleService.getScreenSize();
    this.changeSize();
    this.drawRec();
  }
  initCanvas() {
    this.c = <HTMLCanvasElement>document.getElementById("loginCanvas");
    this.ctx = <CanvasRenderingContext2D>this.c.getContext("2d");
    this.drawRec();
  }
  drawRec() {
    if (this.ctx != undefined) {
      this.ctx.clearRect(0, 0, this.c.width, this.c.height);
      this.ctx.shadowOffsetX = 0;
      this.ctx.shadowOffsetY = 0;
      this.ctx.shadowBlur = 0;
      const x = 150;
      const y = 150;
      //画最下层棱形立方体
      this.drawPrismatic(x, y, 130, 10, 0, 0, false, '#ffffff', '#f1f1f1');
      //画柱子1
      this.drawCylinder(x, y, 1, 20.5);
      //画柱子2
      this.drawCylinder(x, y, -107, 50);
      //画柱子3
      this.drawCylinder(x, y, 120, 51);
      this.ctx.beginPath();
      this.ctx.strokeStyle = "#d9dbdc";
      this.ctx.moveTo(x, y - 27);
      this.ctx.lineTo(x + 88, y - 52);
      this.ctx.lineTo(x - 25, y - 78);
      this.ctx.lineTo(x - 105.6, y - 53);
      this.ctx.lineTo(x, y - 27);
      this.ctx.closePath();
      this.ctx.stroke();
      //画最中间层棱形立方体
      this.drawPrismatic(x, y - 33, 80, 3, 5, 0, false, '#ffffff', '#f1f1f1');
      //画立方体
      this.drawCude(x, y);
      //画最顶层棱形立方体
      this.drawPrismatic(x, y - 81, 20, 4, 5, 5, false, '#d6ebfa', '#e8f1f8');
      //顶部的白色饼图
      this.drawSector(x - 11, y - 118, 28, 180, 270, '#ffffff', '#ffffff');
      this.drawSector(x, y - 118.5, 28, 180, 270, '#ffffff', '#ffffff');
      this.drawRect(x - 11, y - 146.8, 15, 29.5, '#e6e5e5');
      //顶部的蓝色饼图
      this.drawSector(x + 10, y - 115, 25, 270, 120, '#5fafe8', '#0096ff');
      this.drawRect(x - 5, y - 140, 15, 51, '#5fafe8');
      this.drawSector(x - 5, y - 115, 25, 270, 180, '#5fafe8', '#0096ff');
    }
  }
  drawRect(x: any, y: any, width: any, height: any, fillStyle: any,) {
    this.ctx.save();
    this.ctx.fillStyle = fillStyle;
    this.ctx.beginPath();
    this.ctx.fillRect(x, y, width, height);
    this.ctx.fill();
    this.ctx.restore();
  }
  drawSector(x: any, y: any, r: any, angle1: any, angle2: any, fillStyle: any, strokeStyle: any) {
    this.ctx.fillStyle = fillStyle;
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.arc(x, y, r, angle1 * Math.PI / 180, angle2 * Math.PI / 180, false);
    this.ctx.closePath();
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = strokeStyle;
    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.restore();
  }
  drawCude(x: any, y: any) {
    this.ctx.beginPath();
    // 设置左上方的阴影
    this.ctx.shadowOffsetX = 1;
    this.ctx.shadowOffsetY = 3;
    this.ctx.shadowColor = "#055c9a";
    this.ctx.shadowBlur = 6;
    this.ctx.moveTo(x - 66, y - 60);
    this.ctx.lineTo(x, y - 45);
    this.ctx.lineTo(x + 66, y - 60);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 0;
    this.ctx.shadowBlur = 0;
    this.ctx.fillStyle = '#f0f9fb';
    this.ctx.beginPath();
    this.ctx.moveTo(x, y - 45);
    this.ctx.lineTo(x + 66, y - 60);
    this.ctx.lineTo(x + 66, y - 87);
    this.ctx.lineTo(x, y - 77);
    this.ctx.lineTo(x - 66, y - 87);
    this.ctx.lineTo(x - 66, y - 60);
    this.ctx.closePath();
    this.ctx.lineWidth = 3;
    this.ctx.strokeStyle = "#ffffff";
    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 0;
    this.ctx.shadowBlur = 0;
    this.ctx.fillStyle = '#f0f9fb';
    this.ctx.beginPath();
    this.ctx.moveTo(x, y - 77);
    this.ctx.lineTo(x + 60, y - 88.5);
    this.ctx.lineTo(x, y - 96);
    this.ctx.lineTo(x - 60, y - 88.5);
    this.ctx.closePath();
    this.ctx.lineWidth = 3;
    this.ctx.strokeStyle = "#ffffff";
    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 0;
    this.ctx.shadowBlur = 0;
    this.ctx.lineWidth = 0.5;
  }
  drawPrismatic(x: any, y: any, dX: any, dY: any, space: number, space2: number, isgrd: boolean, borderColor: string, faceColor: string) {
    this.ctx.fillStyle = borderColor;
    this.ctx.beginPath();//新建一条canvas线条，与之前画的线没有关联，可以从新设置新的线的样式  3 5 80
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x, y - dY);
    this.ctx.lineTo(x + (dX + space + space2 * 5), y - (dY + 40 - space * 3.5 - space2 * 3.2));
    this.ctx.lineTo(x + (dX - 3 + space * 1.5 + space2 * 5), y - (dY + 30 - space * 2 - space2 * 3.2));
    this.ctx.lineTo(x, y);
    this.ctx.lineTo(x, y - dY);
    this.ctx.lineTo(x - (dX + 15 + space * 3 + space2 * 0.1), y - (dY + 40 - space * 3 - space2 * 3.5));
    this.ctx.lineTo(x - (dX + 12 + space * 3 + space2 * 0.1), y - (dY + 30 - space * 1.7 - space2 * 3.5));
    this.ctx.fill();
    this.ctx.closePath();//让canva自动将画的线闭合
    // const grd = this.ctx.createRadialGradient(155, 40, 5, 150, 60, 110);
    // grd.addColorStop(0, "#a2a5a4");
    // grd.addColorStop(1, "#ffffff");
    // this.ctx.fillStyle = '#ebe7e7';
    if (isgrd) {
      //createRadialGradient(x1, y1, r1, x2, y2, r2)
      // x1 y1 表示渐变开始的圆心坐标，r1 表示渐变开始时圆的半径。
      // x2 y2表示渐变结束的圆心坐标，r2表示渐变结束时圆的半径。
      const grd = this.ctx.createRadialGradient(x, y - 20, 88, x, y - 110, 18);
      grd.addColorStop(0, "#ffffff");
      grd.addColorStop(1, "#055c9a");//#055c9a
      this.ctx.fillStyle = grd;
    } else {
      this.ctx.fillStyle = faceColor;
    }
    this.ctx.beginPath();
    this.ctx.moveTo(x, y - (dY - 0.7));
    this.ctx.lineTo(x + (dX + 0.6 + space + space2 * 5), y - (dY + 39.3 - space * 3.5 - space2 * 3.2));
    this.ctx.lineTo(x - (dX - 113 + space * 10 + space2 * 7.5), y - (dY + 75 - space * 5.4 - space2 * 7));
    this.ctx.lineTo(x - (dX + 15.6 + space * 3.2 + space2 * 0.1), y - (dY + 39.3 - space * 3 - space2 * 3.5));
    this.ctx.lineTo(x, y - (dY - 0.7));
    this.ctx.closePath();
    this.ctx.fill();
  }
  drawCylinder(x: any, y: any, dX: any, dY: any) {
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 0;
    this.ctx.shadowBlur = 0;
    this.ctx.lineWidth = 0.5;
    this.ctx.beginPath();
    this.ctx.fillStyle = '#8ed5f1';
    this.ctx.ellipse(x - dX, y - dY, 7, 2, 0, 0, Math.PI * 2);
    this.ctx.strokeStyle = "#0096ff";
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.fillRect(x - (dX + 7.5), y - (dY + 2.5), 15, 2.5);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.ellipse(x - dX, y - (dY + 2.5), 7, 2, 0, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();
  }
  changeSize() {
    this.backdiv.nativeElement.style = `width: 100%;
                                          height:  ${this.scrStyleService.getActHeightSize(402)}px;
                                          margin: ${this.scrStyleService.getActWidthSize(359)}px auto;
                                          `;
    this.homeComponent.changeCommontStyle(this.login,798,694,960,0,253,72);
    this.titleText.nativeElement.style = `width: ${this.scrStyleService.getActWidthSize(798)}px;
                                          height:  ${this.scrStyleService.getActHeightSize(20)}px;
                                          left: ${this.scrStyleService.getActWidthSize(960)}px;
                                          line-height: ${this.scrStyleService.getActHeightSize(20)}px;
                                          top: ${this.scrStyleService.getActHeightSize(168)}px;
                                          font-size: ${this.scrStyleService.getActWidthSize(72)}px;
                                          `;

    this.employeeID.nativeElement.style = `width: ${this.scrStyleService.getActWidthSize(591)}px;
                                          height:  ${this.scrStyleService.getActHeightSize(44)}px;
                                          left: ${this.scrStyleService.getActWidthSize(97)}px;
                                          top: ${this.scrStyleService.getActHeightSize(503 - 253)}px;
                                          `;
    this.possword.nativeElement.style = `width: ${this.scrStyleService.getActWidthSize(591)}px;
                                              height:  ${this.scrStyleService.getActHeightSize(44)}px;
                                              left: ${this.scrStyleService.getActWidthSize(97)}px;
                                              top: ${this.scrStyleService.getActHeightSize(626 - 253)}px;
                                              `;
    this.employeeIDLebal.nativeElement.style = `width: ${this.scrStyleService.getActWidthSize(96)}px;
                                              height:  ${this.scrStyleService.getActHeightSize(39)}px;
                                              left: ${this.scrStyleService.getActWidthSize(97)}px;
                                              font-size: ${this.scrStyleService.getActWidthSize(28)}px;
                                              top: ${this.scrStyleService.getActHeightSize(444 - 253)}px;
                                              `;
    this.posswordLebal.nativeElement.style = `width: ${this.scrStyleService.getActWidthSize(96)}px;
                                              height:  ${this.scrStyleService.getActHeightSize(39)}px;
                                              left: ${this.scrStyleService.getActWidthSize(97)}px;
                                              font-size: ${this.scrStyleService.getActWidthSize(28)}px;
                                              top: ${this.scrStyleService.getActHeightSize(567 - 253)}px;
                                              `;
    this.loginButton.nativeElement.style = `width: ${this.scrStyleService.getActWidthSize(591)}px;
                                              height:  ${this.scrStyleService.getActHeightSize(60)}px;
                                              left: ${this.scrStyleService.getActWidthSize(97)}px;
                                              font-size: ${this.scrStyleService.getActWidthSize(28)}px;
                                              top: ${this.scrStyleService.getActHeightSize(771 - 253)}px;
                                              line-height: 20px;
                                              `;
    this.formTitle.nativeElement.style = `width: ${this.scrStyleService.getActWidthSize(129)}px;
                                              height:  ${this.scrStyleService.getActHeightSize(50)}px;
                                              left: ${this.scrStyleService.getActWidthSize(97)}px;
                                              font-size: ${this.scrStyleService.getActWidthSize(60)}px;
                                              top: ${this.scrStyleService.getActHeightSize(335 - 253)}px;
                                              line-height: ${this.scrStyleService.getActWidthSize(50)}px;
                                              `;
    this.label.nativeElement.style = `width: ${this.scrStyleService.getActWidthSize(742)}px;
                                              height:  ${this.scrStyleService.getActHeightSize(812)}px;
                                              left: ${this.scrStyleService.getActWidthSize(120)}px;
                                              top: ${this.scrStyleService.getActHeightSize(200)}px;
                                              `;
    this.backdivTitle.nativeElement.style = `font-size: ${this.scrStyleService.getActWidthSize(42)}px;
                                              line-height:${this.scrStyleService.getActWidthSize(20)}px;;
                                              `;
  }
  onLogin() {
    // const json = {userName:this.checkoutForm.value.employeeID};
    // this.local.setObject(`${this.checkoutForm.value.employeeID}`,json);
    let flag = true;
    for (let item of this.todolist) {
      if (this.checkoutForm.value.employeeID === item.employeeID) {
        this.updateUser();
        flag = false;
        break;
      } else {

      }
    }
    if (flag) {
      this.addUser();
      console.log('添加用户');
    }
    //登录验证成功
    this.loginGuard.loggedIn = true;
    this.router.navigateByUrl("/home/situation");

  }
  addUser() {
    this.store.dispatch({
      type: 'ADDSTATE',
      payload: { employeeID: `${this.checkoutForm.value.employeeID}`, name: `${this.checkoutForm.value.employeeID}`, isAuthentication: true }
    })
  }
  updateUser() {
    this.store.dispatch({
      type: 'UPDATESTATE',
      payload: { employeeID: `${this.checkoutForm.value.employeeID}`, name: `${this.checkoutForm.value.employeeID}`, isAuthentication: true }
    })
  }


}
