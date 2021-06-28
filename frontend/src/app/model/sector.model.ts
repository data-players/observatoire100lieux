import {Branch} from './branch.model';

export interface Sector {
  id: string;
  label: string;
  extendedBy: Branch[]
}
