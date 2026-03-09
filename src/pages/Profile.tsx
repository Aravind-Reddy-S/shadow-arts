import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import {
  User,
  Calendar,
  ShoppingBag,
  IndianRupee,
  LogOut,
  CalendarCheck,
  Package,
  MapPin
} from "lucide-react";

export default function Profile() {

  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { toast } = useToast();

  const userId = localStorage.getItem("user_id");

  useEffect(() => {

    if (!userId) {
      navigate("/login");
      return;
    }

    fetch(`/api/user-bookings/${userId}/`)
      .then(res => res.json())
      .then(data => {
        setBookings(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));

  }, [userId, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    toast({ title: "Logged out" });
    navigate("/");
  };

  const totalSpent =
    bookings.reduce((s, b) => s + Number(b.amount || 0), 0);

  const quickStats = [
    { label: "Bookings", value: bookings.length, icon: CalendarCheck },
    { label: "Orders", value: 0, icon: Package },
    { label: "Total Spent", value: `₹${totalSpent}`, icon: IndianRupee },
  ];

  return (
    <Layout>

      <section className="py-24 bg-background min-h-screen">

        <div className="container max-w-4xl">

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">

            <div className="flex items-center gap-3">

              <div className="h-12 w-12 rounded-full bg-secondary/20 flex items-center justify-center">
                <User className="h-6 w-6 text-secondary" />
              </div>

              <div>
                <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  My Dashboard
                </h1>
              </div>

            </div>

            <Button variant="outline" onClick={handleLogout} className="font-body w-fit">
              <LogOut className="h-4 w-4 mr-2" /> Log Out
            </Button>

          </div>

          {/* Quick Stats */}

          <div className="grid grid-cols-3 gap-4 mb-8">

            {quickStats.map((s, i) => (

              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="rounded-lg border border-border bg-card p-4 text-center"
              >

                <s.icon className="h-5 w-5 mx-auto mb-2 text-secondary" />

                <p className="font-display text-xl font-bold text-foreground">
                  {s.value}
                </p>

                <p className="font-body text-xs text-muted-foreground">
                  {s.label}
                </p>

              </motion.div>

            ))}

          </div>

          <Tabs defaultValue="bookings">

            <TabsList className="mb-6">
              <TabsTrigger value="bookings" className="font-body">
                <Calendar className="h-4 w-4 mr-1" /> Bookings ({bookings.length})
              </TabsTrigger>

              <TabsTrigger value="orders" className="font-body">
                <ShoppingBag className="h-4 w-4 mr-1" /> Orders (0)
              </TabsTrigger>
            </TabsList>

            {/* BOOKINGS */}

            <TabsContent value="bookings">

              {loading ? (

                <p className="text-center text-muted-foreground">
                  Loading bookings...
                </p>

              ) : bookings.length === 0 ? (

                <div className="rounded-lg border border-border bg-card p-12 text-center">

                  <CalendarCheck className="h-10 w-10 text-muted-foreground mx-auto mb-3" />

                  <p className="font-body text-muted-foreground mb-4">
                    No bookings yet. Explore our workshops!
                  </p>

                  <Button asChild className="bg-secondary text-secondary-foreground font-body">
                    <a href="/workshops">Browse Workshops</a>
                  </Button>

                </div>

              ) : (

                <div className="space-y-3">

                  {bookings.map((b, i) => (

                    <motion.div
                      key={b.id}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="rounded-lg border border-border bg-card p-5"
                    >

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">

                        <div>

                          <h3 className="font-display font-semibold text-foreground">
                            {b.workshop_title}
                          </h3>

                          <div className="font-body text-sm text-muted-foreground mt-1 space-y-1">

                            <div className="flex items-center gap-2">
                              <MapPin className="h-3.5 w-3.5 text-secondary" />
                              {b.city} — {b.venue}
                            </div>

                            <div className="flex items-center gap-2">
                              <Calendar className="h-3.5 w-3.5 text-secondary" />
                              {new Date(b.date).toLocaleDateString("en-IN")}
                            </div>

                          </div>

                        </div>

                        <div className="flex items-center gap-3">

                          <span className="font-display text-lg font-bold text-foreground flex items-center">
                            <IndianRupee className="h-4 w-4" />
                            {b.amount}
                          </span>

                          <span className="text-xs font-body px-2 py-1 rounded bg-green-500/20 text-green-700">
                            {b.status}
                          </span>

                        </div>

                      </div>

                    </motion.div>

                  ))}

                </div>

              )}

            </TabsContent>

            {/* ORDERS */}

            <TabsContent value="orders">

              <div className="rounded-lg border border-border bg-card p-12 text-center">

                <ShoppingBag className="h-10 w-10 text-muted-foreground mx-auto mb-3" />

                <p className="font-body text-muted-foreground mb-4">
                  Shop orders will appear here once the shop is migrated.
                </p>

                <Button asChild className="bg-secondary text-secondary-foreground font-body">
                  <a href="/shop">Visit Shop</a>
                </Button>

              </div>

            </TabsContent>

          </Tabs>

        </div>

      </section>

    </Layout>
  );
}