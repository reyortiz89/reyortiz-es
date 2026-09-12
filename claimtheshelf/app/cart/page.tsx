import { CartList } from "@/components/CartList";

export const metadata = { title: "Your cart" };

export default function CartPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-8 pt-8 flex flex-col gap-4">
      <h1 className="font-display text-5xl tracking-wide">YOUR CART</h1>
      <p className="text-sm text-ink/70">Companies you saved while walking the aisle. Stored in this browser only.</p>
      <CartList />
    </div>
  );
}
