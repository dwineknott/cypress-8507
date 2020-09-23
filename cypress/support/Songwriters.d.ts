export interface Attributes {
  access_type: string;
  first_name: string;
  full_name: string;
  last_name: string;
  middle_name: string;
  publishing_company: string;
  songwriter_type: string;
}

export interface Datum {
  attributes: Attributes;
  id: number;
  type: string;
}

export interface Meta {
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total_count: number;
}

export interface RootObject {
  data: Datum[];
  meta: Meta;
}