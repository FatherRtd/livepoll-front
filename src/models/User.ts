export class User {
  constructor(user?: Partial<User>) {
    this.id = user?.id ?? 0;
    this.userName = user?.userName ?? "";
    this.email = user?.email ?? "";
    this.created_at = user?.created_at ?? new Date();
  }

  id: number;
  userName: string;
  email: string;
  created_at: Date;
}
