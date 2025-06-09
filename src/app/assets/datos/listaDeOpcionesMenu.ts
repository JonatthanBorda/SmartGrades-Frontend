import { ListaOpciones } from "../../core/models/listaOpciones.model";

export const ListaDeOpcionesMenu: ListaOpciones[] = [
    {
      id: 1,
      icon: "pi pi-home", // icon de Inicio
      label: "Inicio",
      url: "/dashboard",
      opciones: []
    },
    {
      id: 2,
      icon: "pi pi-tags", // icon de Género
      label: "Género",
      url: "/dashboard/genero",
      opciones: []
    },
    {
      id: 3,
      icon: "pi pi-globe", // icon de País
      label: "País",
      url: "/dashboard/pais",
      opciones: []
    },
    {
      id: 4,
      icon: "pi pi-user", // icon de Actor
      label: "Actor",
      url: "/dashboard/actor",
      opciones: []
    },
    {
      id: 5,
      icon: "pi pi-video", // icon de Director
      label: "Director",
      url: "/dashboard/director",
      opciones: []
    },
    {
      id: 6,
      icon: "pi pi-users", // icon de Usuario
      label: "Usuario",
      url: "/dashboard/usuario",
      opciones: []
    },
    {
      id: 7, // Cambié el ID duplicado
      icon: "pi pi-video", // icon de Película
      label: "Película",
      url: "/dashboard/pelicula",
      opciones: []
    }
];
