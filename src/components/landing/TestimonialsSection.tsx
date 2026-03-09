import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ananya Sharma",
    role: "Workshop Participant",
    text: "Shadow Arts workshops helped me reconnect with Indian traditional art. The instructors were amazing and the environment was so inspiring.",
  },
  {
    name: "Rahul Verma",
    role: "Art Enthusiast",
    text: "I attended the Warli workshop and absolutely loved it. The teaching style was simple and engaging. Highly recommended!",
  },
  {
    name: "Priya Nair",
    role: "Parent",
    text: "My daughter attended the summer camp and she learned so many art styles. It boosted her creativity and confidence.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container">

        {/* Section header */}

        <div className="text-center mb-16">
          <p className="font-body text-secondary tracking-[0.3em] uppercase text-sm mb-3">
            Testimonials
          </p>

          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            What Our Students Say
          </h2>
        </div>

        {/* Testimonials grid */}

        <div className="grid md:grid-cols-3 gap-8">

          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition"
            >

              {/* Stars */}

              <div className="flex gap-1 mb-4 text-secondary">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-secondary" />
                ))}
              </div>

              {/* Text */}

              <p className="font-body text-muted-foreground mb-6 leading-relaxed">
                "{t.text}"
              </p>

              {/* Name */}

              <div>
                <p className="font-display font-semibold text-foreground">
                  {t.name}
                </p>
                <p className="font-body text-sm text-muted-foreground">
                  {t.role}
                </p>
              </div>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}