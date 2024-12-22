export enum Role {
  Student = "student",
  Parent = "parent",
}

// Create a type for Student and Parent
export type Student = {
  role: Role.Student;
  name: string;
  age: number;
};

export type Parent = {
  role: Role.Parent;
  name: string;
  childrenCount: number;
};
