import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Calendar,
  CheckCircle2,
  Loader2,
  CalendarPlus,
  ExternalLink,
  Sparkles,
  Users,
  Target,
} from "lucide-react";

type BookingState = "form" | "loading" | "confirmation";
type ExperienceLevel = "beginner" | "intermediate" | "advanced";

interface BookingResult {
  bookingId: string;
  workshopTitle: string;
  workshopDate: string;
  workshopVenue: string;
  workshopCity: string;
}

export default function WorkshopBookingForm() {

  const [state, setState] = useState<BookingState>("form");
  const [workshops, setWorkshops] = useState<any[]>([]);
  const [selectedWorkshopId, setSelectedWorkshopId] = useState("");
  const [experience, setExperience] = useState<ExperienceLevel | "">("");
  const [goals, setGoals] = useState("");

  const [bookingResult, setBookingResult] = useState<BookingResult | null>(null);

  const { toast } = useToast();

  const userId = localStorage.getItem("user_id");

  useEffect(() => {

    fetch("http://127.0.0.1:8000/api/workshops/")
      .then((res) => res.json())
      .then((data) => setWorkshops(data || []));

  }, []);

  const generateBookingId = () => {
    const num = Math.floor(1000 + Math.random() * 9000);
    return `WRK-${num}`;
  };

  const handleSubmit = async () => {

    if (!userId) {
      toast({ title: "Please log in to book a workshop", variant: "destructive" });
      return;
    }

    if (!selectedWorkshopId || !experience) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }

    const workshop = workshops.find((w) => w.id == selectedWorkshopId);
    if (!workshop) return;

    setState("loading");

    await new Promise((r) => setTimeout(r, 1500));

    try {

      const response = await fetch("http://127.0.0.1:8000/api/book-workshop/", {
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
        setState("form");
        toast({ title: "Booking failed", description: data.error, variant: "destructive" });
        return;
      }

      setBookingResult({
        bookingId: generateBookingId(),
        workshopTitle: workshop.title,
        workshopDate: new Date(workshop.date).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric"
        }),
        workshopVenue: workshop.venue,
        workshopCity: workshop.city
      });

      setState("confirmation");

    } catch (error) {

      setState("form");

      toast({
        title: "Booking failed",
        description: "Server error",
        variant: "destructive"
      });

    }

  };

  const handleAddToCalendar = () => {

    if (!bookingResult) return;

    const workshop = workshops.find((w) => w.id == selectedWorkshopId);
    if (!workshop) return;

    const start = new Date(workshop.date).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

    const end = new Date(new Date(workshop.date).getTime() + 3 * 3600000)
      .toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

    const url =
      `https://calendar.google.com/calendar/render?action=TEMPLATE` +
      `&text=${encodeURIComponent(bookingResult.workshopTitle)}` +
      `&dates=${start}/${end}` +
      `&location=${encodeURIComponent(`${bookingResult.workshopVenue}, ${bookingResult.workshopCity}`)}`;

    window.open(url, "_blank");

  };

  const handleReset = () => {
    setState("form");
    setSelectedWorkshopId("");
    setExperience("");
    setGoals("");
    setBookingResult(null);
  };

  if (!userId) {

    return (

      <div className="rounded-xl border border-border bg-card p-8 text-center">

        <Users className="h-10 w-10 text-secondary mx-auto mb-4" />

        <h3 className="font-display text-xl font-semibold text-foreground mb-2">
          Sign In Required
        </h3>

        <p className="font-body text-sm text-muted-foreground mb-4">
          Please log in to book a workshop.
        </p>

        <Button asChild className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-body">
          <a href="/login">Sign In</a>
        </Button>

      </div>

    );

  }

  return (

    <div className="rounded-xl border border-border bg-card overflow-hidden">

      <AnimatePresence mode="wait">

        {state === "form" && (

          <motion.div
            key="form"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="p-6 md:p-8"
          >

            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="h-5 w-5 text-secondary" />
              <h3 className="font-display text-2xl font-semibold text-foreground">
                Book Your Workshop
              </h3>
            </div>

            <div className="space-y-5">

              <div>
                <label className="font-body text-sm text-muted-foreground mb-2 block">
                  <Calendar className="inline h-4 w-4 mr-1.5 text-secondary" />
                  Workshop
                </label>

                <Select value={selectedWorkshopId} onValueChange={setSelectedWorkshopId}>

                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select workshop" />
                  </SelectTrigger>

                  <SelectContent>

                    {workshops.map((w) => (

                      <SelectItem key={w.id} value={String(w.id)}>
                        {w.title} — {w.city}
                      </SelectItem>

                    ))}

                  </SelectContent>

                </Select>

              </div>

              <div>

                <label className="font-body text-sm text-muted-foreground mb-2 block">
                  <Target className="inline h-4 w-4 mr-1.5 text-secondary" />
                  Experience Level
                </label>

                <Select value={experience} onValueChange={(v) => setExperience(v as ExperienceLevel)}>

                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your level" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>

                </Select>

              </div>

              <div>

                <label className="font-body text-sm text-muted-foreground mb-2 block">
                  Your Goals
                </label>

                <Textarea
                  value={goals}
                  onChange={(e) => setGoals(e.target.value)}
                  placeholder="What do you want to learn?"
                  rows={3}
                />

              </div>

              <Button
                onClick={handleSubmit}
                className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-body text-base h-12"
              >
                Confirm Booking
              </Button>

            </div>

          </motion.div>

        )}

        {state === "loading" && (

          <div className="p-10 text-center">
            <Loader2 className="h-10 w-10 text-secondary animate-spin mx-auto mb-4" />
            <p>Processing your booking...</p>
          </div>

        )}

        {state === "confirmation" && bookingResult && (

          <div className="p-8 text-center">

            <CheckCircle2 className="h-12 w-12 text-secondary mx-auto mb-4" />

            <h3 className="font-display text-xl font-semibold mb-2">
              Booking Confirmed!
            </h3>

            <p className="text-sm text-muted-foreground mb-4">
              {bookingResult.workshopTitle}
            </p>

            <div className="flex flex-col gap-3">

              <Button onClick={handleAddToCalendar} variant="outline">
                <CalendarPlus className="h-4 w-4 mr-2" />
                Add to Calendar
              </Button>

              <Button variant="outline" onClick={handleReset}>
                Book Another Workshop
              </Button>

            </div>

          </div>

        )}

      </AnimatePresence>

    </div>

  );

}