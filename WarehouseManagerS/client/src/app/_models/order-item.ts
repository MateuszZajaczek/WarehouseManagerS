export interface OrderItem {
  orderItemId?: number; // Optional when creating a new order item
  productId: number;
  productName?: string; // Optional, for display purposes
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}
