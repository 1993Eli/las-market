import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const products = [
  {
    id: 1,
    name: "צלחות חד פעמיות",
    description: "חבילה של 50 יחידות",
    price: 12.9,
    image: "/plates.jpg",
  },
  {
    id: 2,
    name: "חטיפים",
    description: "מבחר חטיפים לבחירה",
    price: 5.9,
    image: "/snacks.jpg",
  },
  {
    id: 3,
    name: "משקאות",
    description: "בקבוקים ליחיד או למארז",
    price: 7.5,
    image: "/drinks.jpg",
  },
];

export default function HomePage() {
  const [cart, setCart] = useState([]);
  const [isCheckout, setIsCheckout] = useState(false);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    setIsCheckout(true);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <header className="bg-yellow-400 p-6 shadow-md">
        <h1 className="text-3xl font-bold text-center">לאס המרקט</h1>
        <p className="text-center text-lg">חנות אונליין למוצרים חד פעמיים ומוצרי מזון</p>
      </header>

      {!isCheckout ? (
        <>
          <main className="p-6 grid gap-6 md:grid-cols-3">
            {products.map((product) => (
              <Card key={product.id}>
                <CardContent className="flex flex-col items-center p-4">
                  <img src={product.image} alt={product.name} className="h-32 object-contain mb-2" />
                  <h2 className="text-xl font-semibold">{product.name}</h2>
                  <p className="text-sm text-gray-600">{product.description}</p>
                  <p className="text-lg font-bold mt-2">₪{product.price.toFixed(2)}</p>
                  <Button className="mt-3" onClick={() => addToCart(product)}>הוסף לסל</Button>
                </CardContent>
              </Card>
            ))}
          </main>

          <section className="p-6 bg-gray-50 mt-6">
            <h2 className="text-2xl font-bold mb-4">סל הקניות שלך</h2>
            {cart.length === 0 ? (
              <p>הסל שלך ריק</p>
            ) : (
              <ul className="space-y-2">
                {cart.map((item, index) => (
                  <li key={index} className="flex justify-between border-b pb-1">
                    <span>{item.name}</span>
                    <span>₪{item.price.toFixed(2)}</span>
                  </li>
                ))}
                <li className="flex justify-between font-bold border-t pt-2">
                  <span>סה"כ לתשלום</span>
                  <span>₪{total.toFixed(2)}</span>
                </li>
              </ul>
            )}
            {cart.length > 0 && (
              <Button className="mt-4 w-full" onClick={handleCheckout}>לתשלום</Button>
            )}
          </section>
        </>
      ) : (
        <section className="p-6">
          <h2 className="text-2xl font-bold mb-4">לתשלום</h2>
          <form className="space-y-4 max-w-md mx-auto">
            <div>
              <label className="block mb-1 font-semibold">שם מלא</label>
              <input type="text" className="w-full border p-2 rounded" placeholder="לדוגמה: דוד לוי" required />
            </div>
            <div>
              <label className="block mb-1 font-semibold">כתובת משלוח</label>
              <input type="text" className="w-full border p-2 rounded" placeholder="רחוב, עיר, מיקוד" required />
            </div>
            <div>
              <label className="block mb-1 font-semibold">מספר טלפון</label>
              <input type="tel" className="w-full border p-2 rounded" placeholder="050-1234567" required />
            </div>
            <div>
              <label className="block mb-1 font-semibold">הערות להזמנה</label>
              <textarea className="w-full border p-2 rounded" rows="3" placeholder="האם יש משהו שכדאי לדעת?" />
            </div>
            <Button className="w-full mt-4">שלח הזמנה</Button>
          </form>
        </section>
      )}

      <footer className="bg-gray-100 p-4 text-center mt-6">
        <p>© 2025 לאס המרקט. כל הזכויות שמורות.</p>
      </footer>
    </div>
  );
}
