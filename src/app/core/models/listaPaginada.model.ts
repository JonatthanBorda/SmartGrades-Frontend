export interface ListaPaginada<T> {
  elementos: T[];
  pagina: number;
  tamanoPagina: number;
  cantidadTotal: number;
  tieneSiguientePagina: boolean,
  tienePaginaAnterior: boolean
}