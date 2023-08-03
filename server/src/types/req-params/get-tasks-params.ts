import { TaskFilterParams, UsersFilterParams } from './filter-req-params';
import { OrderByReqParams } from './order-by-req-params';
import { PaginatedReqParams } from './paginated-req-params';
import { SearchReqParams } from './search-req-params';

export type GetTasksReqParams = OrderByReqParams &
  PaginatedReqParams &
  TaskFilterParams &
  SearchReqParams;
