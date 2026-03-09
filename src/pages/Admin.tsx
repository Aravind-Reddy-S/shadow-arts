import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Trash2, Plus } from "lucide-react";

const API = "/api";

export default function Admin() {

  const [workshops,setWorkshops] = useState<any[]>([]);
  const [products,setProducts] = useState<any[]>([]);
  const [bookings,setBookings] = useState<any[]>([]);
  const [orders,setOrders] = useState<any[]>([]);
  const [messages,setMessages] = useState<any[]>([]);

  useEffect(()=>{
    fetchAll();
  },[]);

  const fetchAll = async () => {

    const w = await fetch(`${API}/workshops/`);
    const p = await fetch(`${API}/products/`);
    const b = await fetch(`${API}/bookings/`);
    const o = await fetch(`${API}/orders/`);
    const m = await fetch(`${API}/messages/`);

    setWorkshops(await w.json());
    setProducts(await p.json());
    setBookings(await b.json());
    setOrders(await o.json());
    setMessages(await m.json());
  };

  return (
    <Layout>

      <section className="py-24 bg-background min-h-screen">

        <div className="container">

          <h1 className="font-display text-3xl font-bold mb-10">
            Admin Dashboard
          </h1>

          <Tabs defaultValue="workshops">

            <TabsList className="mb-6">
              <TabsTrigger value="workshops">Workshops</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
            </TabsList>

{/* ---------------- WORKSHOPS ---------------- */}

<TabsContent value="workshops">

<div className="flex justify-between mb-4">
<h2 className="font-semibold text-xl">Workshops</h2>
</div>

<Table>
<TableHeader>
<TableRow>
<TableHead>Title</TableHead>
<TableHead>City</TableHead>
<TableHead>Date</TableHead>
<TableHead>Price</TableHead>
<TableHead>Actions</TableHead>
</TableRow>
</TableHeader>

<TableBody>

{workshops.map(w => (

<TableRow key={w.id}>

<TableCell>{w.title}</TableCell>
<TableCell>{w.city}</TableCell>
<TableCell>{new Date(w.date).toLocaleDateString()}</TableCell>
<TableCell>₹{w.price}</TableCell>

<TableCell className="flex gap-2">

<Button
size="icon"
variant="ghost"
onClick={async ()=>{
await fetch(`${API}/workshops/${w.id}/`,{method:"DELETE"});
fetchAll();
}}
>
<Trash2 className="h-4 w-4"/>
</Button>

</TableCell>

</TableRow>

))}

</TableBody>
</Table>

</TabsContent>

{/* ---------------- PRODUCTS ---------------- */}

<TabsContent value="products">

<div className="flex justify-between mb-4">
<h2 className="font-semibold text-xl">Products</h2>
</div>

<Table>

<TableHeader>
<TableRow>
<TableHead>Name</TableHead>
<TableHead>Price</TableHead>
<TableHead>Actions</TableHead>
</TableRow>
</TableHeader>

<TableBody>

{products.map(p => (

<TableRow key={p.id}>

<TableCell>{p.name}</TableCell>
<TableCell>₹{p.price}</TableCell>

<TableCell>

<Button
size="icon"
variant="ghost"
onClick={async ()=>{
await fetch(`${API}/products/${p.id}/`,{method:"DELETE"});
fetchAll();
}}
>
<Trash2 className="h-4 w-4"/>
</Button>

</TableCell>

</TableRow>

))}

</TableBody>
</Table>

</TabsContent>

{/* ---------------- BOOKINGS ---------------- */}

<TabsContent value="bookings">

<Table>

<TableHeader>
<TableRow>
<TableHead>User</TableHead>
<TableHead>Workshop</TableHead>
<TableHead>Amount</TableHead>
</TableRow>
</TableHeader>

<TableBody>

{bookings.map(b => (

<TableRow key={b.id}>
<TableCell>{b.user}</TableCell>
<TableCell>{b.workshop}</TableCell>
<TableCell>₹{b.amount}</TableCell>
</TableRow>

))}

</TableBody>
</Table>

</TabsContent>

{/* ---------------- ORDERS ---------------- */}

<TabsContent value="orders">

<Table>

<TableHeader>
<TableRow>
<TableHead>ID</TableHead>
<TableHead>Total</TableHead>
<TableHead>Status</TableHead>
</TableRow>
</TableHeader>

<TableBody>

{orders.map(o => (

<TableRow key={o.id}>
<TableCell>{o.id}</TableCell>
<TableCell>₹{o.total}</TableCell>
<TableCell>{o.status}</TableCell>
</TableRow>

))}

</TableBody>
</Table>

</TabsContent>

{/* ---------------- MESSAGES ---------------- */}

<TabsContent value="messages">

<Table>

<TableHeader>
<TableRow>
<TableHead>Name</TableHead>
<TableHead>Email</TableHead>
<TableHead>Message</TableHead>
</TableRow>
</TableHeader>

<TableBody>

{messages.map(m => (

<TableRow key={m.id}>
<TableCell>{m.name}</TableCell>
<TableCell>{m.email}</TableCell>
<TableCell>{m.message}</TableCell>
</TableRow>

))}

</TableBody>
</Table>

</TabsContent>

          </Tabs>

        </div>

      </section>

    </Layout>
  );
}