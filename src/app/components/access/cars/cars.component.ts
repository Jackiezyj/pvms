import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import { Cars } from 'src/app/models/cars';
import { ScrStyleService } from 'src/app/servies/scr-style.service';
import { HomeComponent } from '../../home/home.component';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.less']
})
export class CarsComponent implements OnInit {
  @ViewChild('title', { static: true })
  title!: ElementRef;
  @ViewChild('titleBackgroud', { static: true })
  titleBackgroud!: ElementRef;
  @ViewChild('todayInSum', { static: true })
  todayInSum!: ElementRef;
  @ViewChild('todayOutSum', { static: true })
  todayOutSum!: ElementRef;
  @ViewChild('focusOut_VehicleSum', { static: true })
  focusOut_VehicleSum!: ElementRef;
  @ViewChild('recordsSum', { static: true })
  recordsSum!: ElementRef;
  @ViewChild('todayInSumText', { static: true })
  todayInSumText!: ElementRef;
  @ViewChild('todayOutSumText', { static: true })
  todayOutSumText!: ElementRef;
  @ViewChild('focusOut_VehicleSumText', { static: true })
  focusOut_VehicleSumText!: ElementRef;
  @ViewChild('recordsSumText', { static: true })
  recordsSumText!: ElementRef;
  @ViewChild('todayInSumNum', { static: true })
  todayInSumNum!: ElementRef;
  @ViewChild('todayOutSumNum', { static: true })
  todayOutSumNum!: ElementRef;
  @ViewChild('focusOut_VehicleSumNum', { static: true })
  focusOut_VehicleSumNum!: ElementRef;
  @ViewChild('recordsSumNum', { static: true })
  recordsSumNum!: ElementRef;
  @ViewChild('filter', { static: true })
  filter!: ElementRef;
  @ViewChild('mianBoard', { static: true })
  mianBoard!: ElementRef;
  @ViewChild('footer', { static: true })
  footer!: ElementRef;
  @ViewChild('footerButton', { static: true })
  footerButton!: ElementRef;
  @ViewChild('footerInput', { static: true })
  footerInput!: ElementRef;
  @ViewChild('footerText', { static: true })
  footerText!: ElementRef;
  @ViewChild('footerText1', { static: true })
  footerText1!: ElementRef;
  @ViewChild('footerButtonUp', { static: true })
  footerButtonUp!: ElementRef;
  @ViewChild('footerButtonDown', { static: true })
  footerButtonDown!: ElementRef;
  @ViewChild('footerText2', { static: true })
  footerText2!: ElementRef;
  @ViewChild('mianBoardTable', { static: true })
  mianBoardTable!: ElementRef;
  @ViewChild('mianBoardHeadTable', { static: true })
  mianBoardHeadTable!: ElementRef;
  cars: Cars = {
    "sum": 0,
    "todayInSum": 0,
    "todayOutSum": 0,
    "focusOut_VehicleSum": 0,
    "recordsSum": 0,
    "cars": [
      {
        "id": 1,
        "plateNO": "",
        "vehicleType": "",
        "in_outType": "",
        "timeOfEntry": "",
        "departureTime": "",
        "currentState": "",
        "name": "",
        "mobileNO": "",
        "records": 0,
        "focus": false
      }],
    "carsReturnSum": 0,
    "pagesSum": [],
    "selectPage": 1,
    "currentPage": "1"
  };
  addLeft = 0;
  tableTh = [
    {
      id: 1,
      thData: "全选"
    }, {
      id: 2,
      thData: "车牌号"
    }, {
      id: 3,
      thData: "车辆类型"
    }, {
      id: 4,
      thData: "出入类型"
    }, {
      id: 5,
      thData: "入营时间"
    }, {
      id: 6,
      thData: "出营时间"
    }, {
      id: 7,
      thData: "当前状态"
    }, {
      id: 8,
      thData: "车主姓名"
    }, {
      id: 9,
      thData: "联系方式"
    }, {
      id: 10,
      thData: "缴费记录"
    }, {
      id: 11,
      thData: "操作"
    }
  ]
 tableThLength = this.tableTh.length;
  tableTrnum = 1;
  allInpchecked = false;
  oneInp!: any;
  allInp!: any;
  isInitCheckedBox = true;
  constructor(
    private scrStyleService: ScrStyleService,
    private homeComponent: HomeComponent,
    private http: HttpClient
  ) { }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getSum();
    this.getScreenSize();
  }
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any) {
    this.scrStyleService.getScreenSize();
    this.changeSize();
  }
  changeSize() {
    //延迟加载
    setTimeout(() => {
      console.log(this.cars.pagesSum.length);
      for (let i = 0; i < this.cars.pagesSum.length; i++) {
        if ((i + 1) === parseInt(this.cars.currentPage)) {
          let id = 'page' + this.cars.pagesSum[i];
          this.homeComponent.changeCommontStyle(document.getElementById(id), 38, 34, 442 - (38 * (this.cars.pagesSum.length - 1 - i)), 14, 0, 0, '#ffffff', '#0096FF');
        } else {
          let id = 'page' + this.cars.pagesSum[i];
          this.homeComponent.changeCommontStyle(document.getElementById(id), 38, 34, 442 - (38 * (this.cars.pagesSum.length - 1 - i)), 14, 0, 0, '#333333', '#ffffff');
        }
      }
    }, 10);
    this.homeComponent.changeCommontStyle(this.titleBackgroud, 1672, 50, 30, 0, 20, 0);
    this.homeComponent.changeCommontStyle(this.title, 187, 25, 40, 18, 25, 0);
    this.homeComponent.changeCommontStyle(this.todayInSum, 378, 57, 30, 0, 90, 0);
    this.homeComponent.changeCommontStyle(this.todayOutSum, 378, 57, 434, 0, 90, 0);
    this.homeComponent.changeCommontStyle(this.focusOut_VehicleSum, 433, 57, 842, 0, 90, 0);
    this.homeComponent.changeCommontStyle(this.recordsSum, 398, 57, 1305, 0, 90, 0);
    this.homeComponent.changeCommontStyle(this.todayInSumText, 149, 28, 45, 20, 30, 0);
    this.homeComponent.changeCommontStyle(this.todayOutSumText, 149, 28, 45, 20, 30, 0);
    this.homeComponent.changeCommontStyle(this.focusOut_VehicleSumText, 219, 28, 45, 20, 30, 0);
    this.homeComponent.changeCommontStyle(this.recordsSumText, 149, 28, 45, 20, 30, 0);
    this.homeComponent.changeCommontStyle(this.todayInSumNum, 91, 36, 248, 26, 30, 0, "#0096ff");
    this.homeComponent.changeCommontStyle(this.todayOutSumNum, 91, 36, 248, 26, 30, 0, "#04E38A");
    this.homeComponent.changeCommontStyle(this.focusOut_VehicleSumNum, 91, 36, 298, 26, 30, 0, "#E3C404");
    this.homeComponent.changeCommontStyle(this.recordsSumNum, 91, 36, 248, 26, 30, 0, "#E30468");
    this.homeComponent.changeCommontStyle(this.filter, 1672, 60, 30, 14, 167, 20);
    this.homeComponent.changeCommontStyle(this.mianBoard, 1673, 600, 30, 0, 247, 0);
    this.homeComponent.changeCommontStyle(this.footer, 775, 36, 927, 0, 881, 0);
    this.homeComponent.changeCommontStyle(this.footerButton, 58, 34, 727, 14, 0, 20);
    this.homeComponent.changeCommontStyle(this.footerInput, 48, 34, 626, 14, 0, 20);
    this.homeComponent.changeCommontStyle(this.footerText, 82, 20, 566, 14, 17, 0);
    this.homeComponent.changeCommontStyle(this.footerText1, 82, 20, 682, 14, 17, 0);
    this.homeComponent.changeCommontStyle(this.footerButtonDown, 74, 34, 480, 14, 0, 20);
    this.homeComponent.changeCommontStyle(this.footerButtonUp, 74, 34, 368 - this.addLeft, 14, 0, 20);
    this.homeComponent.changeCommontStyle(this.mianBoardTable, 1673, 60 * (this.tableTrnum), 0, 14, 60, 0);
    this.homeComponent.changeCommontStyle(this.footerText2, 143, 20, 225 - this.addLeft, 14, 17, 0);
    this.homeComponent.changeCommontStyle(this.mianBoardHeadTable, 1673, 60, 0, 16, 0, 0);
  }
  getSum() {
    this.http.get('/assets/data/carsData.json').subscribe((res: any) => {
      //保持查询的记录在[0,9]区间
      this.cars = res[0];
      this.addLeft = 38 * (this.cars.pagesSum.length - 1);
      this.tableTrnum = this.cars.carsReturnSum;
      this.changeSize();
    });
  }
  changeStyleByID() {

  }
  getCaresDataByPageNum(pageEvent: any) {
    if (pageEvent === 'up') {
      if (parseInt(this.cars.currentPage) > 1) {
        this.cars.currentPage = (parseInt(this.cars.currentPage) - 1) + '';
      } else {
        console.log('当前页数为1,已达到最小页数');
      }
    } else if (pageEvent === 'down') {
      if (parseInt(this.cars.currentPage) < parseInt(this.cars.pagesSum[this.cars.pagesSum.length - 1])) {
        this.cars.currentPage = (parseInt(this.cars.currentPage) + 1) + '';

      } else {
        console.log('已达到最大页数');
      }
    } else if (pageEvent === 'comfire') {
      if ((this.cars.selectPage < (parseInt(this.cars.pagesSum[this.cars.pagesSum.length - 1]) + 1) && this.cars.selectPage > 0)) {
        this.cars.currentPage = this.cars.selectPage + '';
      }
      else {
        console.log('输入的值已超出最大页数或小于最小页数');
      }
    } else {
      this.cars.currentPage = parseInt(pageEvent) + '';
    }
    console.log(this.cars.currentPage);
    this.changeSize();
    //后端根据查询逻辑返回数据
  }
  deleteCarsDataByID(id: number) {
    console.log('删除数据');
    console.log(id);
  }
  checkedOneTr(id: number) {
    if(this.isInitCheckedBox){
      this.getCheckedValue();
      this.isInitCheckedBox = false;
    }
    const tempInp = this.oneInp[id - 1] as HTMLInputElement;
    if (!tempInp.checked) {
      tempInp.checked = false;
      if (this.allInpchecked) {
        this.allInp.checked = false;
      }
    } else {
      tempInp.checked = true;
    }
    //如果所有的选项都为ture or false修改对应的all状态
    const allInpTemp = this.allInp  as HTMLInputElement;
    for (var i = 0; i < this.oneInp.length; i++) {
      const tempInp = this.oneInp[i] as HTMLInputElement;
      if(allInpTemp.checked == true){
        if(tempInp.checked == false){
          allInpTemp.checked=false;
          break;
        }
      }else{
        if(tempInp.checked == false){
          break;
        }else{
          allInpTemp.checked=true;
        }
      }
    }
  }
  //全选
  checkedAllTr() {
    if(this.isInitCheckedBox){
      this.getCheckedValue();
      this.isInitCheckedBox = false;
    }
    const allInpTemp = this.allInp  as HTMLInputElement;
    this.allInpchecked = allInpTemp.checked;
    for (var i = 0; i < this.oneInp.length; i++) {
      const tempInp = this.oneInp[i] as HTMLInputElement;
      tempInp.checked = allInpTemp.checked;
    }
  }
  getCheckedValue() {
    this.oneInp = document.getElementsByName("inp");
    this.allInp = document.getElementById("all");
  }
}
