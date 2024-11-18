import { OrderItem } from "./order-item";

export interface Order {
  orderId?: number;
  userId: number;
  userName: string;
  orderDate?: string; // ISO string received from backend
  totalAmount: number;
  orderStatus: string;
  createdAt?: string;
  orderItems: OrderItem[];
}
