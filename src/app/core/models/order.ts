export interface Order {
  id: number;
  userId?: number;
  nameUser?: string;
  orderDate?: Date;
  requriedDate?: Date;
  orderStatus?: string;
  status: number;
  total?: number;
}
