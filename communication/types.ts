export interface Film {
  releaseDate: Date;
  showcased: boolean;
  sortTitle: string;
  slug: string;
  tenant: number;
  title: string;
}

export interface FilmStaffCredit {
  displayName: string;
  showcased: boolean;
  slug: string;
  order: string;
}

export interface FilmStaff {
  role: string;
  filmSlug: string;
  order: string;
  credits: FilmStaffCredit[];
}

export interface Person {
  displayName: string;
  showcased: boolean;
  slug: string;
  sortName: string;
  tenant: number;
}

export interface FilmRole {
  name: string;
  filmSlug: string;
  uncredited: boolean;
  slug: string;
  showcased: boolean;
  displayName: string;
}