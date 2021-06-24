import { Component, Input, OnInit, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit, OnChanges {

  @Input()
  totalItems?: number;
  //number of items per page
  @Input()
  pageSize?: number = 15;

  @Input()
  currentPage: number;

  @Output()
  pageChanged = new EventEmitter<number>();

  pageNumber?: number = 0;

  pages?: number[];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalItems']) {
      this.setPageNumber();
      this.setPages(this.pageNumber);
    }
  }

  ngOnInit(): void {
  }

  setPageNumber() {
    this.pageNumber = Math.ceil(this.totalItems / this.pageSize);
  }

  setPages(pageNumber?: number) {
    console.log("Page number ", pageNumber);
    this.pages = pageNumber && [...Array(pageNumber).keys()].map(x => ++x);
    console.log("Pages ", pageNumber);
  }

  onPageChanged(pageNumber: number) {
    //needs tweak to set current page
    this.pageChanged.emit(pageNumber)
  }

  onPrevious() {
    this.onPageChanged(this.currentPage - 1);
  }

  onNext() {
    this.onPageChanged(this.currentPage + 1);
  }

}
