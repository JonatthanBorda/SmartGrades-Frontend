import { ListaOpciones } from "../../core/models/listaOpciones.model";

export const ListaDeOpcionesMenu: ListaOpciones[] = [
    {
      id: 1,
      icon: "pi pi-home", //icon de Inicio
      label: "Inicio",
      url: "/",
      opciones: []
    },
    {
      id: 2,
      icon: "pi pi-user-plus",
      label: "Profesor",
      url: "/profesor",
      opciones: []
    },
    {
      id: 3,
      icon: "pi pi-user",
      label: "Estudiante",
      url: "/estudiante",
      opciones: []
    },
    {
      id: 4,
      icon: "pi pi-clipboard",
      label: "Notas",
      url: "/nota",
      opciones: []
    }
];
