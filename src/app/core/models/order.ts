export interface Order {
  id: number;
  userId?: number;
  nameUser?: string;
  orderDate: string;
  requiredDate: string;
  orderStatus?: 'Pendiente' | 'Pagado' | 'Cancelado';
  status: number;
  total?: number;
  shippingAddressId?: number;
  address?: string;
  city?: string;
  shippingMethod?: string;
  shippingDate?: string;
  sessionId?: string;
}
