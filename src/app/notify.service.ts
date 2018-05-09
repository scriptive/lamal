import { Injectable } from '@angular/core';

@Injectable()
export class NotifyService {
  // private active:boolean=false;
  // private notification:{
  //   msg:string, yes:string, no:string
  // };
  private msg:string;
  private yes:string;
  private no:string;
  // private Callback:function;
  private callbackConfirm: () => void;
  private callbackCancel: () => void;
  constructor() { }
  // usage(msg:string) {
  //   this.setMessage(msg);
  //   this.confirm('Ok',function(){
  //     console.log('Ok');
  //   });
  //   this.cancel('Cancel',function(){
  //     console.log('Cancel');
  //   });
  // }
  confirm(name?:string,fN?) {
    if (name) {
      this.yes=name;
      if (fN) {
        this.callbackConfirm=fN;
      }
    } else {
      if (typeof this.callbackConfirm == 'function') {
        this.callbackConfirm();
      }
      this.done();
    }
  }
  cancel(name?:string,fN?) {
    if (name) {
      this.no=name;
      if (fN) {
        this.callbackCancel=fN;
      }
    } else {
      if (typeof this.callbackCancel == 'function') {
        this.callbackCancel();
      }
      this.done();
    }
  }
  message(msg:string) {
    this.msg = msg;
  }
  done() {
    this.msg = '';
    this.yes = '';
    this.no = '';
  }
}
