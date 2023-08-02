import { FilterParams } from './filter-req-params';
import { OrderByReqParams } from './order-by-req-params';
import { PaginatedReqParams } from './paginated-req-params';

export type GetTasksReqParams = OrderByReqParams & PaginatedReqParams & FilterParams;
