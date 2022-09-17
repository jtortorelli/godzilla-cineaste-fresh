export interface PosterUrl {
  url: string;
  primary: boolean;
}

export interface FilmAlias {
  title: string;
  context: string;
}

export interface OriginalTitle {
  original: string;
  transliteration: string;
  translation: string;
}

export interface Film {
  releaseDate: Date;
  showcased: boolean;
  sortTitle: string;
  slug: string;
  tenant: number;
  title: string;
  posterUrls: PosterUrl[];
  runtime: number;
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
  avatarUrl: string;
  slug: string;
  showcased: boolean;
  displayName: string;
}

export interface FilmSeriesEntryInfo {
  slug: string;
  title: string;
  releaseDate: Date;
}

export interface FilmSeriesInfo {
  seriesName: string;
  entryNumber: number;
  precededBy: FilmSeriesEntryInfo;
  followedBy: FilmSeriesEntryInfo;
}

export interface FilmView {
  slug: string;
  title: string;
  releaseDate: Date;
  runtime: number;
  posterUrls: PosterUrl[];
  studios: string[];
  aliases: FilmAlias[];
  originalTitle: OriginalTitle;
  seriesInfo: FilmSeriesInfo;
}
