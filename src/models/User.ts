export class User {
  constructor(user?: Partial<User>) {
    this.id = user?.id ?? 0;
    this.userName = user?.userName ?? "";
    this.email = user?.email ?? "";
  }

  id: number;
  userName: string;
  email: string;
}
