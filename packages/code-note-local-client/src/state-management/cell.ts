export type CellTypes = "code" | "text";

export type Direction = "up" | "down";

export interface CellProperties {
  id: string;
  type: CellTypes;
  data: string;
}
