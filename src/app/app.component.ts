import { Component, OnInit } from '@angular/core';
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
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'search_component'
  projectList: Project[] = []
  searchKey!: string


  handleSetResults(data: { projectList: Project[], searchKey: string }) {
    this.projectList = data.projectList
    this.searchKey = data.searchKey
  }
}
