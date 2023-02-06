import { HostListener, Injectable, OnInit } from '@angular/core';
import { sreenSite } from '../utilities/sreenSite';

@Injectable({
  providedIn: 'root'
})
export class ScrStyleService implements OnInit{
  scrHeight: any;
  scrWidth: any;
  constructor() { }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }
  getActHeightSize(standarSize: number) {
    return this.scrHeight * (standarSize / sreenSite.height)
  }
  getActWidthSize(standarSize: number) {
    return this.scrWidth * (standarSize / sreenSite.width)
  }
  getActFontSize(standarSize: number) {
    return this.scrWidth * (standarSize / sreenSite.width)
  }
  getScreenSize() {
    if( window.innerWidth >=1159){
      this.scrWidth = window.innerWidth;
    }else {
      this.scrWidth = 1159;
    }
    if( window.innerHeight >=152){
      this.scrHeight = window.innerHeight;
    }else {
      this.scrHeight = 152;
    }
    // this.scrWidth = window.innerWidth;
    // this.scrHeight = window.innerHeight;
  }
}
