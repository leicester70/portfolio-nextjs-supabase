export interface UserCredentials {
  email: string;
  password: string;
}

export interface Note {
  created_at: Date;
  last_updated: Date | null;
  title: string;
  content: string;
  is_visible_to_public: boolean;
}
