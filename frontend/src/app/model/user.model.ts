
export class User{
  email!: string;
  familyName!: string;
  name!: string;
  iat?: number;

  get username() {
    return this.name + ' ' + this.familyName;
  }

  assignData(values: Partial<User>) {
    Object.assign(this, values);
  }

}
