import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Heart, Eye, Users, Sparkles } from "lucide-react";

const values = [
  {
    icon: Eye,
    title: "Vision",
    desc: "To redefine boundaries of artistic expression through the convergence of light, shadow, and creativity.",
  },
  {
    icon: Heart,
    title: "Passion",
    desc: "A deep love for art that drives us to curate and showcase unique perspectives from artists worldwide.",
  },
  {
    icon: Users,
    title: "Community",
    desc: "Building a vibrant online community where artists and enthusiasts connect and appreciate the beauty of shadows in art.",
  },
  {
    icon: Sparkles,
    title: "Innovation",
    desc: "Pushing the limits of contemporary art by exploring new mediums, techniques, and digital experiences.",
  },
];

export default function About() {
  const { ref: storyRef, isVisible: storyVisible } = useScrollReveal(0.3);
  const { ref: valuesRef, isVisible: valuesVisible } = useScrollReveal(0.2);
  const { ref: missionRef, isVisible: missionVisible } = useScrollReveal(0.3);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 w-72 h-72 border border-primary-foreground rounded-full" />
          <div className="absolute bottom-10 left-16 w-56 h-56 border border-primary-foreground rounded-full" />
        </div>
        <div className="container relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-body text-secondary tracking-[0.3em] uppercase text-sm mb-6"
          >
            Who We Are
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-display text-5xl md:text-7xl font-bold text-primary-foreground leading-[1.1] mb-6"
          >
            About <span className="text-secondary italic">Shadow Arts</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-body text-lg md:text-xl text-primary-foreground/70 max-w-2xl leading-relaxed"
          >
            Shadow Arts explores the convergence of light, shadow, and creativity
            through various forms of artistic expression. Our mission is to provide
            a platform for artists to showcase their unique perspectives and redefine
            boundaries.
          </motion.p>
        </div>
      </section>

      {/* Our Story */}
      <section ref={storyRef} className="py-24 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={storyVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="text-center mb-12"
            >
              <p className="font-body text-secondary tracking-[0.3em] uppercase text-sm mb-4">
                Our Journey
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-8">
                Our Story
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={storyVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-6"
            >
              <p className="font-body text-lg text-muted-foreground leading-relaxed">
                Founded in 2025, Shadow Arts started as a small exhibition space but
                quickly grew into an online community where artists and enthusiasts
                could connect and appreciate the beauty of shadows in art.
              </p>
              <p className="font-body text-lg text-muted-foreground leading-relaxed">
                What began as an intimate gallery celebrating the interplay of light
                and darkness has evolved into a comprehensive platform — offering
                immersive workshops, handcrafted artwork from master artisans, and
                curated programs that preserve and celebrate India's rich cultural
                heritage through traditional art forms.
              </p>
              <p className="font-body text-lg text-muted-foreground leading-relaxed">
                Today, Shadow Arts bridges the gap between ancient artistic traditions
                and contemporary expression, making these timeless art forms accessible
                to a new generation of creators and collectors.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section ref={valuesRef} className="py-24 bg-primary">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={valuesVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="font-body text-secondary tracking-[0.3em] uppercase text-sm mb-4">
              What Drives Us
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground">
              Our Values
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                animate={valuesVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-secondary/20 flex items-center justify-center group-hover:bg-secondary/30 transition-colors">
                  <v.icon className="h-7 w-7 text-secondary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-primary-foreground mb-3">
                  {v.title}
                </h3>
                <p className="font-body text-sm text-primary-foreground/60 leading-relaxed">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section ref={missionRef} className="py-24 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={missionVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <p className="font-body text-secondary tracking-[0.3em] uppercase text-sm mb-4">
                Our Purpose
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-8">
                Our Mission
              </h2>
              <p className="font-body text-xl text-muted-foreground leading-relaxed mb-6">
                To provide a platform for artists to showcase their unique
                perspectives and redefine boundaries — exploring the interplay of
                light and darkness through contemporary art.
              </p>
              <p className="font-body text-lg text-muted-foreground leading-relaxed">
                We believe every shadow tells a story, every brushstroke carries a
                legacy, and every art form deserves to be preserved, celebrated, and
                shared with the world.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
