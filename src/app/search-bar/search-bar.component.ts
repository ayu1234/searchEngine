import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  searchKey:string;
  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
  }
  searchKeyword() {
    this.searchService.search(this.searchKey);
  }
}
