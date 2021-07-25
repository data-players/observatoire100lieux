import {PhysicalPlace} from './physical-place.model';
import {Branch} from './branch.model';
import {Domain} from './domain.model';
import {Document} from './document.model';

export class Organization {
  constructor(
     public id: string = '',
     public label: string = '',
     public description: string = '',
     public homepage: string = '',
     public comment: string[] = [],
     public hasBranch: Branch[] = [],
     public hasDomain: Domain[] = [],
     public documentedBy: string = '',
     public phone: string = '',
     public email: string = '',
     public accessrules: string = '',
     public timetable: string = '',
     public socialLink: [] = [],
     public hasLocation: PhysicalPlace = new PhysicalPlace()
    ){}
}
