import * as React from "react";

import { currency } from "./utils";
import { Product } from "./types";

type Cart = Map<string, CartItem>;

interface CartItem extends Product {
  quantity: number;
}

interface Context {
  state: {
    cart: Cart;
    quantity: number;
    total: number;
    message: string;
  };
  actions: {
    addItem: (id: string, value: CartItem) => void;
    incrementItem: (id: string) => void;
    decrementItem: (id: string) => void;
    removeAll: () => void;
  };
}

interface Props {
  children: React.ReactNode;
}

const CartContext = React.createContext({} as Context);

const CartProvider: React.VFC<Props> = (props) => {
  const [cart, setCart] = React.useState<Cart>(() => new Map());

  const quantity = React.useMemo(
    () => Array.from(cart.values()).reduce((acc, item) => acc + item.quantity, 0),
    [cart],
  );
  const total = React.useMemo(
    () => Array.from(cart.values()).reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cart],
  );
  const itemsMsg = React.useMemo(
    () =>
      Array.from(cart.values())
        .map(
          (item) =>
            `${item.title} x  ${item.quantity} - ${currency(item.price * item.quantity)} \n`,
        )
        .join(", "),
    [cart],
  );

  const message = React.useMemo(
    () =>
      `https://api.whatsapp.com/send?phone=9999999&text=${encodeURIComponent(
        `${itemsMsg} \n - Total : ${currency(total)}`,
      )}`,
    [total, itemsMsg],
  );

  const addItem = React.useCallback(
    (id: string, value: CartItem) => {
      cart.set(id, {...value, quantity: value.quantity++});

      setCart(new Map(cart));
    },
    [cart],
  );

  const incrementItem = React.useCallback(
    (id: string) => {
      const item = cart.get(id);

      if (item) {
        cart.set(id, {...item, quantity: item.quantity + 1});
        setCart(new Map(cart));
      }
    },
    [cart],
  );

  const decrementItem = React.useCallback(
    (id: string) => {
      const item = cart.get(id);

      if (item) {
        if (item.quantity > 1) {
          cart.set(id, {...item, quantity: item.quantity - 1});
        } else {
          cart.delete(id);
        }
      }
      setCart(new Map(cart));
    },
    [cart],
  );

  const removeAll = React.useCallback(() => {
    setCart(new Map());
  }, []);

  const state = React.useMemo(
    () => ({cart, quantity, total, message}),
    [cart, quantity, total, message],
  );
  const actions = React.useMemo(
    () => ({addItem, incrementItem, decrementItem, removeAll}),
    [addItem, incrementItem, decrementItem, removeAll],
  );

  return <CartContext.Provider value={{state, actions}}>{props.children}</CartContext.Provider>;
};

export function useCart(): [Context["state"], Context["actions"]] {
  const {state, actions} = React.useContext(CartContext);

  return [state, actions];
}

export default CartProvider;