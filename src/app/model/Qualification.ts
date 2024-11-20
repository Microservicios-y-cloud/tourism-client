export enum Qualification {
  DEFICIENTE = 0,
  REGULAR = 1,
  SATISFACTORIO = 2,
  BUENO = 3,
  SOBRESALIENTE = 4,
}

export namespace Qualification {
  export function fromEstrellas(estrellas: number): Qualification {
    switch (estrellas) {
      case 1: return Qualification.DEFICIENTE;
      case 2: return Qualification.REGULAR;
      case 3: return Qualification.SATISFACTORIO;
      case 4: return Qualification.BUENO;
      case 5: return Qualification.SOBRESALIENTE;
      default: throw new Error("Calificación no válida: " + estrellas);
    }
  }
}