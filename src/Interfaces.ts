export interface Validity {
  required: boolean;
  min?: number | null;
  max?: number | null;
  minlength?: number | null;
  maxlength?: number | null;
  pattern?: string;
}

export interface Option {
  id: string;
  key: string;
  value: string;
}

export interface Field {
  key: string;
  label: string;
  type: string;
  validation: Validity;
  options?: Option[];
}

export interface TypeLib {
  "Текстовое поле": string;
  "Числовое поле": string;
  "Пароль": string;
  "Чекбокс": string;
  "Номер телефона": string;
  "Выпадающий список": string;
}

export interface OptionField {
  id: string;
  key: string;
  value: string;
}

export interface Schema {
  name: string,
  fields: Field[]
}