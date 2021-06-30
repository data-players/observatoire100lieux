import {Place} from './place.model';
import {DigitalPlace} from './digital-place.model';

export class PhysicalPlace {
  constructor(
    public hasPostalAddress: Place = new Place(),
    public hasDigitalPlace: DigitalPlace[] = [])
  {
  };
}
