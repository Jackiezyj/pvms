import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ScrStyleService } from 'src/app/servies/scr-style.service';
import { HomeComponent } from '../home/home.component';
import * as echarts from 'echarts';
@Component({
  selector: 'app-situation',
  templateUrl: './situation.component.html',
  styleUrls: ['./situation.component.less']
})
export class SituationComponent implements OnInit {
  @ViewChild('label', { static: true })
  label!: ElementRef;
  @ViewChild('leftDatareport', { static: true })
  leftDatareport!: ElementRef;
  @ViewChild('rightDatareport', { static: true })
  rightDatareport!: ElementRef;
  @ViewChild('CarsNum', { static: true })
  CarsNum!: ElementRef;
  @ViewChild('CarsAndPeopleNum', { static: true })
  CarsAndPeopleNum!: ElementRef;
  @ViewChild('leftDatareportTitle', { static: true })
  leftDatareportTitle!: ElementRef;
  @ViewChild('CarsAndPeopleNumTitle', { static: true })
  CarsAndPeopleNumTitle!: ElementRef;
  @ViewChild('CarsAndPeople', { static: true })
  CarsAndPeople!: ElementRef;
  @ViewChild('Cars', { static: true })
  Cars!: ElementRef;
  @ViewChild('People', { static: true })
  People!: ElementRef;
  constructor(
    private scrStyleService: ScrStyleService,
    private homeComponent: HomeComponent
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
    this.getCarsAndPeopleNum();
    this.getCareNum();
    this.PeopleNum();
  }
  getCareNum() {
    // 基于准备好的dom，初始化echarts实例
    let CarsNum = <HTMLElement>document.getElementById('CarsNum');
    CarsNum.style.height = this.scrStyleService.getActHeightSize(200) + 'px';
    CarsNum.style.width = this.scrStyleService.getActWidthSize(502) + 'px';
    let myChart = echarts.init(CarsNum);
    const option = {
      // tooltip: { trigger: 'item', formatter: "{a} <br/>{b}: {c} ({d}%)" },
      legend: {
        orient: 'vertical',
        x: 'left',
        data: ['南门', '北门', '西门', '小门'],
        textStyle: {
          fontSize: `${this.scrStyleService.getActWidthSize(14)}px`,
          color: '#ffffff',
          // opacity: 0.7,
        },

      },
      title: {
        text: '',
        left: 'center',
        top: 'center'
      },
      color: ['#61bbfc', '#0096FF', '#3BFFFF', '#04E38A'],
      series: [
        {
          type: 'pie',
          data: [
            {
              value: 10,
              name: '南门'
            },
            {
              value: 10,
              name: '北门'
            },
            {
              value: 20,
              name: '西门',
            },
            {
              value: 25,
              name: '小门',
            }
          ],
          label: { // 是否显示每一个柱状图的数据
            normal: {
              show: true,
              trigger: 'item',
              foematter: '{b}: {c}({d}%)',
              textStyle: {
                fontSize: `${this.scrStyleService.getActWidthSize(14)}px`,
                color: '#ffffff',
                // opacity: 0.7,
              }
            }

          },
          radius: ['60%', '80%']
        }
      ]
    };
    // 绘制图表
    myChart.setOption(option);
  }
  PeopleNum() {
    // 基于准备好的dom，初始化echarts实例
    let PeopleNum = <HTMLElement>document.getElementById('PeopleNum');
    PeopleNum.style.height = this.scrStyleService.getActHeightSize(420) + 'px';
    PeopleNum.style.width = this.scrStyleService.getActWidthSize(502) + 'px';
    let myChart = echarts.init(PeopleNum);
    const option = {
      title: {
        text: ''
      },
      //tooltip: {},
      xAxis: {
        data: ['部门一', '部门二', '部门三', '部门四', '部门五'],
        // show: false,//不显示坐标轴线、坐标轴刻度线和坐标轴上的文字
        axisTick: {
          show: false//不显示坐标轴刻度线
        },
        axisLabel: {
          show: true, textStyle: {
            color: '#ffffff', //更改坐标轴文字颜色
            fontSize: this.scrStyleService.getActWidthSize(14), //更改坐标轴文字大小
          }
        },
        // },
        // axisLine: {
        //   show: false,//不显示坐标轴线
        // },
        // axisLabel: {
        //   show: false,//不显示坐标轴上的文字
        // },
      },
      yAxis: {
        // show: false,//不显示坐标轴线、坐标轴刻度线和坐标轴上的文字
      },
      series: [
        {
          name: '数量',
          type: 'bar',
          data: [5, 20, 36, 50, 10],
          label: { // 是否显示每一个柱状图的数据
            normal: {
              show: true,
              position: 'top',
              textStyle: {
                fontSize: `${this.scrStyleService.getActWidthSize(14)}px`,
                color: '#ffffff',
                // opacity: 0.7,
              }
            }

          },
          itemStyle: {
            normal: {
              fontSize: `${this.scrStyleService.getActWidthSize(14)}px`,
              color: new echarts.graphic.LinearGradient(//设置渐变色
                0, 1, 0, 0,
                [
                  { offset: 0, color: '#66f4ff' },
                  { offset: 1, color: '#0096ff' }
                ],
                false
              ),
            }
          }
        }
      ]
    };
    // 绘制图表
    myChart.setOption(option);
  }
  getCarsAndPeopleNum() {
    // 基于准备好的dom，初始化echarts实例
    let CarsAndPeopleNum = <HTMLElement>document.getElementById('CarsAndPeopleNum');
    CarsAndPeopleNum.style.height = this.scrStyleService.getActHeightSize(350) + 'px';
    CarsAndPeopleNum.style.width = this.scrStyleService.getActWidthSize(502) + 'px';
    let myChart = echarts.init(CarsAndPeopleNum);
    const option = {
      title: {
        text: ''
      },
      //tooltip: {},
      xAxis: {
        data: ['部门一', '部门二', '部门三', '部门四', '部门五'],
        // show: false,//不显示坐标轴线、坐标轴刻度线和坐标轴上的文字
        axisTick: {
          show: false//不显示坐标轴刻度线
        },
        axisLabel: {
          show: true, textStyle: {
            color: '#ffffff', //更改坐标轴文字颜色
            fontSize: this.scrStyleService.getActWidthSize(14), //更改坐标轴文字大小
          }
        },
        // },
        // axisLine: {
        //   show: false,//不显示坐标轴线
        // },
        // axisLabel: {
        //   show: false,//不显示坐标轴上的文字
        // },
      },
      yAxis: {
        show: false,//不显示坐标轴线、坐标轴刻度线和坐标轴上的文字
      },
      series: [
        {
          name: '数量',
          type: 'bar',
          data: [5, 20, 36, 10, 10],
          label: { // 是否显示每一个柱状图的数据
            normal: {
              show: true,
              position: 'top',
              textStyle: {
                fontSize: `${this.scrStyleService.getActWidthSize(14)}px`,
                color: '#ffffff',
                // opacity: 0.7,
              }
            }

          },
          itemStyle: {
            normal: {
              fontSize: `${this.scrStyleService.getActWidthSize(14)}px`,
              color: new echarts.graphic.LinearGradient(//设置渐变色
                0, 1, 0, 0,
                [
                  { offset: 0, color: '#66f4ff' },
                  { offset: 1, color: '#0096ff' }
                ],
                false
              ),
            }
          }
        }
      ]
    };
    // 绘制图表
    myChart.setOption(option);
  }
  changeSize() {
    this.label.nativeElement.style = `width: ${this.scrStyleService.getActWidthSize(1920)}px;
    height:${this.scrStyleService.getActHeightSize(980)}px;`;
    this.homeComponent.changeCommontStyle(this.leftDatareport, 520, 960, 18, 0, 110, 20);
    this.homeComponent.changeCommontStyle(this.CarsAndPeopleNum, 500, 320, 0, 0, 20, 20);
    this.homeComponent.changeCommontStyle(this.CarsNum, 500, 320, 0, 0, 100, 20);
    this.homeComponent.changeCommontStyle(this.leftDatareportTitle, 450, 28, 18, 20, 19, 20);
    this.homeComponent.changeCommontStyle(this.CarsAndPeopleNumTitle, 450, 20, 0, 20, 5, 14);
    this.homeComponent.changeCommontStyle(this.CarsAndPeople, 450, 300, 0, 20, 50, 14);
    this.homeComponent.changeCommontStyle(this.Cars, 450, 300, 0, 20, 350, 14);
    this.homeComponent.changeCommontStyle(this.People, 450, 300, 0, 20, 650, 14);
    this.homeComponent.changeCommontStyle(this.rightDatareport, 520, 960, 1381, 0, 110, 20);
  }

}
