import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private result = new BehaviorSubject([]);
  searchResult = this.result.asObservable();
  authorNames = new Map();
  searchedData = [];
  constructor(private httpClient: HttpClient) { }

  search(key): void {
    this.httpClient.get("https://hn.algolia.com/api/v1/search?query="+ key).pipe(map(data => data)).subscribe((res: any) => {
      if (res.hits.length) {
        this.searchedData = res.hits;
        this.result.next(this.searchedData);
        this.searchedData.forEach((element) => {
          if (!this.authorNames.has(element.author)) {
            this.authorNames.set(element.author, 0);
          }
        });
        this.getSubmission();
      }     
    });
  }
  async getSubmission() {
    for (const item of this.authorNames){
       await this.httpClient.get("https://hn.algolia.com/api/v1/users/"+ item[0]).toPromise().then((res: any) => {
        if(res?.submission_count) {
          this.authorNames.set(item[0], res.submission_count);
        }
      });
    }
    this.searchedData.forEach(elem => {
      elem.submission = this.authorNames.get(elem.author);
    });
    this.result.next(this.searchedData);
  }
}
