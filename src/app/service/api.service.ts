import { Injectable } from '@angular/core';
import axios from 'axios';

interface Headers {
  [key: string]: string;
}

const headers: Headers = {
  'Content-Type': 'application/json',
}

const Api = axios.create({
  baseURL: "", // add API
  headers
})


@Injectable({
  providedIn: 'root'
})

export class ApiService {
  constructor() { }
  getProjectList(searchKey: string) {
    return Api.get(`user/projectlist?q=${searchKey}`);
  }
}
