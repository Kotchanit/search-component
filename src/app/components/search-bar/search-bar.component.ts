import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { AxiosResponse } from 'axios';
import { debounceTime, distinctUntilChanged, from, map, of, switchMap } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';

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
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})

export class SearchBarComponent {
  faSearch = faSearch
  faSpinner = faSpinner
  form = this.fb.group({
    search: [null]
  })
  isSearching: boolean = false
  searchKey!: string;
  projectList: Project[] = []
  @Output() setResults: EventEmitter<{ projectList: Project[], searchKey: string }> = new EventEmitter()


  constructor(
    private fb: FormBuilder,
    private ApiService: ApiService
  ) {
    this.form.get('search')?.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((searchKey: string | null) => {
        if (searchKey && searchKey.length > 2) {
          this.isSearching = true
          this.searchKey = searchKey.trim();
          return from(this.ApiService.getProjectList(searchKey)).pipe(
            map((response: AxiosResponse<Project[]>) => {
              const projects: Project[] = response.data;
              projects.sort((a, b) => {
                // Check if searchval found on both name and desc
                const aNameIncludes = a.name.toLowerCase().includes(searchKey.toLowerCase())
                const bNameIncludes = b.name.toLowerCase().includes(searchKey.toLowerCase())
                const aDescIncludes = a.description.toLowerCase().includes(searchKey.toLowerCase())
                const bDescIncludes = b.description.toLowerCase().includes(searchKey.toLowerCase())

                // Ordering priority name first then description
                if (aNameIncludes && !bNameIncludes) return -1
                if (!aNameIncludes && bNameIncludes) return 1
                if (aDescIncludes && !bDescIncludes) return -1
                if (!aDescIncludes && bDescIncludes) return 1

                // Other, maintain the original order
                return 0;
              });
              return projects;
            })
          );
        } else {
          return of([]);
        }
      })
    )
      .subscribe((sortedProjects: Project[]) => {
        this.projectList = sortedProjects || of([])
        this.setResults.emit({ projectList: this.projectList, searchKey: this.searchKey })
        this.isSearching = false
      });
  }
}
