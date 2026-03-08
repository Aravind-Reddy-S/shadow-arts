import { motion, AnimatePresence } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState } from "react";
import { Instagram, Youtube, MessageCircle, ArrowUpRight } from "lucide-react";

import teamArunkumar from "@/assets/team-arunkumar.png";
import teamChandhana from "@/assets/team-chandhana.png";
import teamVarshitha from "@/assets/team-varshitha.png";
import teamSushmitha from "@/assets/team-sushmitha.png";
import teamAravind from "@/assets/team-aravind.png";
import teamBhagath from "@/assets/team-bhagath.png";
import teamSrinivas from "@/assets/team-srinivas.png";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  funFact: string;
  objectPosition?: string;
  socials?: {
    instagram?: string;
    youtube?: string;
    whatsapp?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    name: "Arunkumar Parkala",
    role: "Founder & CEO",
    image: teamArunkumar,
    funFact: "Believes every shadow tells a story. Started Shadow Arts from a single workshop in 2020.",
    socials: { instagram: "#", youtube: "#", whatsapp: "#" },
  },
  {
    name: "Chandhana",
    role: "Co-Founder & CCO",
    image: teamChandhana,
    funFact: "The creative force behind every visual identity. Turns chaos into breathtaking art.",
    socials: { instagram: "#", whatsapp: "#" },
  },
  {
    name: "Varshitha",
    role: "Creative Head",
    image: teamVarshitha,
    funFact: "Can sketch your portrait in under 3 minutes. Lives and breathes color theory.",
    socials: { instagram: "#" },
  },
  {
    name: "Sushmitha",
    role: "Workshop Community Head",
    image: teamSushmitha,
    funFact: "Has organized 200+ workshops. Her energy is contagious in every session.",
    socials: { instagram: "#", whatsapp: "#" },
  },
  {
    name: "Sangem Aravind Reddy",
    role: "Technical Head",
    image: teamAravind,
    objectPosition: "top",
    funFact: "The tech wizard who bridges art and code. Builds the digital backbone of Shadow Arts.",
    socials: { instagram: "#", youtube: "#" },
  },
  {
    name: "Bhagath Vallala",
    role: "R&D Engineer",
    image: teamBhagath,
    objectPosition: "top",
    funFact: "Always experimenting with new mediums. If it exists, he's tried to make art with it.",
    socials: { instagram: "#" },
  },
  {
    name: "Srinivas",
    role: "UI/UX Designer & Developer",
    image: teamSrinivas,
    funFact: "Obsessed with pixel-perfect designs. Bridges the gap between beautiful interfaces and flawless code.",
    socials: { instagram: "#" },
  },
];

/* ── Horizontal Hover-Reveal Row ── */
function MemberRow({ member, index }: { member: TeamMember; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative cursor-pointer"
    >
      {/* Main row */}
      <div className="relative flex items-center gap-5 md:gap-8 py-6 md:py-8 border-b border-white/[0.07] hover:border-secondary/30 transition-colors duration-500">
        {/* Number */}
        <motion.span
          animate={{ opacity: hovered ? 1 : 0.2, x: hovered ? 4 : 0 }}
          transition={{ duration: 0.3 }}
          className="font-display text-sm md:text-base text-secondary/80 w-8 shrink-0 tabular-nums"
        >
          {String(index + 1).padStart(2, "0")}
        </motion.span>

        {/* Avatar — circular, reveals on hover with scale */}
        <div className="relative w-12 h-12 md:w-16 md:h-16 shrink-0 overflow-hidden rounded-full bg-white/5">
          <motion.img
            src={member.image}
            alt={member.name}
            style={member.objectPosition ? { objectPosition: member.objectPosition } : undefined}
            className="w-full h-full object-cover"
            animate={{
              filter: hovered ? "grayscale(0%)" : "grayscale(100%)",
              scale: hovered ? 1.15 : 1,
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
          {/* Colored ring on hover */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 rounded-full ring-2 ring-secondary/50"
          />
        </div>

        {/* Name & Role */}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-3 md:gap-4">
            <motion.h3
              animate={{ x: hovered ? 8 : 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-xl md:text-3xl lg:text-4xl font-bold text-primary-foreground leading-none truncate"
            >
              {member.name}
            </motion.h3>
            <motion.div
              animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -10 }}
              transition={{ duration: 0.3, delay: 0.05 }}
            >
              <ArrowUpRight className="w-5 h-5 text-secondary shrink-0" />
            </motion.div>
          </div>
          <motion.p
            animate={{ x: hovered ? 8 : 0, opacity: hovered ? 1 : 0.5 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="font-body text-xs md:text-sm tracking-[0.15em] uppercase text-secondary/70 mt-1.5"
          >
            {member.role}
          </motion.p>
        </div>

        {/* Social icons — desktop only, slide in from right */}
        <div className="hidden md:flex items-center gap-2">
          <AnimatePresence>
            {hovered && member.socials && (
              <>
                {member.socials.instagram && (
                  <motion.a
                    href={member.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 12, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 8, scale: 0.8 }}
                    transition={{ duration: 0.3, delay: 0 }}
                    className="w-9 h-9 rounded-full bg-white/[0.06] backdrop-blur-sm flex items-center justify-center text-white/60 hover:bg-secondary hover:text-primary transition-colors duration-200"
                  >
                    <Instagram className="w-4 h-4" />
                  </motion.a>
                )}
                {member.socials.youtube && (
                  <motion.a
                    href={member.socials.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 12, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 8, scale: 0.8 }}
                    transition={{ duration: 0.3, delay: 0.05 }}
                    className="w-9 h-9 rounded-full bg-white/[0.06] backdrop-blur-sm flex items-center justify-center text-white/60 hover:bg-secondary hover:text-primary transition-colors duration-200"
                  >
                    <Youtube className="w-4 h-4" />
                  </motion.a>
                )}
                {member.socials.whatsapp && (
                  <motion.a
                    href={member.socials.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 12, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 8, scale: 0.8 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="w-9 h-9 rounded-full bg-white/[0.06] backdrop-blur-sm flex items-center justify-center text-white/60 hover:bg-secondary hover:text-primary transition-colors duration-200"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </motion.a>
                )}
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Background highlight on hover */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 -mx-6 rounded-2xl bg-white/[0.02] pointer-events-none"
        />

        {/* Accent line left edge */}
        <motion.div
          animate={{ scaleY: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-0 top-2 bottom-2 w-[2px] bg-secondary origin-top rounded-full"
        />
      </div>

      {/* Expandable detail panel — slides down on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="flex items-start gap-5 md:gap-8 pb-6 pl-[3.25rem] md:pl-[6.5rem]">
              <div className="flex-1">
                <p className="font-body text-sm text-primary-foreground/50 leading-relaxed max-w-lg">
                  "{member.funFact}"
                </p>
                {/* Mobile socials */}
                <div className="flex md:hidden items-center gap-2 mt-3">
                  {member.socials?.instagram && (
                    <a href={member.socials.instagram} target="_blank" rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center text-white/60 hover:bg-secondary hover:text-primary transition-colors">
                      <Instagram className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {member.socials?.youtube && (
                    <a href={member.socials.youtube} target="_blank" rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center text-white/60 hover:bg-secondary hover:text-primary transition-colors">
                      <Youtube className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {member.socials?.whatsapp && (
                    <a href={member.socials.whatsapp} target="_blank" rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center text-white/60 hover:bg-secondary hover:text-primary transition-colors">
                      <MessageCircle className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function TeamSection() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section ref={ref} className="relative py-28 md:py-36 overflow-hidden bg-primary">
      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--secondary)) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container relative z-10 max-w-5xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-body text-secondary/60 tracking-[0.35em] uppercase text-[11px] mb-3">
              The People
            </p>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-[0.9]">
              Meet the
              <br />
              <span className="italic text-secondary">Team</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="font-body text-primary-foreground/40 text-sm max-w-xs leading-relaxed"
          >
            Hover over each name to reveal the humans behind Shadow Arts.
          </motion.p>
        </div>

        {/* Top border */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isVisible ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="h-px bg-white/10 origin-left mb-0"
        />

        {/* Rows */}
        <div>
          {teamMembers.map((member, i) => (
            <MemberRow key={member.name} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
