export interface University {
  id: string;
  name: string;
  image: string;
}

export interface UniversitySuggest {
  value: string;
  unrestricted_value: string;
  data: {
    address: string;
    inn: string;
    orgn: string;
    okpo: string;
  };
}
