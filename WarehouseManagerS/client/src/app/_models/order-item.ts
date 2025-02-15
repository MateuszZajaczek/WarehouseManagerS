export interface OrderItem {
  orderItemId?: number; 
  productId: number;
  productName?: string; 
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}
