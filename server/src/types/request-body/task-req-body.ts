export interface CreateTaskReqBody {
  title: string;
  description?: string;
  status: number;
  priority: number;
  assignedUserId: number | null;
  projectId: number;
}
