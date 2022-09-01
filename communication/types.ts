export interface Film {
  releaseDate: Date;
  showcased: boolean;
  sortTitle: string;
  slug: string;
  tenant: number;
  title: string;
}

export interface FilmRoleCredit {
  displayName: string;
  showcased: boolean;
  slug: string;
  order: string;
}

export interface FilmRole {
  role: string;
  filmSlug: string;
  order: string;
  credits: FilmRoleCredit[];
}

export interface Person {
  displayName: string;
  showcased: boolean;
  slug: string;
  sortName: string;
  tenant: number;
}
