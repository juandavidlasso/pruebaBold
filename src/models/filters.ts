import { SalesType } from './dashboard';

export type FiltersType = 'Hoy' | 'Esta semana' | 'Septiembre' | '';

export interface FiltersState {
    name: SalesType | 'ALL';
    title: string;
}
