import { Component, Input } from '@angular/core';

interface Project {
  id: number;
  name: string;
  url: string;
  lat: number;
  lon: number;
  description: string;
  is_private: number;
  is_enabled: number;
  owner: string;
}
@Component({
  selector: 'search-results-list',
  templateUrl: './search-results-list.component.html',
  styleUrls: ['./search-results-list.component.scss']
})
export class SearchResultsListComponent {
  @Input() projectList: Project[] = [];
  @Input() searchKey!: string;

  onClick(url: string) {
    window.open("https://.rfcx.org/project/" + url, '_self')
  }
}
