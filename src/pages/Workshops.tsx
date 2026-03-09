import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { useToast } from "@/hooks/use-toast";
import WorkshopBookingForm from "@/components/WorkshopBookingForm";
import WorkshopCard from "@/components/WorkshopCard";

export default function Workshops() {

  const [workshops, setWorkshops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { toast } = useToast();

  // Load workshops from Django
  useEffect(() => {
    fetch("/api/workshops/")
      .then((res) => res.json())
      .then((data) => {
        setWorkshops(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Book workshop
  const handleBook = async (workshop: any) => {

    const userId = localStorage.getItem("user_id");

    if (!userId) {
      toast({
        title: "Please login",
        description: "You must login before booking.",
        variant: "destructive"
      });
      return;
    }

    try {

      const response = await fetch("/api/book-workshop/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: userId,
          workshop_id: workshop.id
        })
      });

      const data = await response.json();

      if (!response.ok) {
        toast({
          title: "Booking failed",
          description: data.error || "Something went wrong",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Workshop booked!",
        description: `You've booked ${workshop.title}`
      });

      // update seats locally
      setWorkshops((prev) =>
        prev.map((w) =>
          w.id === workshop.id
            ? { ...w, seats_available: w.seats_available - 1 }
            : w
        )
      );

    } catch (error) {

      toast({
        title: "Booking failed",
        description: "Server error",
        variant: "destructive"
      });

    }

  };

  return (

    <Layout>

      <section className="py-24 bg-background min-h-screen">

        <div className="container">

          <div className="text-center mb-16">

            <p className="font-body text-secondary tracking-[0.3em] uppercase text-sm mb-3">
              Learn & Create
            </p>

            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Upcoming Workshops
            </h1>

          </div>

          {/* Booking form */}

          <div className="max-w-lg mx-auto mb-20">
            <WorkshopBookingForm />
          </div>

          {/* All Workshops */}

          <div className="text-center mb-10">

            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
              Browse All Sessions
            </h2>

            <p className="font-body text-muted-foreground mt-2">
              Or pick from our full catalogue below
            </p>

          </div>

          {loading ? (

            <p className="text-center font-body text-muted-foreground">
              Loading workshops...
            </p>

          ) : workshops.length === 0 ? (

            <p className="text-center font-body text-muted-foreground">
              No workshops available right now. Check back soon!
            </p>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {workshops.map((w, i) => (
                <WorkshopCard
                  key={w.id}
                  workshop={w}
                  index={i}
                  onBook={handleBook}
                />
              ))}

            </div>

          )}

        </div>

      </section>

    </Layout>

  );
}