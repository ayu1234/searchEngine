import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  searchData: any[]= [];
  currentPage = 1;
  limit = 10; 
  totalPages = 1;
  completeData: any[] = [];
  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    this.searchService.searchResult.subscribe((data) => {
      this.completeData = this.createDeepCopy(data);
      this.searchData = this.createDeepCopy(data);
      if(this.searchData.length > this.limit) {
        this.currentPage = 1;
        this.totalPages = Math.ceil(this.searchData.length / this.limit);
        this.searchData =  this.searchData.splice(0, this.limit);
      }
    });
  }

  nextPage(currentPage) {
    if (currentPage < this.totalPages ) {
      currentPage++;
      this.changePage(currentPage);
    }
  }

  previousPage(currentPage) {
    if (currentPage > 1) {
      currentPage--;
      this.changePage(currentPage);
    }
  }

  changePage(currentPage) {
    this.searchData = this.createDeepCopy(this.completeData);
    this.currentPage = currentPage;
    this.searchData =  this.searchData.splice((currentPage * this.limit) - this.limit, currentPage * this.limit);
  }

  createDeepCopy(oldObj: any) {
    let newObj = oldObj;
    if (oldObj && typeof oldObj === 'object') {
        newObj = Object.prototype.toString.call(oldObj) === '[object Array]' ? [] : {};
        for (let i in oldObj) {
            newObj[i] = this.createDeepCopy(oldObj[i]);
        }
    }
    return newObj;
  }
}
