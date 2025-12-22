/**
 * Convertit une valeur en entier strict (Int) ou lève une erreur.
 * Utilisation prévue : valider les `id` reçus depuis `req.params`.
 *
 * @param id - valeur à convertir (string|number|unknown)
 * @returns number entier valide
 * @throws Error si la conversion échoue
 */
export function toIntId(id: unknown): number {
  if (typeof id === "number" && Number.isInteger(id)) {
    return id;
  }

  if (typeof id === "string") {
    const trimmed = id.trim();
    if (trimmed === "") {
      throw new Error("Invalid id: empty string");
    }
    const n = Number(trimmed);
    if (Number.isInteger(n)) {
      return n;
    }
  }

  throw new Error("Invalid integer id");
}

export default toIntId;
