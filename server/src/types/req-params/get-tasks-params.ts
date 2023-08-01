import { OrderByReqParams } from './order-by-req-params';
import { PaginatedReqParams } from './paginated-req-params';

export interface GetTasksReqParams extends OrderByReqParams, PaginatedReqParams {}
