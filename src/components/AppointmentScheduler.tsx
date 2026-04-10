import React from "react";
import {
  Phone,
  User,
  Mail,
  CarFront,
  Wrench,
  CalendarDays,
  Clock3,
  MessageSquare,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { phoneDisplay, phoneHref, serviceOptions, timeSlots } from "@/constants";

export default function AppointmentScheduler() {
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    phone: "",
    vehicle: "",
    service: serviceOptions[0],
    date: "",
    time: timeSlots[0],
    notes: "",
  });
  const [booked, setBooked] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBooked(true);
  };

  return (
    <Card className="rounded-[2rem] border border-red-600/30 bg-black shadow-xl shadow-red-950/20">
      <CardContent className="p-6 sm:p-8">
        <div className="text-sm font-bold uppercase tracking-[0.22em] text-red-500">Book Appointment</div>
        <h3 className="mt-3 text-2xl font-black text-white sm:text-3xl">Schedule a time to bring in your car</h3>
        <p className="mt-4 leading-7 text-slate-200">
          Let customers request a service time directly from the website. This demo scheduler is mobile-friendly and ready for a real booking API.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
              <User className="h-4 w-4 text-red-500" /> Name
            </label>
            <input
              className="w-full rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none placeholder:text-slate-500"
              placeholder="Full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="sm:col-span-1">
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
              <Mail className="h-4 w-4 text-red-500" /> Email
            </label>
            <input
              className="w-full rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none placeholder:text-slate-500"
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="sm:col-span-1">
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
              <Phone className="h-4 w-4 text-red-500" /> Phone
            </label>
            <input
              className="w-full rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none placeholder:text-slate-500"
              placeholder="Phone number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          <div className="sm:col-span-1">
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
              <CarFront className="h-4 w-4 text-red-500" /> Vehicle
            </label>
            <input
              className="w-full rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none placeholder:text-slate-500"
              placeholder="Year, make, model"
              value={form.vehicle}
              onChange={(e) => setForm({ ...form, vehicle: e.target.value })}
            />
          </div>

          <div className="sm:col-span-1">
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
              <Wrench className="h-4 w-4 text-red-500" /> Service
            </label>
            <select
              className="w-full rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none"
              value={form.service}
              onChange={(e) => setForm({ ...form, service: e.target.value })}
            >
              {serviceOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-1">
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
              <CalendarDays className="h-4 w-4 text-red-500" /> Date
            </label>
            <input
              className="w-full rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none"
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
          </div>

          <div className="sm:col-span-1">
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
              <Clock3 className="h-4 w-4 text-red-500" /> Time
            </label>
            <select
              className="w-full rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none"
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
            >
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
              <MessageSquare className="h-4 w-4 text-red-500" /> Notes
            </label>
            <textarea
              className="min-h-[120px] w-full rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none placeholder:text-slate-500"
              placeholder="Tell us what you need checked or repaired"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </div>

          <div className="sm:col-span-2 flex flex-col gap-3 sm:flex-row">
            <Button type="submit" className="w-full rounded-2xl bg-red-600 py-6 text-base font-bold hover:bg-red-500 sm:w-auto sm:px-8">
              Request Appointment
            </Button>
            <a
              href={phoneHref}
              className="inline-flex w-full items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-white hover:bg-white/10 sm:w-auto"
            >
              Call {phoneDisplay}
            </a>
          </div>
        </form>

        {booked ? (
          <div className="mt-5 rounded-2xl border border-green-500/20 bg-green-500/10 p-4 text-sm text-green-100">
            Appointment request saved in this demo. In production, this form should submit to an appointment booking API and notify the shop.
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
