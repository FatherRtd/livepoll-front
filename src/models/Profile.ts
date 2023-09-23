export class Profile {
  constructor(profile?: Partial<Profile>) {
    this.id = profile?.id ?? 0;
    this.userName = profile?.userName ?? "";
    this.email = profile?.email ?? "";
  }

  id: number;
  userName: string;
  email: string;
}
