import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, X, ZoomIn } from "lucide-react";
import { useCart } from "@/hooks/useCart";

import warliImg from "@/assets/shop-warli-painting.jpg";
import madhubaniImg from "@/assets/shop-madhubani-canvas.jpg";
import pichwaiImg from "@/assets/shop-pichwai-art.jpg";
import gondImg from "@/assets/shop-gond-art.jpg";
import kalamkariImg from "@/assets/shop-kalamkari-textile.jpg";
import mandalaImg from "@/assets/shop-mandala-print.jpg";

const fallbackImages = [
  warliImg,
  madhubaniImg,
  pichwaiImg,
  gondImg,
  kalamkariImg,
  mandalaImg,
];

function getProductImage(product: any, index: number): string {
  if (product.image_url) return product.image_url;
  return fallbackImages[index % fallbackImages.length];
}

export default function Shop() {

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);

  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {

    fetch("/api/products/")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));

  }, []);

  const handleAdd = (e: React.MouseEvent, product: any) => {

    e.stopPropagation();

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      quantity: 1,
    });

    toast({
      title: "Added to cart",
      description: product.name,
    });

  };

  return (

    <Layout>

      <section className="py-24 bg-background min-h-screen">

        <div className="container">

          <div className="text-center mb-16">

            <p className="font-body text-secondary tracking-[0.3em] uppercase text-sm mb-3">
              Handcrafted Art
            </p>

            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Crafted with Culture
            </h1>

          </div>

          {/* Coming Soon Banner */}

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-12 rounded-2xl border-2 border-dashed border-secondary/40 bg-secondary/5 p-8 md:p-12 text-center"
          >

            <motion.p
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="font-display text-3xl md:text-4xl font-bold text-secondary mb-3"
            >
              Coming Soon
            </motion.p>

            <p className="font-body text-muted-foreground text-sm md:text-base max-w-md mx-auto">
              Our handcraft store is being curated with love.
            </p>

          </motion.div>

          {loading ? (

            <p className="text-center font-body text-muted-foreground">
              Loading products...
            </p>

          ) : products.length === 0 ? (

            <p className="text-center font-body text-muted-foreground">
              No products available yet.
            </p>

          ) : (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

              {products.map((p, i) => (

                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -10 }}
                  onClick={() => setSelectedProduct(i)}
                  className="group relative rounded-2xl overflow-hidden border border-border bg-card shadow-lg hover:shadow-2xl transition-shadow duration-500 cursor-pointer"
                >

                  <div className="relative aspect-[4/5] overflow-hidden">

                    <img
                      src={getProductImage(p, i)}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent opacity-60" />

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">

                      <div className="w-14 h-14 rounded-full bg-secondary/80 flex items-center justify-center shadow-lg">

                        <ZoomIn className="h-6 w-6 text-secondary-foreground" />

                      </div>

                    </div>

                    <div className="absolute top-4 right-4">

                      <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-secondary/90 text-secondary-foreground font-display text-xs font-bold backdrop-blur-sm shadow-md">
                        Coming Soon
                      </span>

                    </div>

                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-5">

                    <h3 className="font-display text-xl font-bold text-foreground mb-1">
                      {p.name}
                    </h3>

                    <p className="font-body text-sm text-muted-foreground line-clamp-2">
                      {p.description}
                    </p>

                  </div>

                </motion.div>

              ))}

            </div>

          )}

        </div>

      </section>

    </Layout>

  );

}