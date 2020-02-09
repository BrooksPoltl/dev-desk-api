export interface User {
  id: number;
  firstName: string;
  lastName: string;
  password: string;
  student: boolean;
  helper: boolean;
  username: string;
}

export interface ErrorHandler {
  status: number;
  message: string;
}

export interface Token {
  username: string;
  firstName: string;
  lastName: string;
  student: boolean;
  helper: boolean;
  id: number;
}

export interface Ticket {
  id: number;
  assignedTo: number;
  createdBy: number;
  description: string;
  open: boolean;
}
