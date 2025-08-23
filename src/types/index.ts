export interface UserAuthProps {
  email: string;
  password: string;
}

export interface ActivityProps {
  title: string;
  date: string;
  status?: "pendente" | "concluída" | "cancelada";
  avalition?: string;
  objecttives?: string;
  type?: string;
}
