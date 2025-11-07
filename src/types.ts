export type Status = "pending" | "completed";

export type Todo = {
  id: ReturnType<typeof crypto.randomUUID>;
  text: string;
  status: Status;
};
