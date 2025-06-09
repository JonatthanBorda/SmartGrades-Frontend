import { Injectable } from '@angular/core';
import { GenericoService } from './generico.service';
import { Actor, ComandoActor } from '../models/actor.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ActorService extends GenericoService<Actor, ComandoActor> {

  constructor(http: HttpClient) { 
    super(http);
    this.endpoint = "actor";
  }
}
