export class Place {
  constructor (
    public label: string = '',
    public addressCountry: string = '',
    public addressZipcode: string = '',
    public addressStreet: string = '',
    public locality: string = '',
    public latitude: number = 0,
    public longitude: number = 0
  ){}

  public get fullAddress() {
    return `rrr${this.addressStreet}, ${this.addressZipcode}, ${this.locality}`;
  }
}
