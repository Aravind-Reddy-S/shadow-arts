import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState } from "react";
import { Instagram, Youtube, MessageCircle } from "lucide-react";

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
  ringColor: string;
  nameColor: string;
  objectPosition?: string;
  socials?: {
    instagram?: string;
    youtube?: string;
    whatsapp?: string;
  };
}

const topRow: TeamMember[] = [
  {
    name: "Arunkumar Parkala",
    role: "Founder & CEO",
    image: teamArunkumar,
    funFact: "Started Shadow Arts from a single workshop in 2020.",
    ringColor: "from-orange-400 to-red-500",
    nameColor: "text-orange-500",
    socials: { instagram: "#", youtube: "#", whatsapp: "#" },
  },
  {
    name: "Varshitha",
    role: "Creative Head",
    image: teamVarshitha,
    funFact: "Can sketch your portrait in under 3 minutes.",
    ringColor: "from-amber-400 to-yellow-500",
    nameColor: "text-amber-500",
    socials: { instagram: "#" },
  },
  {
    name: "Sangem Aravind Reddy",
    role: "Technical Head",
    image: teamAravind,
    objectPosition: "top",
    funFact: "Bridges art and code — the digital backbone.",
    ringColor: "from-teal-400 to-emerald-500",
    nameColor: "text-teal-500",
    socials: { instagram: "#", youtube: "#" },
  },
  {
    name: "Srinivas",
    role: "UI/UX Designer & Developer",
    image: teamSrinivas,
    funFact: "Pixel-perfect designs meet flawless code.",
    ringColor: "from-violet-400 to-purple-500",
    nameColor: "text-violet-500",
    socials: { instagram: "#" },
  },
];

const bottomRow: TeamMember[] = [
  {
    name: "Chandhana",
    role: "Co-Founder & CCO",
    image: teamChandhana,
    funFact: "The creative force behind every visual identity.",
    ringColor: "from-blue-400 to-indigo-500",
    nameColor: "text-blue-500",
    socials: { instagram: "#", whatsapp: "#" },
  },
  {
    name: "Sushmitha",
    role: "Workshop Community Head",
    image: teamSushmitha,
    funFact: "Has organized 200+ workshops across India.",
    ringColor: "from-pink-400 to-rose-500",
    nameColor: "text-pink-500",
    socials: { instagram: "#", whatsapp: "#" },
  },
  {
    name: "Bhagath Vallala",
    role: "R&D Engineer",
    image: teamBhagath,
    objectPosition: "top",
    funFact: "If it exists, he's tried to make art with it.",
    ringColor: "from-cyan-400 to-sky-500",
    nameColor: "text-cyan-500",
    socials: { instagram: "#" },
  },
];

function MemberNode({ member, index, position }: { member: TeamMember; index: number; position: "top" | "bottom" }) {
  const [hovered, setHovered] = useState(false);
  const isTop = position === "top";

  return (
    <motion.div
      initial={{ opacity: 0, y: isTop ? -40 : 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`flex flex-col items-center cursor-pointer ${isTop ? "" : ""}`}
    >
      {/* Name & Role — on top for top row */}
      {isTop && (
        <div className="text-center mb-4">
          <motion.h3
            animate={{ scale: hovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
            className={`font-display text-lg md:text-xl font-bold ${member.nameColor}`}
          >
            {member.name}
          </motion.h3>
          <p className="font-body text-xs md:text-sm text-muted-foreground mt-1 max-w-[180px] leading-relaxed">
            {member.role}
          </p>
        </div>
      )}

      {/* Circular image with colored ring */}
      <div className="relative">
        {/* Gradient ring */}
        <motion.div
          animate={{
            scale: hovered ? 1.06 : 1,
            rotate: hovered ? 180 : 0,
          }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={`absolute -inset-[4px] rounded-full bg-gradient-to-br ${member.ringColor}`}
        />

        {/* White gap */}
        <div className="absolute -inset-[1px] rounded-full bg-background" />

        {/* Photo */}
        <div className="relative w-28 h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full overflow-hidden">
          <motion.img
            src={member.image}
            alt={member.name}
            style={member.objectPosition ? { objectPosition: member.objectPosition } : undefined}
            className="w-full h-full object-cover"
            animate={{ scale: hovered ? 1.1 : 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Hover overlay with fun fact */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-3"
          >
            <p className="font-body text-[10px] md:text-xs text-white/90 text-center leading-relaxed">
              {member.funFact}
            </p>
            {member.socials && (
              <div className="flex items-center gap-2 mt-2">
                {member.socials.instagram && (
                  <a href={member.socials.instagram} target="_blank" rel="noopener noreferrer"
                    className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/40 transition-colors">
                    <Instagram className="w-3 h-3" />
                  </a>
                )}
                {member.socials.youtube && (
                  <a href={member.socials.youtube} target="_blank" rel="noopener noreferrer"
                    className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/40 transition-colors">
                    <Youtube className="w-3 h-3" />
                  </a>
                )}
                {member.socials.whatsapp && (
                  <a href={member.socials.whatsapp} target="_blank" rel="noopener noreferrer"
                    className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/40 transition-colors">
                    <MessageCircle className="w-3 h-3" />
                  </a>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Name & Role — below for bottom row */}
      {!isTop && (
        <div className="text-center mt-4">
          <motion.h3
            animate={{ scale: hovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
            className={`font-display text-lg md:text-xl font-bold ${member.nameColor}`}
          >
            {member.name}
          </motion.h3>
          <p className="font-body text-xs md:text-sm text-muted-foreground mt-1 max-w-[180px] leading-relaxed">
            {member.role}
          </p>
        </div>
      )}
    </motion.div>
  );
}

export default function TeamSection() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section ref={ref} className="relative py-28 md:py-36 overflow-hidden bg-background">
      <div className="container relative z-10">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-body text-muted-foreground tracking-[0.35em] uppercase text-[11px] mb-3">
              The People
            </p>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground leading-[0.95]">
              Meet the <span className="italic text-secondary">Team</span>
            </h2>
          </motion.div>
        </div>

        {/* Zigzag layout with connecting curve */}
        <div className="relative max-w-6xl mx-auto">
          {/* Dashed connecting curve — SVG */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
            viewBox="0 0 1000 500"
            preserveAspectRatio="none"
            fill="none"
          >
            <motion.path
              d="M 80 120 Q 200 350, 320 350 Q 440 350, 520 120 Q 600 350, 720 350 Q 840 350, 920 120"
              stroke="hsl(var(--muted-foreground))"
              strokeWidth="2"
              strokeDasharray="8 8"
              fill="none"
              opacity="0.25"
              initial={{ pathLength: 0 }}
              animate={isVisible ? { pathLength: 1 } : {}}
              transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
            />
          </svg>

          {/* Top row */}
          <div className="flex flex-wrap justify-around items-end gap-6 md:gap-0 relative z-10">
            {topRow.map((member, i) => (
              <MemberNode key={member.name} member={member} index={i} position="top" />
            ))}
          </div>

          {/* Bottom row — offset, positioned between top members */}
          <div className="flex flex-wrap justify-around items-start gap-6 md:gap-0 mt-6 md:-mt-8 relative z-10 md:px-[10%]">
            {bottomRow.map((member, i) => (
              <MemberNode key={member.name} member={member} index={i + topRow.length} position="bottom" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
