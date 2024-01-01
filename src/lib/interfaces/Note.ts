export interface Note {
  id: number;
  created_at: string;
  last_updated: string | null;
  title: string;
  content: string;
  is_publicly_visble: boolean;
  is_draft: boolean;
}

export interface CreateNote {
  title: string;
  content: string;
  is_publicly_visble: boolean;
  is_draft: boolean;
}

export interface UpdateNote {
  title: string;
  content: string;
  is_publicly_visble: boolean;
  is_draft: boolean;
}
