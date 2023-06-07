import { Component, Self, SkipSelf, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BROWSER_STORAGE, StorageService } from '../services/storage.service';

@Component({
  selector: 'angular-tp-home',
  standalone: true,
  imports: [CommonModule, InfiniteScrollModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  providers: [
    StorageService,
    { provide: BROWSER_STORAGE, useFactory: () => sessionStorage },
  ],
})
export class HomeComponent {
  array: any = [];
  sum = 100;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  direction = '';
  modalOpen = false;
  chance: any;

  constructor(
    @Self() private sessionStorageService: StorageService,
    @SkipSelf() private localStorageService: StorageService
  ) {
    this.appendItems(0, this.sum);
  }

  setSession() {
    this.sessionStorageService.set('hero', 'Dr Nice - Session');
  }

  setLocal() {
    this.localStorageService.set('hero', 'Dr Nice - Local');
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  localName: any | null;
  getLocal() {
    this.localName = this.localStorageService.get('hero');
  }

  clear() {
    this.localStorageService.clear();
  }
  onScrollUp() {
    console.log('scrolled up!!');
  }
  addItems(startIndex: any, endIndex: any, _method: any) {
    for (let i = 0; i < this.sum; ++i) {
      this.array[_method]([i, ' ', this.generateWord()].join(''));
    }
  }

  appendItems(startIndex: any, endIndex: any) {
    this.addItems(startIndex, endIndex, 'push');
  }

  prependItems(startIndex: any, endIndex: any) {
    this.addItems(startIndex, endIndex, 'unshift');
  }

  onScrollDown(ev: any) {
    console.log('scrolled down!!', ev);

    // add another 20 items
    const start = this.sum;
    this.sum += 20;
    this.appendItems(start, this.sum);

    this.direction = 'down';
  }

  onUp() {
    console.log('scrolled up!');
    const start = this.sum;
    this.sum += 20;
    this.prependItems(start, this.sum);

    this.direction = 'up';
  }
  generateWord() {
    return this.chance?.word();
  }

  toggleModal() {
    this.modalOpen = !this.modalOpen;
  }
}
