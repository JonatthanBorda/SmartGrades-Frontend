import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { DatosUsuario } from '../models/datosUsuario.model';
import { InicioSesion } from '../models/inicioSesion.model';
import { TokenUser } from '../models/token.model';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService { 

  private readonly TOKEN_NAME = 'token';
  private readonly REFRESH_TOKEN_NAME = 'refreshToken';
  private readonly apiUrl = environment.apiUrlBase;
  private readonly endpoint = 'autenticacion';
  private autenticadoSubject = new BehaviorSubject<boolean>(!!this.token);
  private usuarioSubject = new BehaviorSubject<DatosUsuario>({} as DatosUsuario);
  
  fechaNacimiento = signal<string>('');

  constructor(private http: HttpClient, private cookieService: CookieService, 
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.autenticadoSubject.next(!!this.token);
    }
   }


  getTokenUsuario(): boolean {
    return !!this.token;
  }

  get token(): string {
    if (isPlatformBrowser(this.platformId)) {
      return this.cookieService.get(this.TOKEN_NAME) || '';
    }
    return ''; // Si estamos en el servidor, devolvemos un string vacío
  }

  get refreshToken(): string {
    if (isPlatformBrowser(this.platformId)) {
      return this.cookieService.get(this.REFRESH_TOKEN_NAME) || '';
    }
    return '';
  }

  set token(valor: string) {
    this.cookieService.set(this.TOKEN_NAME, valor, { expires: 7, path: '/' });
    this.autenticadoSubject.next(!!valor);
  }

  set refreshToken(valor: string) {
    this.cookieService.set(this.REFRESH_TOKEN_NAME, valor, { expires: 7, path: '/' });
    this.autenticadoSubject.next(!!valor);
  }

  get autenticado$() {
    return this.autenticadoSubject.asObservable();
  }

  get datosAutenticado$() {
    const datosEnMemoria = this.usuarioSubject.getValue();
    
    if (Object.keys(datosEnMemoria).length === 0 && this.token) {
      // Solo hacer la llamada si no hay datos cargados y si hay un token válido
      this.DatosUsuario().subscribe(datosUsuario => {
        this.datosAutenticado = datosUsuario;
      });
    }
  
    return this.usuarioSubject.asObservable();
  }

  set datosAutenticado(dato: DatosUsuario) {
    this.usuarioSubject.next(dato);
  }

  IniciarSesion(datos: InicioSesion): Observable<TokenUser> {
    return this.http.post<TokenUser>(`${this.apiUrl}/${this.endpoint}/iniciar-sesion`, datos).pipe(
      tap(resp => {
        this.token = resp.token;
        this.refreshToken = resp.refreshToken
      })
    );
  }

  RefrescarToken(): Observable<TokenUser> {
    // Mandar el refresh token en el encabezado
    return this.http.get<TokenUser>(`${this.apiUrl}/${this.endpoint}/refrescar-token`)
  }

  DatosUsuario(): Observable<DatosUsuario> {
    return this.http.get<DatosUsuario>(`${this.apiUrl}/${this.endpoint}/datos-usuario`);
  }

  cerrarSesion() {
    this.cookieService.delete(this.TOKEN_NAME);
    this.cookieService.delete(this.REFRESH_TOKEN_NAME);
    this.cookieService.deleteAll("/");

    localStorage.removeItem(this.TOKEN_NAME);
    localStorage.removeItem(this.REFRESH_TOKEN_NAME);
 

    this.autenticadoSubject.next(false);
    this.usuarioSubject.next({} as DatosUsuario);
  }
}
