import { Injectable } from '@angular/core';
import { Fs } from '../../types/node';

@Injectable({
  providedIn: 'root'
})
export class NodeService {
  private get require(): boolean {
    return window && window.require ? true : false;
  }

  public get fs(): Fs {
    let fs = null;
    if (this.require) {
      fs = window.require('fs');
    }
    return fs;
  }

  constructor() {
    if (!this.require) {
      console.error('REQUIRE NOT FOUND ON WINDOW OBJECT');
    }
  }
}
