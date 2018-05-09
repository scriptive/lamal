import { Injectable } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
@Injectable()
export class PanelService {
  private button;
  private current;
  private offsetNormal:string;
  private offsetReverse:string;
  private widthPanel:number=300;
  private widthMax:number=250;
  private widthMin:number=0;
  widthPercentage:number=0;
  widthOffset:number=0;
  private container:any;
  containerId:string='lCm';
  active={
    left:false,
    right:false,
    overlay:false
  };
  widthLeftover:number=60;
  dragArea:number=50;
  dragMin:number=200;
  dataOffset:string='offset';
  dataId:string='id';
  dataLeft:string='left';
  dataRight:string='right';
  // idUnique:'app:unique';
  constructor(
    private location: Location
  ) {}
  go (Id: string) {
    if (Id) {
      // let currentPanel = document.getElementById(Id);
      // let currentPanelOffset = currentPanel.dataset[this.dataOffset];
      // let container = document.querySelector('[data-0="1"]'.replace("0", currentPanelOffset).replace("1",Id));
      // console.log(currentPanel,currentPanelOffset,container);
      this.panelContainer();
      if (this.hasOffset(Id)) {
        if (this.hasOpen(this.offsetNormal)) {
          this.toggle(this.widthMin);
          // $.on(3);
        } else {
          this.toggle(this.widthMax);
          // $.on(2);
        }
      }
    }
  }
  goBack(): void {
    this.location.back();
  }
  close() {
    this.toggle(this.widthMin);
  }
  closeIf(): void {
    this.panelContainer();
    this.hasWidth();
    if ((this.widthOffset - this.widthMax) <= this.widthMax) this.close();
    // $.width();
    // if ((eWidthOffset - config.widthMax) <= config.widthMax) {
    //   Panel.toggle(config.widthMin);
    //   $.on(3);
    // }
  }

  done () {
    if (this.offsetNormal) {
      var w = (this.hasPosition(this.offsetNormal) > this.dragMin)?this.widthMax:this.widthMin;
      this.toggle(w);
      return w < 1;
    }
  }
  dragStart (evt: any) {
    this.panelContainer();
    if (this.container.dataset[this.dataLeft] && this.dragArea > this.hasLeft(evt.center.x)) {
      this.hasOffset(this.container.dataset[this.dataLeft]);
    } else if (this.container.dataset[this.dataRight] && this.hasRight(evt.center.x) < this.dragArea) {
      this.hasOffset(this.container.dataset[this.dataRight]);
    } else {
      this.offsetNormal=null;
    }
    if (this.offsetNormal) {
      // Core.prototype.scPanelCurrent = Panel.current;
      // TODO: if more element exists
      // var id = eMain.dataset[offsetNormal];
      // Panel.button = doc.querySelector('[data-0="1"]'.replace("0", config.dataId).replace("1",id));

      // this.panelButton(this.container.dataset[this.offsetNormal]);
      // Panel.current.style.zIndex = 2;
      // offsetReverse = (offsetNormal==lt)?rt:lt;
      if (this.hasOpen(this.offsetNormal)) {
        // NOTE: Closing
        if (this.hasPosition(this.offsetReverse) < this.widthMin){
          // NOTE: just close?
          // Panel.current.style.zIndex = 1;
          // eMain.style[offsetNormal] = $.pixel(0);
          // eMain.style[offsetReverse] = $.pixel(0);
          // offsetNormal=false;
        } else {
          if (this.hasMax()){
            // NOTE: if offsetOpposite gonna open there is not enought space
          } else {
            // NOTE: normal close
          }
        }
      } else {
        // NOTE: opening
        this.current.style.zIndex = 2;
        // $.on(2);
      }
    }
  }
  drag (e: any) {
    // eWidthOffset = Math.min(eMain.parentElement.offsetWidth,doc.documentElement.clientWidth);
    // if ((eWidthOffset - config.widthLeftover) <= config.widthMax) {
    //   config.widthMax = eWidthOffset - config.widthLeftover;
    // } else {
    //   config.widthMax = eWidthPanel;
    // }
    if (this.offsetNormal) {
      let x = (this.offsetNormal == this.dataLeft)?e.center.x:(this.widthOffset - e.center.x);
      this.widthPercentage = x/this.widthMax*100;
      if (this.widthPercentage > 0 && this.widthPercentage < 100) {
        this.toggle(x);
        // $.on(4);
      }
    }
  }
  dragEnd () {
    this.done();
  }
  dragCancel () {
    this.done();
  }
  toggle (x) {
    if (x <= this.widthMax){
      if (x <= this.widthMin) {
        this.container.style[this.offsetNormal] = this.pixel(this.widthMin);
        this.active[this.offsetNormal]=false;
        if(this.current)this.current.style.zIndex = 1;
        // if(Panel.button)Panel.button.classList.remove(this.classActive);
        // this.container.classList.remove(this.classOverlay);
        if (this.hasPosition(this.offsetReverse) < this.widthMin){
          this.container.style[this.offsetReverse] = this.pixel(this.widthMin);
        }
      } else {
        if(this.current)this.current.style.zIndex = 2;
        this.container.style[this.offsetNormal] = this.pixel(x);
        this.active[this.offsetNormal]=true;
        if (this.hasMax()){
          if ((document.body.offsetWidth - this.widthMax) <= this.widthMax){
            this.container.style[this.offsetReverse] = this.pixel(Math.abs(x) * -1);
            this.active[this.offsetReverse]=false;
            // this.active.overlay=true;
            if (x == this.widthMax) {
              // this.container.classList.add(this.classOverlay);
              // Panel.close();
            }
          } else {
            // NOTE: just Close other Panel, because screen isn't wide enought for both
            this.container.style[this.offsetReverse] = this.pixel(this.widthMin);
            this.active[this.offsetReverse]=false;
          }
          // if(Panel.button)$.siblingClass(Panel.button,this.classActive);
          // if(this.current)this.current.style.maxWidth =  this.pixel(this.widthMax);
        } else {
          // NOTE: screen is wide enought for both
          // if(Panel.button)Panel.button.classList.add(this.classActive);
        }
      }
    }
    if(this.current)this.current.style.maxWidth =  this.pixel(this.widthMax);
  }
  // panelButton (e){
  //   if (e instanceof Element){
  //     this.button = e;
  //   } else {
  //     this.button = document.querySelector('[data-0="1"]'.replace("0", this.dataId).replace("1",e));
  //   }
  // }
  panelContainer(): void{
    this.container = document.getElementById(this.containerId);
    if (this.container){
      // this.widthOffset = Math.min(this.container.parentElement.offsetWidth,document.documentElement.clientWidth);
      this.hasWidth();
    }
  }
  hasWidth(): void {
    this.widthOffset = Math.min(this.container.parentElement.offsetWidth,document.documentElement.clientWidth);
    if ((this.widthOffset - this.widthLeftover) <= this.widthMax) {
      this.widthMax = this.widthOffset - this.widthLeftover;
    } else {
      this.widthMax = this.widthPanel;
    }
  }
  hasOffset(Id){
    this.current = document.getElementById(Id);
    this.offsetNormal=(this.current && this.current.dataset[this.dataOffset])?this.current.dataset[this.dataOffset]:false;
    if (this.offsetNormal) {
      this.offsetReverse = (this.offsetNormal==this.dataLeft)?this.dataRight:this.dataLeft;
      return true;
    }
  }
  hasOpen(p){
    return this.hasPosition(p) == this.widthMax;
  }
  hasPosition(p){
    let x = this.container.style[p];
    return x?parseInt(x):0;
  }
  hasLeft(x){
    return ((x + this.container.offsetWidth) - (this.container.offsetWidth + this.hasPosition(this.dataLeft)));
  }
  hasRight(x){
    return (this.container.offsetWidth + this.hasPosition(this.dataLeft)) - x;
  }
  hasMax(){
    return (this.container.offsetWidth - this.widthMax) <= this.widthMax;
  }
  hasMin(){
    return this.container.offsetWidth <= this.widthMax;
  }
  pixel(size: any) {
    return size+'px';
  }
}