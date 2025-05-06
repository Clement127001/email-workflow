export interface EmailData {
  id: string;
  name: string;
  subject: string;
  body: string;
  createdAt: Date;
}

export interface CreateEmail {
  subject: string;
  body: string;
  name: string;
}
