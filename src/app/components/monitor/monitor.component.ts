import { APP_BOOTSTRAP_LISTENER, Component, HostListener, OnInit } from '@angular/core';
import { MinValidator } from '@angular/forms';
import { ScrStyleService } from 'src/app/servies/scr-style.service';
import { Scene, PerspectiveCamera, WebGLRenderer, Vector4 } from 'three';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.less']
})
export class MonitorComponent implements OnInit {
  num = 20.0;
  that = this;
  constructor(
    private scrStyleService: ScrStyleService,
  ) { }
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any) {
    this.scrStyleService.getScreenSize();
    // this.drawFaceCube();
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.drawPoint();
    // this.drawRectangle();
    // this.drawCube();
    // this.drawCubeVertexIndex();
    // this.interpolation();
    // this.getScreenSize();

    // this.drawLightCube(this.num);
    // setInterval(()=>{
    //   this.animloop();
    // },200);
    // this.animloop();
    // animloop();
    // Drawtexture();
    program()

  }
  drawPoint() {
    let canvas = <HTMLCanvasElement>document.getElementById('webgl');
    //通过方法getContext()获取WebGL上下文
    let gl = <WebGLRenderingContext>canvas.getContext("webgl");
    //顶点着色器源码
    //gl_PointSize = 20.0 给内置变量gl_PointSize赋值像素大小
    // gl_Position = vec4(0.0,0.0,0.0,1.0) 顶点位置，位于坐标原点
    let vertexShaderSource = "void main(){gl_PointSize = 10.0; gl_Position = vec4(0.5,0.5,0.0,1.0);}";
    //片元着色器源码
    //gl_FragColor = vec4(1.0,0.0,0.0,1.0); 定义片元颜色
    let fragShaderSource = "void main(){ gl_FragColor = vec4(0.0,0.0,0.0,1.0); }";
    //初始化着色器
    let program = initShader(gl, vertexShaderSource, fragShaderSource);
    //开始绘制，显示器显示结果
    gl.drawArrays(gl.POINTS, 0, 1);
  }

  drawRectangle() {
    let canvasElement = <HTMLCanvasElement>document.getElementById('webgl');
    let gl = <WebGLRenderingContext>canvasElement.getContext('webgl');
    //顶点着色器源码
    let vertexShaderSource = '' +
      //attribute声明vec4类型变量apos
      'attribute vec4 apos;' +
      'void main(){' +
      //顶点坐标apos赋值给内置变量gl_Position
      '   gl_Position =apos;' +
      '}';
    //片元着色器源码
    let fragShaderSource = '' +
      'void main(){' +
      '   gl_FragColor = vec4(1.0,0.0,0.0,1.0);' +
      '}';
    //初始化着色器
    let program = initShader(gl, vertexShaderSource, fragShaderSource);
    //获取顶点着色器的位置变量apos
    let aposLocation = gl.getAttribLocation(program, 'apos');

    //9个元素构建三个顶点的xyz坐标值
    let data = new Float32Array([
      -0.4, 0, 1,
      - 0.4, 1, 0,
      0.6, 0, 0
    ]);
    //创建缓冲区对象
    let buffer = gl.createBuffer();
    //绑定缓冲区对象
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    //顶点数组data数据传入缓冲区
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    //缓冲区中的数据按照一定的规律传递给位置变量apos，第二个代码案例vertexAttribPointer方法的第二个参数是2，这里是3
    gl.vertexAttribPointer(aposLocation, 3, gl.FLOAT, false, 0, 0);
    //允许数据传递
    gl.enableVertexAttribArray(aposLocation);
    //开始绘制图形，使用TRIANGLES模式，三点构成一个平面
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
  drawCube() {
    let canvasElement = <HTMLCanvasElement>document.getElementById('webgl');
    let gl = <WebGLRenderingContext>canvasElement.getContext('webgl');
    //顶点着色器源码
    let vertexShaderSource = '' +
      //attribute声明vec4类型变量apos
      'attribute vec4 apos;' +
      'void main(){' +
      //设置几何体轴旋转角度为30度，并把角度值转化为浮点值
      'float radian = radians(30.0);' +
      //求解旋转角度余弦值
      'float cos = cos(radian);' +
      //求解旋转角度正弦值
      'float sin = sin(radian);' +
      //引用上面的计算数据，创建绕x轴旋转矩阵
      // 1      0       0    0
      // 0   cosα   sinα   0
      // 0  -sinα   cosα   0
      // 0      0        0   1
      'mat4 mx = mat4(1,0,0,0,  0,cos,-sin,0,  0,sin,cos,0,  0,0,0,1);' +
      //引用上面的计算数据，创建绕y轴旋转矩阵
      // cosβ   0   sinβ    0
      //     0   1   0        0
      //-sinβ   0   cosβ    0
      //     0   0   0        1
      'mat4 my = mat4(cos,0,-sin,0,  0,1,0,0,  sin,0,cos,0,  0,0,0,1);' +
      //两个旋转矩阵、顶点齐次坐标连乘
      '   gl_Position = mx*my*apos;' +
      '}';
    //片元着色器源码
    let fragShaderSource = '' +
      'void main(){' +
      '   gl_FragColor = vec4(1.0,0.0,0.0,1.0);' +
      '}';
    //初始化着色器
    let program = initShader(gl, vertexShaderSource, fragShaderSource);
    //获取顶点着色器的位置变量apos
    let aposLocation = gl.getAttribLocation(program, 'apos');

    //9个元素构建三个顶点的xyz坐标值
    let data = new Float32Array([
      //z为0.5时，xOy平面上的四个点坐标
      0.5, 0.5, 0.5,
      -0.5, 0.5, 0.5,
      -0.5, -0.5, 0.5,
      0.5, -0.5, 0.5,
      //z为-0.5时，xOy平面上的四个点坐标
      0.5, 0.5, -0.5,
      -0.5, 0.5, -0.5,
      -0.5, -0.5, -0.5,
      0.5, -0.5, -0.5,
      //上面两组坐标分别对应起来组成一一对
      0.5, 0.5, 0.5,
      0.5, 0.5, -0.5,

      -0.5, 0.5, 0.5,
      -0.5, 0.5, -0.5,

      -0.5, -0.5, 0.5,
      -0.5, -0.5, -0.5,

      0.5, -0.5, 0.5,
      0.5, -0.5, -0.5,
    ]);

    //创建缓冲区对象
    let buffer = gl.createBuffer();
    //绑定缓冲区对象
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    //顶点数组data数据传入缓冲区
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    //缓冲区中的数据按照一定的规律传递给位置变量apos
    gl.vertexAttribPointer(aposLocation, 3, gl.FLOAT, false, 0, 0);
    //允许数据传递
    gl.enableVertexAttribArray(aposLocation);

    //LINE_LOOP模式绘制前四个点
    gl.drawArrays(gl.LINE_LOOP, 0, 4);
    //LINE_LOOP模式从第五个点开始绘制四个点
    gl.drawArrays(gl.LINE_LOOP, 4, 4);
    //LINES模式绘制后8个点
    gl.drawArrays(gl.LINES, 8, 8);
  }
  drawCubeVertexIndex() {
    let canvasElement = <HTMLCanvasElement>document.getElementById('webgl');
    let gl = <WebGLRenderingContext>canvasElement.getContext('webgl');
    //顶点着色器源码
    let vertexShaderSource = '' +
      //attribute声明vec4类型变量apos
      'attribute vec4 apos;' +
      'attribute vec4 a_color;' +//attribute声明顶点颜色变量
      'varying vec4 v_color;' +//varying声明顶点颜色插值后变量
      'void main(){' +
      //设置几何体轴旋转角度为30度，并把角度值转化为浮点值
      'float radian = radians(30.0);' +
      //求解旋转角度余弦值
      'float cos = cos(radian);' +
      //求解旋转角度正弦值
      'float sin = sin(radian);' +
      //引用上面的计算数据，创建绕x轴旋转矩阵
      // 1      0       0    0
      // 0   cosα   sinα   0
      // 0  -sinα   cosα   0
      // 0      0        0   1
      'mat4 mx = mat4(1,0,0,0,  0,cos,-sin,0,  0,sin,cos,0,  0,0,0,1);' +
      //引用上面的计算数据，创建绕y轴旋转矩阵
      // cosβ   0   sinβ    0
      //     0   1   0        0
      //-sinβ   0   cosβ    0
      //     0   0   0        1
      'mat4 my = mat4(cos,0,-sin,0,  0,1,0,0,  sin,0,cos,0,  0,0,0,1);' +
      //两个旋转矩阵、顶点齐次坐标连乘
      '   gl_Position = mx*my*apos;' +
      'v_color = a_color;' +//顶点颜色插值计算
      '}';
    //片元着色器源码
    let fragShaderSource = '' +
      'precision lowp float;' +//所有float类型数据的精度是lowp
      'varying vec4 v_color;' +//接收顶点着色器中v_color数据
      'void main(){' +
      '   gl_FragColor = v_color;' +//插值后颜色数据赋值给对应的片元
      '}';
    //初始化着色器
    let program = initShader(gl, vertexShaderSource, fragShaderSource);
    //获取顶点着色器的位置变量apos
    let aposLocation = gl.getAttribLocation(program, 'apos');
    let a_color = gl.getAttribLocation(program, 'a_color');
    //        8个顶点坐标数组
    let data = new Float32Array([
      0.5, 0.5, 0.5,//顶点0
      -0.5, 0.5, 0.5,//顶点1
      -0.5, -0.5, 0.5,//顶点2
      0.5, -0.5, 0.5,//顶点3
      0.5, 0.5, -0.5,//顶点4
      -0.5, 0.5, -0.5,//顶点5
      -0.5, -0.5, -0.5,//顶点6
      0.5, -0.5, -0.5,//顶点7
    ]);
    //        顶点索引数组
    let indexes = new Uint8Array([
      //        前四个点
      0, 1, 2, 3,
      //        后四个顶点
      4, 5, 6, 7,
      //        前后对应点
      0, 4,
      1, 5,
      2, 6,
      3, 7
    ]);
    let colorData = new Float32Array([
      1, 0, 0, 1, 0, 0, 1, 0, 0,//三个红色点
      0, 0, 1, 0, 0, 1, 0, 0, 1,//三个蓝色点
      0, 1, 0, 0, 1, 0, 0, 1, 0,//三个蓝色点

    ]);
    /**
     创建缓冲区colorBuffer，传入顶点颜色数据colorData
     **/
    let colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, colorData, gl.STATIC_DRAW);
    gl.vertexAttribPointer(a_color, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_color);
    //创建缓冲区对象
    let indexesBuffer = gl.createBuffer();
    //绑定缓冲区对象
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexesBuffer);
    //索引数组indexes数据传入缓冲区
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indexes, gl.STATIC_DRAW);

    //创建缓冲区对象
    let buffer = gl.createBuffer();
    //绑定缓冲区对象
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    //顶点数组data数据传入缓冲区
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    //缓冲区中的数据按照一定的规律传递给位置变量apos
    gl.vertexAttribPointer(aposLocation, 3, gl.FLOAT, false, 0, 0);
    //允许数据传递
    gl.enableVertexAttribArray(aposLocation);
    //LINE_LOOP模式绘制前四个点
    gl.drawElements(gl.LINE_LOOP, 4, gl.UNSIGNED_BYTE, 0);
    //LINE_LOOP模式从第五个点开始绘制四个点
    gl.drawElements(gl.LINE_LOOP, 4, gl.UNSIGNED_BYTE, 4);
    //LINES模式绘制后8个点
    gl.drawElements(gl.TRIANGLES, 8, gl.UNSIGNED_BYTE, 8);

  }
  //立体彩色立方体
  drawFaceCube() {
    let canvasElement = <HTMLCanvasElement>document.getElementById('webgl');
    let gl = <WebGLRenderingContext>canvasElement.getContext('webgl');
    //顶点着色器源码
    let vertexShaderSource = '' +
      //attribute声明vec4类型变量apos
      'attribute vec4 apos;' +
      'attribute vec4 a_color;' +//attribute声明顶点颜色变量
      'varying vec4 v_color;' +//varying声明顶点颜色插值后变量
      'void main(){' +
      //设置几何体轴旋转角度为30度，并把角度值转化为浮点值
      'float radian = radians(30.0);' +
      //求解旋转角度余弦值
      'float cos = cos(radian);' +
      //求解旋转角度正弦值
      'float sin = sin(radian);' +
      //引用上面的计算数据，创建绕x轴旋转矩阵
      // 1      0       0    0
      // 0   cosα   sinα   0
      // 0  -sinα   cosα   0
      // 0      0        0   1
      'mat4 mx = mat4(1,0,0,0,  0,cos,-sin,0,  0,sin,cos,0,  0,0,0,1);' +
      //引用上面的计算数据，创建绕y轴旋转矩阵
      // cosβ   0   sinβ    0
      //     0   1   0        0
      //-sinβ   0   cosβ    0
      //     0   0   0        1
      'mat4 my = mat4(cos,0,-sin,0,  0,1,0,0,  sin,0,cos,0,  0,0,0,1);' +
      //两个旋转矩阵、顶点齐次坐标连乘
      '   gl_Position = mx*my*apos;' +
      'v_color = a_color;' +//顶点颜色插值计算
      '}';
    //片元着色器源码
    let fragShaderSource = '' +
      'precision lowp float;' +//所有float类型数据的精度是lowp
      'varying vec4 v_color;' +//接收顶点着色器中v_color数据
      'void main(){' +
      '   gl_FragColor = v_color;' +
      '}';
    //初始化着色器
    let program = initShader(gl, vertexShaderSource, fragShaderSource);
    /**
     从program对象获取顶点位置变量apos、颜色变量a_color
     **/
    let aposLocation = gl.getAttribLocation(program, 'apos');
    let a_color = gl.getAttribLocation(program, 'a_color');
    /**
     创建顶点位置数据数组data,Javascript中小数点前面的0可以省略
     **/
    let data = new Float32Array([
      .5, .5, .5, -.5, .5, .5, -.5, -.5, .5, .5, .5, .5, -.5, -.5, .5, .5, -.5, .5,      //面1
      .5, .5, .5, .5, -.5, .5, .5, -.5, -.5, .5, .5, .5, .5, -.5, -.5, .5, .5, -.5,      //面2
      .5, .5, .5, .5, .5, -.5, -.5, .5, -.5, .5, .5, .5, -.5, .5, -.5, -.5, .5, .5,      //面3
      -.5, .5, .5, -.5, .5, -.5, -.5, -.5, -.5, -.5, .5, .5, -.5, -.5, -.5, -.5, -.5, .5,//面4
      -.5, -.5, -.5, .5, -.5, -.5, .5, -.5, .5, -.5, -.5, -.5, .5, -.5, .5, -.5, -.5, .5,//面5
      .5, -.5, -.5, -.5, -.5, -.5, -.5, .5, -.5, .5, -.5, -.5, -.5, .5, -.5, .5, .5, -.5 //面6
    ]);
    /**
     创建顶点颜色数组colorData
     **/
    let colorData = new Float32Array([
      1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,      //红色——面1
      .9, 0, 0, .9, 0, 0, .9, 0, 0, .9, 0, 0, .9, 0, 0, .9, 0, 0,//R=0.9——面2
      .8, 0, 0, .8, 0, 0, .8, 0, 0, .8, 0, 0, .8, 0, 0, .8, 0, 0,//R=0.8——面3
      1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0,      //黄色——面4
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,      //黑色——面5
      1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,      //R=1——面6
    ]);
    /**
     创建缓冲区colorBuffer，传入顶点颜色数据colorData
     **/
    let colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, colorData, gl.STATIC_DRAW);
    gl.vertexAttribPointer(a_color, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_color);
    /**
     创建缓冲区buffer，传入顶点位置数据data
     **/
    let buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    gl.vertexAttribPointer(aposLocation, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aposLocation);

    /**执行绘制之前，一定要开启深度测试，以免颜色混乱**/
    gl.enable(gl.DEPTH_TEST);
    /**执行绘制命令**/
    gl.drawArrays(gl.TRIANGLES, 0, 36);
  }
  //两个单色三角形（不同颜色）
  interpolation() {
    let canvasElement = <HTMLCanvasElement>document.getElementById('webgl');
    let gl = <WebGLRenderingContext>canvasElement.getContext('webgl');
    //    顶点着色器源码
    let vertexShaderSource = '' +
      'attribute vec4 apos;' + //顶点坐标变量
      'attribute vec4 a_color;' +//attribute声明顶点颜色变量
      'varying vec4 v_color;' +//varying声明顶点颜色插值后变量
      'void main(){' +
      'gl_Position = apos;' +//顶点坐标apos赋值给内置变量gl_Position
      'v_color = a_color;' +//顶点颜色插值计算
      '}';
    //     片元着色器源码
    let fragShaderSource = '' +
      'precision lowp float;' +//所有float类型数据的精度是lowp
      'varying vec4 v_color;' +//接收顶点着色器中v_color数据
      'void main(){' +
      '   gl_FragColor = v_color;' +//插值后颜色数据赋值给对应的片元
      '}';

    //调用函数initShader(),初始化着色器,返回program对象
    let program = initShader(gl, vertexShaderSource, fragShaderSource);
    /**
     从program对象获取顶点位置变量apos、颜色变量a_color
     **/
    let aposLocation = gl.getAttribLocation(program, 'apos');
    let a_color = gl.getAttribLocation(program, 'a_color');

    /**
     创建顶点位置数据数组data，存储6个顶点
     创建顶点颜色数组colorData，存储6个顶点对应RGB颜色值
     **/
    let data = new Float32Array([
      -0.5, 0.5, 0.5, 0.5, 0.5, -0.5,//第一个三角形的三个点
      -0.5, 0.5, 0.5, -0.5, -0.5, -0.5//第二个三角形的三个点
    ]);
    let colorData = new Float32Array([
      1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,//三个红色点
      0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1//三个蓝色点
    ]);
    /**
     创建缓冲区colorBuffer，传入顶点颜色数据colorData
     **/
    let colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, colorData, gl.STATIC_DRAW);
    gl.vertexAttribPointer(a_color, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_color);
    /**
     创建缓冲区buffer，传入顶点位置数据data
     **/
    let buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    gl.vertexAttribPointer(aposLocation, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aposLocation);

    /**执行绘制命令**/
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

}
let num = 20.0;
function animloop() {
  drawLightCube(num);
  if (num > 360) {
    num = 0.3;
  } else {
    num = num + 0.3;
  }

  window.requestAnimationFrame(animloop);
}

function drawLightCube(num: any) {
  // console.log(num);
  let canvasElement = <HTMLCanvasElement>document.getElementById('webgl');
  let gl = <WebGLRenderingContext>canvasElement.getContext('webgl');
  //顶点着色器源码
  let vertexShaderSource = '' +
    //attribute声明vec4类型变量apos
    'attribute vec4 apos;' +
    'attribute vec4 a_color;' +//attribute声明顶点颜色变量
    /**用于光照计算的变量a_normal、u_lightColor、u_lightDirection**/
    'attribute vec4 a_normal;' +//法向量变量
    'uniform vec3 u_lightColor;' + //uniform声明平行光颜色变量
    'uniform vec3 u_lightDirection;' + //平行光方向
    'uniform float u_radian;' + //旋转角度
    'varying vec4 v_color;' +//varying声明顶点颜色插值后变量
    'void main(){' +
    //设置几何体轴旋转角度为45度，并把角度值转化为浮点值
    'float radian = radians(u_radian);' +
    //求解旋转角度余弦值
    'float cos = cos(radian);' +
    //求解旋转角度正弦值
    'float sin = sin(radian);' +
    //引用上面的计算数据，创建绕x轴旋转矩阵
    // 1      0       0    0
    // 0   cosα   sinα   0
    // 0  -sinα   cosα   0
    // 0      0        0   1
    'mat4 mx = mat4(1,0,0,0,  0,cos,-sin,0,  0,sin,cos,0,  0,0,0,1);' +
    //引用上面的计算数据，创建绕y轴旋转矩阵
    // cosβ   0   sinβ    0
    //     0   1   0        0
    //-sinβ   0   cosβ    0
    //     0   0   0        1
    'mat4 my = mat4(cos,0,-sin,0,  0,1,0,0,  sin,0,cos,0,  0,0,0,1);' +
    // 两个旋转矩阵、顶点齐次坐标连乘
    '   gl_Position = mx*my*apos;' +
    // 顶点法向量归一化
    '  vec3 normal = normalize(a_normal.xyz);' +
    // 计算平行光方向向量和顶点法向量的点积
    '  float dot = max(dot(u_lightDirection, normal), 0.0);' +
    // 计算平行光方向向量和顶点法向量的点积
    '  vec3 reflectedLight = u_lightColor * a_color.rgb * dot;' +
    //颜色插值计算
    '  v_color = vec4(reflectedLight, a_color.a);' +
    '}';
  //片元着色器源码
  let fragShaderSource = '' +
    'precision lowp float;' +//所有float类型数据的精度是lowp
    'varying vec4 v_color;' +//接收顶点着色器中v_color数据
    'void main(){' +
    '   gl_FragColor = v_color;' +
    '}';
  //初始化着色器
  let program = initShader(gl, vertexShaderSource, fragShaderSource);
  /**
   * 从program对象获取相关的变量
   * attribute变量声明的方法使用getAttribLocation()方法
   * uniform变量声明的方法使用getAttribLocation()方法
   **/
  let aposLocation = gl.getAttribLocation(program, 'apos');
  let a_color = gl.getAttribLocation(program, 'a_color');
  let a_normal = gl.getAttribLocation(program, 'a_normal');
  let u_lightColor = gl.getUniformLocation(program, 'u_lightColor');
  let u_lightDirection = gl.getUniformLocation(program, 'u_lightDirection');
  let u_radian = gl.getUniformLocation(program, 'u_radian');
  /**
   * 给平行光传入颜色和方向数据，RGB(1,1,1),单位向量(x,y,z)
   **/
  gl.uniform3f(u_lightColor, 1.0, 1.0, 1.0);
  gl.uniform1f(u_radian, num);
  //保证向量(x,y,z)的长度为1，即单位向量
  let x = 1 / Math.sqrt(15), y = 2 / Math.sqrt(15), z = 3 / Math.sqrt(15);
  gl.uniform3f(u_lightDirection, x, y, -z);
  /**
   创建顶点位置数据数组data,Javascript中小数点前面的0可以省略
   **/
  let data = new Float32Array([
    .5, .5, .5, -.5, .5, .5, -.5, -.5, .5, .5, .5, .5, -.5, -.5, .5, .5, -.5, .5,      //面1
    .5, .5, .5, .5, -.5, .5, .5, -.5, -.5, .5, .5, .5, .5, -.5, -.5, .5, .5, -.5,      //面2
    .5, .5, .5, .5, .5, -.5, -.5, .5, -.5, .5, .5, .5, -.5, .5, -.5, -.5, .5, .5,      //面3
    -.5, .5, .5, -.5, .5, -.5, -.5, -.5, -.5, -.5, .5, .5, -.5, -.5, -.5, -.5, -.5, .5,//面4
    -.5, -.5, -.5, .5, -.5, -.5, .5, -.5, .5, -.5, -.5, -.5, .5, -.5, .5, -.5, -.5, .5,//面5
    .5, -.5, -.5, -.5, -.5, -.5, -.5, .5, -.5, .5, -.5, -.5, -.5, .5, -.5, .5, .5, -.5 //面6
  ]);
  /**
   创建顶点颜色数组colorData
   **/
  let colorData = new Float32Array([
    1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,//红色——面1
    1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,//红色——面2
    1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,//红色——面3
    1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,//红色——面4
    1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,//红色——面5
    1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0 //红色——面6
  ]);
  /**
   *顶点法向量数组normalData
   **/
  let normalData = new Float32Array([
    0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,//z轴正方向——面1
    1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,//x轴正方向——面2
    0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,//y轴正方向——面3
    -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0,//x轴负方向——面4
    0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0,//y轴负方向——面5
    0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1//z轴负方向——面6
  ]);
  /**
   创建缓冲区normalBuffer，传入顶点法向量数据normalData
   **/
  let normalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, normalData, gl.STATIC_DRAW);
  gl.vertexAttribPointer(a_normal, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_normal);
  /**
   创建缓冲区colorBuffer，传入顶点颜色数据colorData
   **/
  let colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, colorData, gl.STATIC_DRAW);
  gl.vertexAttribPointer(a_color, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_color);
  /**
   创建缓冲区buffer，传入顶点位置数据data
   **/
  let buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  gl.vertexAttribPointer(aposLocation, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(aposLocation);


  /**执行绘制之前，一定要开启深度测试，以免颜色混乱**/
  gl.enable(gl.DEPTH_TEST);
  /**执行绘制命令**/
  gl.drawArrays(gl.TRIANGLES, 0, 36);
}
//声明初始化着色器函数
function initShader(gl: WebGLRenderingContext, vertexShaderSource: string, fragShaderSource: string) {
  //创建顶点着色器对象
  let vertexShader = <WebGLShader>gl.createShader(gl.VERTEX_SHADER);
  //创建片元着色器对象
  let fragmentShader = <WebGLShader>gl.createShader(gl.FRAGMENT_SHADER);
  //引入顶点、片元着色器源代码
  gl.shaderSource(vertexShader, vertexShaderSource);
  gl.shaderSource(fragmentShader, fragShaderSource);
  //编译顶点、片元着色器
  gl.compileShader(vertexShader);
  gl.compileShader(fragmentShader);
  //创建程序对象program
  let program = <WebGLProgram>gl.createProgram();
  //附着顶点着色器和片元着色器到program
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  //链接program
  gl.linkProgram(program);
  //使用program
  gl.useProgram(program);
  //返回程序program对象
  return program;
}
function Drawtexture() {
  let canvasElement = <HTMLCanvasElement>document.getElementById('webgl');
  let gl = <WebGLRenderingContext>canvasElement.getContext('webgl');
  //顶点着色器源码
  let vertexShaderSource = '' +
    'attribute vec4 a_Position;' +//顶点位置坐标
    'attribute vec2 a_TexCoord;' +//纹理坐标
    'varying vec2 v_TexCoord;' +//插值后纹理坐标
    'void main(){' +
    'gl_Position = a_Position;' +//逐顶点处理
    'v_TexCoord = a_TexCoord;' +//纹理坐标插值计算
    '}';
  //片元着色器源码
  let fragShaderSource = '' +
    'precision highp float;' +//所有float类型数据的精度是lowp
    'varying vec2 v_TexCoord;' +//接收插值后的纹理坐标
    'uniform sampler2D u_Sampler;' +//纹理图片像素数据
    'void main(){' +
    //采集纹素，逐片元赋值像素值
    'gl_FragColor = texture2D(u_Sampler,v_TexCoord);' +
    '}';
  //初始化着色器
  let program = initShader(gl, vertexShaderSource, fragShaderSource);
  /**
   * 从program对象获取相关的变量
   * attribute变量声明的方法使用getAttribLocation()方法
   * uniform变量声明的方法使用getAttribLocation()方法
   **/
  let a_Position = gl.getAttribLocation(program, 'a_Position');
  let a_TexCoord = gl.getAttribLocation(program, 'a_TexCoord');
  let u_Sampler = gl.getUniformLocation(program, 'u_Sampler');
  /**
   * 四个顶点坐标数据data，z轴为零
   * 定义纹理贴图在WebGL坐标系中位置
   **/
  let data = new Float32Array([
    -0.5, 0.5,//左上角——v0
    -0.5, -0.5,//左下角——v1
    0.5, 0.5,//右上角——v2
    0.5, -0.5 //右下角——v3
  ]);
  /**
   * 创建UV纹理坐标数据textureData
   **/
  let textureData = new Float32Array([
    0, 1,//左上角——uv0
    0, 0,//左下角——uv1
    1, 1,//右上角——uv2
    1, 0 //右下角——uv3
  ]);
  /**
   * 加载纹理图像像素数据
   **/
  let image = new Image();
  image.onload = texture;
  image.src = '../../assets/img/texture.jpg';
  console.log(image);

  /**
   创建缓冲区buffer，向顶点着色器传入顶点位置数据data
   **/
  let buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);
  /**
   创建缓冲区textureBuffer，向顶点着色器传入顶点纹理坐标数据textureData
   **/
  let textureBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, textureData, gl.STATIC_DRAW);
  gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_TexCoord);
  /**
   创建缓冲区textureBuffer，传入图片纹理数据，然后执行绘制方法drawArrays()
   **/
  function texture() {
    let texture = gl.createTexture();//创建纹理图像缓冲区
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true); //纹理图片上下反转
    gl.activeTexture(gl.TEXTURE0);//激活0号纹理单元TEXTURE0
    gl.bindTexture(gl.TEXTURE_2D, texture);//绑定纹理缓冲区
    //设置纹理贴图填充方式(纹理贴图像素尺寸大于顶点绘制区域像素尺寸)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    //设置纹理贴图填充方式(纹理贴图像素尺寸小于顶点绘制区域像素尺寸)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    //设置纹素格式，jpg格式对应gl.RGB
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
    gl.uniform1i(u_Sampler, 0);//纹理缓冲区单元TEXTURE0中的颜色数据传入片元着色器
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
}
function program() {
  let canvasElement = <HTMLCanvasElement>document.getElementById('webgl');
  let gl = <WebGLRenderingContext>canvasElement.getContext('webgl');
  /**
   * 立方体着色器程序
   **/
  //立方体：顶点着色器程序
  let cubeVertexShaderSource = '' +
    //attribute声明vec4类型变量a_Position
    'attribute vec4 a_Position;' +
    'attribute vec4 a_color;' +//attribute声明顶点颜色变量
    /**用于光照计算的变量a_normal、u_lightColor**/
    'attribute vec4 a_normal;' +//法向量变量
    'uniform vec3 u_lightColor;' + //uniform声明平行光颜色变量
    'uniform vec3 u_lightDirection;' + //平行光方向
    /**uniform声明旋转矩阵变量mx、my**/
    'uniform mat4 mx;' +//绕x轴旋转矩阵
    'uniform mat4 my;' +//绕y轴旋转矩阵
    'varying vec4 v_color;' +//varying声明顶点颜色插值后变量
    'void main(){' +
    // 平移矩阵Tx、旋转矩阵mx、旋转矩阵my连乘
    '   gl_Position = mx*my*a_Position;' +
    // 顶点法向量归一化
    '  vec3 normal = normalize((mx*my*a_normal).xyz);' +
    // 计算平行光方向向量和顶点法向量的点积
    '  float dot = max(dot(u_lightDirection, normal), 0.0);' +
    // 计算平行光方向向量和顶点法向量的点积
    '  vec3 reflectedLight = u_lightColor * a_color.rgb * dot;' +
    //颜色插值计算
    '  v_color = vec4(reflectedLight, a_color.a);' +
    '}';
  //立方体：片元着色器程序
  let cubeFragShaderSource = '' +
    'precision lowp float;' +//所有float类型数据的精度是lowp
    'varying vec4 v_color;' +//接收顶点着色器中v_color数据
    'void main(){' +
    '   gl_FragColor = v_color;' +
    '}';
  /**
   * 纹理贴图着色器程序
   **/
  //纹理贴图：顶点着色器程序
  let textureVertexShaderSource = '' +
    'attribute vec4 a_Position;' +//顶点位置坐标
    'attribute vec2 a_TexCoord;' +//纹理坐标
    'varying vec2 v_TexCoord;' +//插值后纹理坐标
    'uniform mat4 mx;' +//绕x轴旋转矩阵
    'uniform mat4 my;' +//绕y轴旋转矩阵
    'void main(){' +
    'gl_Position = mx*my*a_Position;' +//逐顶点处理
    'v_TexCoord = a_TexCoord;' +//纹理坐标插值计算
    '}';
  //纹理贴图：片元着色器程序
  let textureFragShaderSource = '' +
    'precision highp float;' +//所有float类型数据的精度是lowp
    'varying vec2 v_TexCoord;' +//接收插值后的纹理坐标
    'uniform sampler2D u_Sampler;' +//纹理图片像素数据
    'void main(){' +
    //采集纹素，逐片元赋值像素值
    'gl_FragColor = texture2D(u_Sampler,v_TexCoord);' +
    '}';
  /**
   * 渲染管线功能配置
   **/
  gl.enable(gl.DEPTH_TEST);//开启深度测试
  /**
   * 初始化着色器
   **/
  //执行初始化函数initShader()，立方体着色器程序作为参数
  let textureProgram = initShader(gl, textureVertexShaderSource, textureFragShaderSource);
  //执行初始化函数initShader()，纹理映射着色器程序作为参数
  let cubeProgram = initShader(gl, cubeVertexShaderSource, cubeFragShaderSource);
  /**
   * 从program对象获取相关的变量
   **/
  /**纹理映射顶点、片元着色器的变量地址**/
  let texturePosition = gl.getAttribLocation(textureProgram, 'a_Position');
  let a_TexCoord = gl.getAttribLocation(textureProgram, 'a_TexCoord');
  let u_Sampler = gl.getUniformLocation(textureProgram, 'u_Sampler');
  let textureMx = gl.getUniformLocation(textureProgram, 'mx');//旋转矩阵mx
  let textureMy = gl.getUniformLocation(textureProgram, 'my');//旋转矩阵my
  /**立方体顶点、片元着色器的变量地址**/
  let cubePosition = gl.getAttribLocation(cubeProgram, 'a_Position');
  let a_color = gl.getAttribLocation(cubeProgram, 'a_color');
  let a_normal = gl.getAttribLocation(cubeProgram, 'a_normal');
  let u_lightColor = gl.getUniformLocation(cubeProgram, 'u_lightColor');
  let u_lightDirection = gl.getUniformLocation(cubeProgram, 'u_lightDirection');
  let cubeMx = gl.getUniformLocation(cubeProgram, 'mx');
  let cubeMy = gl.getUniformLocation(cubeProgram, 'my');
  /**
   * 纹理映射、立方体共用的旋转矩阵数据
   **/
  let angle = Math.PI / -3;//起始角度
  let sin = Math.sin(angle);//旋转角度正弦值
  let cos = Math.cos(angle);//旋转角度余弦值
  /**绕x轴旋转30度**/
  let mxArr = new Float32Array([1, 0, 0, 0, 0, cos, -sin, 0, 0, sin, cos, 0, 0, 0, 0, 1]);
  /**绕y轴旋转30度**/
  let myArr = new Float32Array([cos, 0, -sin, 0, 0, 1, 0, 0, sin, 0, cos, 0, 0, 0, 0, 1]);
  /**立方体顶点位置数据数组data**/
  let cubeData = new Float32Array([
    .5, .5, .5, -.5, .5, .5, -.5, -.5, .5, .5, .5, .5, -.5, -.5, .5, .5, -.5, .5,      //面1
    .5, .5, .5, .5, -.5, .5, .5, -.5, -.5, .5, .5, .5, .5, -.5, -.5, .5, .5, -.5,      //面2
    .5, .5, .5, .5, .5, -.5, -.5, .5, -.5, .5, .5, .5, -.5, .5, -.5, -.5, .5, .5,      //面3
    -.5, .5, .5, -.5, .5, -.5, -.5, -.5, -.5, -.5, .5, .5, -.5, -.5, -.5, -.5, -.5, .5,//面4
    -.5, -.5, -.5, .5, -.5, -.5, .5, -.5, .5, -.5, -.5, -.5, .5, -.5, .5, -.5, -.5, .5,//面5
    .5, -.5, -.5, -.5, -.5, -.5, -.5, .5, -.5, .5, -.5, -.5, -.5, .5, -.5, .5, .5, -.5 //面6
  ]);
  /**立方体顶点颜色数组colorData**/
  let colorData = new Float32Array([
    1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,//红色——面1
    1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,//红色——面2
    1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,//红色——面3
    1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,//红色——面4
    1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,//红色——面5
    1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0 //红色——面6
  ]);
  /**立方体顶点法向量数组normalData**/
  let normalData = new Float32Array([
    0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,//z轴正方向——面1
    1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,//x轴正方向——面2
    0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,//y轴正方向——面3
    -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0,//x轴负方向——面4
    0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0,//y轴负方向——面5
    0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1//z轴负方向——面6
  ]);
  /**纹理映射顶点数据**/
  let data = new Float32Array([
    -0.4, 0.2, -0.51,//左上角——v0
    -0.4, -0.2, -0.51,//左下角——v1
    0.4, 0.2, -0.51,//右上角——v2
    0.4, -0.2, -0.51//右下角——v3
  ]);
  /**UV纹理坐标数据textureData**/
  let textureData = new Float32Array([
    0, 1,//左上角——uv0
    0, 0,//左下角——uv1
    1, 1,//右上角——uv2
    1, 0 //右下角——uv3
  ]);
  /**加载纹理图像像素数据**/
  let image = new Image();
  image.onload = texture;
  image.src = '../../assets/img/glb.jpg';
  /**
   创建缓冲区textureBuffer，传入图片纹理数据，然后执行绘制方法drawArrays()
   **/
  function texture() {
    let texture = gl.createTexture();//创建纹理图像缓冲区
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true); //纹理图片上下反转
    gl.activeTexture(gl.TEXTURE0);//激活0号纹理单元TEXTURE0
    gl.bindTexture(gl.TEXTURE_2D, texture);//绑定纹理缓冲区
    //设置纹理贴图填充方式(纹理贴图像素尺寸大于顶点绘制区域像素尺寸)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    //设置纹理贴图填充方式(纹理贴图像素尺寸小于顶点绘制区域像素尺寸)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    //设置纹素格式，png格式对应gl.RGBA
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
    /**
     执行useProgram()方法，GPU执行纹理映射着色器程序
     **/
    gl.useProgram(textureProgram);
    /**调用函数vertexBuffer()，配置顶点数据**/
    vertexBuffer(data, texturePosition, 3);
    vertexBuffer(textureData, a_TexCoord, 2);
    /**传入纹理图片旋转矩阵数据**/
    gl.uniformMatrix4fv(textureMy, false, myArr);
    gl.uniformMatrix4fv(textureMx, false, mxArr);
    gl.uniform1i(u_Sampler, 0);//纹理缓冲区单元TEXTURE0中的颜色数据传入片元着色器
    /**执行绘制，纹理映射像素值存入颜色缓冲区**/
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    /**
     执行useProgram()方法，切换着色器程序，重新配置GPU执行立方体着色器程序
     **/
    gl.useProgram(cubeProgram);
    /**调用函数vertexBuffer()，配置顶点数据**/
    vertexBuffer(cubeData, cubePosition, 3);
    vertexBuffer(colorData, a_color, 3);
    vertexBuffer(normalData, a_normal, 3);
    /**传入立方体旋转矩阵数据**/
    gl.uniformMatrix4fv(cubeMx, false, mxArr);
    gl.uniformMatrix4fv(cubeMy, false, myArr);
    /**传入光的颜色和方向数据**/
    gl.uniform3f(u_lightColor, 1.0, 1.0, 1.0);
    //保证向量(x,y,z)的长度为1，即单位向量
    let x = 1 / Math.sqrt(15), y = 2 / Math.sqrt(15), z = 3 / Math.sqrt(15);
    gl.uniform3f(u_lightDirection, x, y, -z);
    /**执行绘制，立方体像素值存入颜色缓冲区**/
    gl.drawArrays(gl.TRIANGLES, 0, 36);
  }
  /**
   * 顶点数据配置函数vertexBuffer()
   * 顶点数据data
   * 顶点位置position
   * 间隔数量n
   **/
  function vertexBuffer(data:any, position:any, n:any) {
    let buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    gl.vertexAttribPointer(position, n, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(position);
  }
}
