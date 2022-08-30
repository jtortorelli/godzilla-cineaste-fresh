export interface Film {
  releaseDate: Date;
  showcased: boolean;
  slug: string;
  tenant: number;
  title: string;
}

export interface Person {
  displayName: string;
  showcased: boolean;
  slug: string;
  sortName: string;
  tenant: number;
}
