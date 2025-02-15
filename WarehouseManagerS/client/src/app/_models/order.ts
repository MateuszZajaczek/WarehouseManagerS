import { OrderItem } from "./order-item";

export interface Order {
  orderId?: number;
  userId: number;
  userName: string;
  orderDate?: string; 
  totalAmount: number;
  orderStatus: string;
  createdAt?: string;
  orderItems: OrderItem[];
}
