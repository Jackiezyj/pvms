import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-login-label',
  templateUrl: './login-label.component.html',
  styleUrls: ['./login-label.component.less']
})
export class LoginLabelComponent implements OnInit {
  @ViewChild('loginCanvas', { static: true })
  loginCanvas!: ElementRef;
  // Declare height and width variables
  scrHeight: any;
  scrWidth: any;
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
     this.getScreenSize();
  }
  drawPrismatic() {
    const c = <HTMLCanvasElement>document.getElementById("loginCanvas");
    const ctx = <CanvasRenderingContext2D>c.getContext("2d");
    console.log('进来了');
    ctx.fillStyle = '#eefdfa';
    console.log(this.scrWidth/3);
    console.log(this.scrHeight/3);
    // ctx.fillRect(80, 70,80,5)
    const x = 150;
    const y = 150;
    ctx.moveTo(x, y);
    ctx.lineTo(x,y-5);
    ctx.lineTo(x+40.5,y-20);
    ctx.lineTo(x+40, y-15);
    ctx.lineTo(x, y);
    ctx.fill();
  }
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any) {
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;
    this.changeSize();
    this.drawPrismatic();
  }
  changeSize(){
    this.loginCanvas.nativeElement.style = `width: ${this.scrWidth/4}px;
                                              height:  ${this.scrHeight/4}px;
                                              `;
  }
}
