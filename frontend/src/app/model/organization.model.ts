import {PhysicalPlace} from './physical-place.model';
import {Branch} from './branch.model';
import {Domain} from './domain.model';

export interface Organization {
  id: string;
  label: string;
  description: string;
  homepage: string;
  comment: string[];
  hasBranch: Branch[]
  hasDomain: Domain[]
  phone: string;
  email: string;
  hasLocation: PhysicalPlace;
}
