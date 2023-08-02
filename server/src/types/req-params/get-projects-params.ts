import { OrderByReqParams } from './order-by-req-params';
import { PaginatedReqParams } from './paginated-req-params';
import { SearchReqParams } from './search-req-params';

export type GetProjectsReqParams = OrderByReqParams & PaginatedReqParams & SearchReqParams;
