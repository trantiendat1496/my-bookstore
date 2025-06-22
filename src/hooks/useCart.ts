import { useCartStore } from '@/store/cart';

export const useCart = () => {
  const { items, addItem, updateQuantity, removeItem, clearCart } = useCartStore();
  return { items, addItem, updateQuantity, removeItem, clearCart };
};