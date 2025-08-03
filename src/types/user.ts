export interface User {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  birth_of_date: Date;
  phone_number: string;
  created_at: Date;
  update_at: Date;
  is_active: boolean;
  slug: string;
}
