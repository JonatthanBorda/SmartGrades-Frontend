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
      label: "Profesor",
      url: "/dashboard/profesor",
      opciones: []
    },
    {
      id: 3,
      icon: "pi pi-globe", // icon de País
      label: "Estudiante",
      url: "/dashboard/estudiante",
      opciones: []
    },
    {
      id: 4,
      icon: "pi pi-user", // icon de Actor
      label: "Notas",
      url: "/dashboard/nota",
      opciones: []
    },
    {
      id: 6,
      icon: "pi pi-users", // icon de Usuario
      label: "Usuario",
      url: "/dashboard/usuario",
      opciones: []
    }
];
