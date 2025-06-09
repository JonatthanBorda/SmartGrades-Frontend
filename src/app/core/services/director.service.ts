import { Injectable } from '@angular/core';
import { ComandoDirector, Director } from '../models/director.model';
import { GenericoService } from './generico.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DirectorService extends GenericoService<Director, ComandoDirector> {

  constructor(http: HttpClient) { 
    super(http);
    this.endpoint = "director";
  }
}
