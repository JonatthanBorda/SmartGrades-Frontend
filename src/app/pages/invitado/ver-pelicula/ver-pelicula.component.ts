import { Component, OnDestroy, OnInit } from '@angular/core';
import { PeliculaService } from '../../../core/services/pelicula.service';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { Pelicula } from '../../../core/models/pelicula.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TagModule } from 'primeng/tag';
import { Tag } from 'primeng/tag';

@Component({
  selector: 'app-ver-pelicula',
  imports: [
    Tag
  ],
  templateUrl: './ver-pelicula.component.html',
  styleUrl: './ver-pelicula.component.css',
})
export class VerPeliculaComponent implements OnInit, OnDestroy {

  pelicula: Pelicula | null = null;
  private unsubscribe$ = new Subject<void>();
  safeTrailerUrl: SafeResourceUrl | null = null;
  
  constructor(
    private servicioPelicula: PeliculaService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      this.cargarPelicula();
    });
  }

  cargarPelicula() {
    this.route.params.pipe(
      takeUntil(this.unsubscribe$),
      switchMap(params => {
        const id = params['id'];
        
        if (!id) {
          this.router.navigate(['/']);
          throw new Error('ID no proporcionado');
        }

        return this.servicioPelicula.ListarPorId(id);
      })
    ).subscribe({
      next: (resp: Pelicula) => {
        this.pelicula = resp;
        this.safeTrailerUrl = this.getSafeTrailerUrl(resp.codigoDeTrailerEnYoutube);
      },
    }
    );
  }

  private getSafeTrailerUrl(trailerCode: string): SafeResourceUrl {
    if (!trailerCode) {
      return this.sanitizer.bypassSecurityTrustResourceUrl('');
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${trailerCode}`
    );
  }

  private resetState(): void {
    this.pelicula = null;
    this.safeTrailerUrl = null;
  }
}
