import { useState, useEffect } from "react";
import logo from "@/assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import CartDrawer from "@/components/CartDrawer";

const links = [
  { to: "/", label: "Home" },
  { to: "/programs", label: "Programs" },
  { to: "/workshops", label: "Workshops" },
  { to: "/shop", label: "Handcraft Store" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {

  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const location = useLocation();

  useEffect(() => {

  const checkLogin = () => {
    const userId = localStorage.getItem("user_id");
    setLoggedIn(!!userId);
  };

  checkLogin();

  window.addEventListener("storage", checkLogin);

  return () => window.removeEventListener("storage", checkLogin);

}, []);

  return (

    <header className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-primary-foreground/10">

      <div className="container flex h-16 items-center justify-between">

        <Link
          to="/"
          className="flex items-center gap-2 font-display text-2xl font-bold text-primary-foreground tracking-wide"
        >
          <img src={logo} alt="Shadow Arts logo" className="h-9 w-9 object-contain" />
          Shadow <span className="text-secondary">Arts</span>
        </Link>

        {/* Desktop links */}

        <nav className="hidden md:flex items-center gap-8">

          {links.map((l) => (

            <Link
              key={l.to}
              to={l.to}
              className={`text-sm font-body tracking-wide transition-colors hover:text-secondary ${
                location.pathname === l.to
                  ? "text-secondary"
                  : "text-primary-foreground/80"
              }`}
            >
              {l.label}
            </Link>

          ))}

        </nav>

        {/* Desktop buttons */}

        <div className="hidden md:flex items-center gap-3">

          <CartDrawer />

          {loggedIn ? (

            <Link to="/profile">

              <Button
                variant="outline"
                size="sm"
                className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
              >
                <User className="h-4 w-4 mr-1" /> Dashboard
              </Button>

            </Link>

          ) : (

            <Link to="/login">

              <Button
                variant="outline"
                size="sm"
                className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
              >
                Login
              </Button>

            </Link>

          )}

        </div>

        {/* Mobile menu */}

        <div className="md:hidden flex items-center gap-2">

          <CartDrawer />

          <button
            className="text-primary-foreground"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

        </div>

      </div>

      {/* Mobile dropdown */}

      <AnimatePresence>

        {open && (

          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-primary border-t border-primary-foreground/10 overflow-hidden"
          >

            <nav className="container py-4 flex flex-col gap-3">

              {links.map((l) => (

                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={`font-body text-lg py-2 transition-colors ${
                    location.pathname === l.to
                      ? "text-secondary"
                      : "text-primary-foreground/80"
                  }`}
                >
                  {l.label}
                </Link>

              ))}

              {loggedIn ? (

                <Link to="/profile" onClick={() => setOpen(false)}>

                  <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 mt-2">
                    <User className="h-4 w-4 mr-1" /> Dashboard
                  </Button>

                </Link>

              ) : (

                <Link to="/login" onClick={() => setOpen(false)}>

                  <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 mt-2">
                    Login
                  </Button>

                </Link>

              )}

            </nav>

          </motion.div>

        )}

      </AnimatePresence>

    </header>

  );

}