import { useScrollReveal } from "@/hooks/useScrollReveal";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  { name: "Lavanya Reddy", role: "Mandala Art Student", text: "I never thought I could create something so beautiful with my own hands. The mandala workshop helped me discover a meditative side of art I didn't know existed. Every dot and pattern felt like therapy." },
  { name: "Sai Kiran Goud", role: "Summer Camp Parent", text: "My daughter attended the summer camp and came home with the most incredible Pichwai painting. The way they teach traditional art forms to young children with so much patience is truly remarkable." },
  { name: "Bhavana Devi", role: "Women's Workshop Graduate", text: "Shadow Arts gave me more than just an art skill — it gave me confidence. As a homemaker, learning Kalamkari opened doors to freelance work. I'm now earning through my art and it feels wonderful." },
];

export default function TestimonialsSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-24 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-body text-secondary tracking-[0.3em] uppercase text-sm mb-3">Testimonials</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">What Our Students Say</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="p-8 rounded-lg border border-border bg-card"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-secondary text-secondary" />
                ))}
              </div>
              <p className="font-body text-muted-foreground leading-relaxed mb-6 italic">"{t.text}"</p>
              <div>
                <p className="font-display font-semibold text-foreground">{t.name}</p>
                <p className="font-body text-sm text-muted-foreground">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
