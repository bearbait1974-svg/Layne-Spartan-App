import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft, ChevronRight, Dumbbell, Home, RotateCcw, CalendarDays } from "lucide-react";

const plan = {
  5: {
    title: "Week 5",
    days: [
      { day: "Mon", focus: "Heavy lower + carries", eos: ["Trap bar deadlift 5x4", "Front squat 4x5", "Walking lunges 3x16/leg", "Heavy farmer carry 5x50m", "Sled push 6x25m"], home: ["Heavy DB/RDL deadlift 5x6", "Goblet squat 4x8", "RFESS 3x10/leg", "Heavy carry 5x50m", "Backpack/front-loaded stair climbs 6x1 min"] },
      { day: "Tue", focus: "Hill power + grip", eos: ["Warm-up jog 10 min", "Hill repeats 10x45 sec hard", "Walk-down recovery", "Dead hang 4x40 sec", "Pull-ups 4x8", "Towel hangs/pull-ups 4x20–30 sec or 4x5", "Plate pinch carry 4x40m"], home: ["Warm-up jog 10 min", "Hill repeats 10x45 sec hard", "Walk-down recovery", "Dead hang 4x40 sec", "Pull-ups 4x8", "Towel hangs/pull-ups 4x20–30 sec or 4x5", "Bucket/farmer carry 4x40m"] },
      { day: "Wed", focus: "Recovery", eos: ["Walk or easy zone-2 30–40 min", "Mobility 10–15 min"], home: ["Walk or easy zone-2 30–40 min", "Mobility 10–15 min"] },
      { day: "Thu", focus: "Upper obstacle strength", eos: ["4 rounds: Pull-ups 10", "Push press 8", "KB swings 20", "Burpees 15", "Rope climbs 1–2", "Hanging knee raises 15"], home: ["4 rounds: Pull-ups 10", "DB shoulder press 8", "DB swings 20", "Burpees 15", "Towel/rope rows 12", "Hanging knee raises 15"] },
      { day: "Fri", focus: "Rest", eos: ["Full rest"], home: ["Full rest"] },
      { day: "Sat", focus: "Long run with finish push", eos: ["Run 4.5 miles total", "First 3.5 miles easy-moderate", "Last 1 mile hard but controlled"], home: ["Run 4.5 miles total", "First 3.5 miles easy-moderate", "Last 1 mile hard but controlled"] },
      { day: "Sun", focus: "Spartan hybrid", eos: ["4 rounds: Run 800m", "Sandbag carry 60m", "Burpees 15", "Walking lunges 20", "Dead hang 40 sec"], home: ["4 rounds: Run 800m", "Sandbag/backpack carry 60m", "Burpees 15", "Walking lunges 20", "Dead hang 40 sec"] },
    ],
  },
  6: {
    title: "Week 6",
    days: [
      { day: "Mon", focus: "Heavy lower + carries", eos: ["Trap bar deadlift 5x4 (heavier)", "Front squat 4x5", "Walking lunges 3x16/leg", "Heavy farmer carry 5x50m (heavier)", "Sled push 6x25m"], home: ["Heavy DB/RDL deadlift 5x6 (heavier)", "Goblet squat 4x8", "RFESS 3x10/leg", "Heavy carry 5x50m (heavier)", "Backpack/front-loaded stair climbs 6x1 min"] },
      { day: "Tue", focus: "Hill power + grip", eos: ["Warm-up jog 10 min", "Hill repeats 12x45 sec hard", "Walk-down recovery", "Dead hang 4x40 sec", "Pull-ups 4x8", "Towel hangs/pull-ups 4x20–30 sec or 4x5", "Plate pinch carry 4x40m"], home: ["Warm-up jog 10 min", "Hill repeats 12x45 sec hard", "Walk-down recovery", "Dead hang 4x40 sec", "Pull-ups 4x8", "Towel hangs/pull-ups 4x20–30 sec or 4x5", "Bucket/farmer carry 4x40m"] },
      { day: "Wed", focus: "Recovery", eos: ["Walk or easy zone-2 30–40 min", "Mobility 10–15 min"], home: ["Walk or easy zone-2 30–40 min", "Mobility 10–15 min"] },
      { day: "Thu", focus: "Upper obstacle strength", eos: ["5 rounds: Pull-ups 10", "Push press 8", "KB swings 20", "Burpees 15", "Rope climbs 1–2", "Hanging knee raises 15"], home: ["5 rounds: Pull-ups 10", "DB shoulder press 8", "DB swings 20", "Burpees 15", "Towel/rope rows 12", "Hanging knee raises 15"] },
      { day: "Fri", focus: "Rest", eos: ["Full rest"], home: ["Full rest"] },
      { day: "Sat", focus: "Long run", eos: ["Run 5 miles steady"], home: ["Run 5 miles steady"] },
      { day: "Sun", focus: "Spartan hybrid", eos: ["4 rounds: Run 800m", "Sandbag carry 60m", "Burpees 20", "Walking lunges 20", "Dead hang 40 sec"], home: ["4 rounds: Run 800m", "Sandbag/backpack carry 60m", "Burpees 20", "Walking lunges 20", "Dead hang 40 sec"] },
    ],
  },
  7: {
    title: "Week 7",
    days: [
      { day: "Mon", focus: "Heavy lower + carries", eos: ["Trap bar deadlift 6x3 heavy", "Front squat 4x5", "Walking lunges 3x16/leg", "Heavy farmer carry 5x50m", "Sled push 6x25m"], home: ["Heavy DB/RDL deadlift 6x4", "Goblet squat 4x8", "RFESS 3x10/leg", "Heavy carry 5x50m", "Backpack/front-loaded stair climbs 6x1 min"] },
      { day: "Tue", focus: "Hill power + grip", eos: ["Warm-up jog 10 min", "Hill repeats 8x60 sec hard", "Walk-down recovery", "Dead hang 4x45 sec", "Pull-ups 4x8", "Towel hangs/pull-ups 4x20–30 sec or 4x5", "Plate pinch carry 4x40m"], home: ["Warm-up jog 10 min", "Hill repeats 8x60 sec hard", "Walk-down recovery", "Dead hang 4x45 sec", "Pull-ups 4x8", "Towel hangs/pull-ups 4x20–30 sec or 4x5", "Bucket/farmer carry 4x40m"] },
      { day: "Wed", focus: "Recovery", eos: ["Walk or easy zone-2 30–40 min", "Mobility 10–15 min"], home: ["Walk or easy zone-2 30–40 min", "Mobility 10–15 min"] },
      { day: "Thu", focus: "Upper obstacle strength", eos: ["5 rounds: Pull-ups 10", "Push press 8", "KB swings 20", "Burpees 15", "Rope climbs 1–2", "Hanging knee raises 15"], home: ["5 rounds: Pull-ups 10", "DB shoulder press 8", "DB swings 20", "Burpees 15", "Towel/rope rows 12", "Hanging knee raises 15"] },
      { day: "Fri", focus: "Rest", eos: ["Full rest"], home: ["Full rest"] },
      { day: "Sat", focus: "Long run with finish push", eos: ["Run 5.5 miles", "Last 1.5 miles strong"], home: ["Run 5.5 miles", "Last 1.5 miles strong"] },
      { day: "Sun", focus: "Spartan hybrid", eos: ["5 rounds: Run 800m", "Sandbag carry 60m", "Burpees 20", "Walking lunges 20", "Dead hang 40 sec"], home: ["5 rounds: Run 800m", "Sandbag/backpack carry 60m", "Burpees 20", "Walking lunges 20", "Dead hang 40 sec"] },
    ],
  },
  8: {
    title: "Week 8",
    badge: "Deload",
    days: [
      { day: "Mon", focus: "Hard deload - heavy but less volume", eos: ["Trap bar deadlift 4x3 heavy", "Front squat 3x4", "Heavy farmer carry 3x40m", "Sled push 4x20m"], home: ["Heavy DB/RDL deadlift 4x5", "Goblet squat 3x6", "Heavy carry 3x40m", "Backpack stair climbs 4x45 sec"] },
      { day: "Tue", focus: "Reduced hill day", eos: ["Warm-up jog 10 min", "Hill repeats 8x30 sec hard", "Walk-down recovery", "Dead hang 3x30 sec", "Pull-ups 3x6"], home: ["Warm-up jog 10 min", "Hill repeats 8x30 sec hard", "Walk-down recovery", "Dead hang 3x30 sec", "Pull-ups 3x6"] },
      { day: "Wed", focus: "Recovery", eos: ["Walk or easy zone-2 30–40 min", "Mobility 10–15 min"], home: ["Walk or easy zone-2 30–40 min", "Mobility 10–15 min"] },
      { day: "Thu", focus: "Reduced obstacle strength", eos: ["3 rounds: Pull-ups 8", "Push press 8", "KB swings 15", "Burpees 12", "Rope climbs 1", "Hanging knee raises 12"], home: ["3 rounds: Pull-ups 8", "DB shoulder press 8", "DB swings 15", "Burpees 12", "Towel/rope rows 10", "Hanging knee raises 12"] },
      { day: "Fri", focus: "Rest", eos: ["Full rest"], home: ["Full rest"] },
      { day: "Sat", focus: "Long run easy-moderate", eos: ["Run 4.5 miles easy-moderate"], home: ["Run 4.5 miles easy-moderate"] },
      { day: "Sun", focus: "Optional recovery", eos: ["Zone-2 bike or jog 30–40 min"], home: ["Zone-2 jog/walk 30–40 min"] },
    ],
  },
  9: {
    title: "Week 9",
    days: [
      { day: "Mon", focus: "Strength + posterior chain", eos: ["Back squat 5x4", "Romanian deadlift 4x6", "Step-ups 3x12/leg", "Farmer carry 5x60m", "Sled drag 5x30m"], home: ["Heavy goblet squat 5x8", "DB Romanian deadlift 4x8", "Step-ups 3x12/leg", "Heavy carry 5x60m", "Stair climbs 5x90 sec"] },
      { day: "Tue", focus: "Interval ladder + grip", eos: ["400m fast", "800m hard", "1200m strong", "800m hard", "400m fast", "Rest 90 sec between efforts", "Dead hang 4x45 sec", "Pull-ups 4x8–10", "Towel hangs 3xmax"], home: ["400m fast", "800m hard", "1200m strong", "800m hard", "400m fast", "Rest 90 sec between efforts", "Dead hang 4x45 sec", "Pull-ups 4x8–10", "Towel hangs 3xmax"] },
      { day: "Wed", focus: "Recovery", eos: ["Walk or easy zone-2 30–40 min", "Mobility 10–15 min"], home: ["Walk or easy zone-2 30–40 min", "Mobility 10–15 min"] },
      { day: "Thu", focus: "Obstacle density", eos: ["5 rounds: Pull-ups 8–10", "Box jumps 15", "Sandbag carry 50m", "Burpees 15", "Push-ups 20", "Bear crawl 30m"], home: ["5 rounds: Pull-ups 8–10", "Step-ups/jump squats 15", "Sandbag/backpack carry 50m", "Burpees 15", "Push-ups 20", "Bear crawl 30m"] },
      { day: "Fri", focus: "Rest", eos: ["Full rest"], home: ["Full rest"] },
      { day: "Sat", focus: "Long trail/incline run", eos: ["Run 6 miles", "Include 3x5 min uphill tempo in the middle"], home: ["Run 6 miles", "Include 3x5 min uphill tempo in the middle"] },
      { day: "Sun", focus: "Spartan suffer session", eos: ["4 rounds: Run 1 mile", "Farmer carry 50m", "Burpees 20", "Pull-ups 8", "Walking lunges 20", "Dead hang 45 sec"], home: ["4 rounds: Run 1 mile", "Carry 50m", "Burpees 20", "Pull-ups 8", "Walking lunges 20", "Dead hang 45 sec"] },
    ],
  },
  10: {
    title: "Week 10",
    days: [
      { day: "Mon", focus: "Strength + posterior chain", eos: ["Back squat 5x4", "Romanian deadlift 4x6", "Step-ups 3x12/leg", "Farmer carry 5x60m", "Sled drag 5x30m"], home: ["Heavy goblet squat 5x8", "DB Romanian deadlift 4x8", "Step-ups 3x12/leg", "Heavy carry 5x60m", "Stair climbs 5x90 sec"] },
      { day: "Tue", focus: "Faster interval ladder + grip", eos: ["400m fast", "800m hard", "1200m strong", "800m hard", "400m fast", "Rest 60–75 sec between efforts", "Dead hang 4x45 sec", "Pull-ups 4x8–10", "Towel hangs 3xmax"], home: ["400m fast", "800m hard", "1200m strong", "800m hard", "400m fast", "Rest 60–75 sec between efforts", "Dead hang 4x45 sec", "Pull-ups 4x8–10", "Towel hangs 3xmax"] },
      { day: "Wed", focus: "Recovery", eos: ["Walk or easy zone-2 30–40 min", "Mobility 10–15 min"], home: ["Walk or easy zone-2 30–40 min", "Mobility 10–15 min"] },
      { day: "Thu", focus: "Obstacle density", eos: ["6 rounds: Pull-ups 8–10", "Box jumps 15", "Sandbag carry 50m", "Burpees 15", "Push-ups 20", "Bear crawl 30m"], home: ["6 rounds: Pull-ups 8–10", "Step-ups/jump squats 15", "Sandbag/backpack carry 50m", "Burpees 15", "Push-ups 20", "Bear crawl 30m"] },
      { day: "Fri", focus: "Rest", eos: ["Full rest"], home: ["Full rest"] },
      { day: "Sat", focus: "Long trail/incline run", eos: ["Run 6 miles", "Include 4x5 min uphill tempo in the middle"], home: ["Run 6 miles", "Include 4x5 min uphill tempo in the middle"] },
      { day: "Sun", focus: "Spartan suffer session", eos: ["5 rounds: Run 1 mile", "Farmer carry 50m", "Burpees 20", "Pull-ups 8", "Walking lunges 20", "Dead hang 45 sec"], home: ["5 rounds: Run 1 mile", "Carry 50m", "Burpees 20", "Pull-ups 8", "Walking lunges 20", "Dead hang 45 sec"] },
    ],
  },
  11: {
    title: "Week 11",
    days: [
      { day: "Mon", focus: "Big strength week", eos: ["Back squat 6x3 heavy", "Deadlift 5x3", "Carry 6x60m", "Walking lunges 3x20 steps"], home: ["Heavy goblet/front-loaded squat 6x5", "DB/RDL deadlift 5x5", "Carry 6x60m", "Walking lunges 3x20 steps"] },
      { day: "Tue", focus: "Hill crusher + grip", eos: ["Hill repeats 10x60 sec", "Walk-down recovery", "Dead hang 3x1 min"], home: ["Hill repeats 10x60 sec", "Walk-down recovery", "Dead hang 3x1 min"] },
      { day: "Wed", focus: "Recovery", eos: ["Walk or easy zone-2 30–40 min", "Mobility 10–15 min"], home: ["Walk or easy zone-2 30–40 min", "Mobility 10–15 min"] },
      { day: "Thu", focus: "Grip + engine", eos: ["6 rounds: Pull-ups 8", "Burpees 15", "Sandbag/front carry 60m", "Box jumps 12", "Rope climb 1 or towel row 12"], home: ["6 rounds: Pull-ups 8", "Burpees 15", "Carry 60m", "Step-ups/jump squats 12", "Towel row 12"] },
      { day: "Fri", focus: "Rest", eos: ["Full rest"], home: ["Full rest"] },
      { day: "Sat", focus: "Long run with hard finish", eos: ["Run 7 miles", "Final 2 miles at strong race effort"], home: ["Run 7 miles", "Final 2 miles at strong race effort"] },
      { day: "Sun", focus: "Recovery", eos: ["Recovery jog or zone-2 bike 35–45 min", "Mobility 15 min"], home: ["Recovery jog or zone-2 walk/jog 35–45 min", "Mobility 15 min"] },
    ],
  },
  12: {
    title: "Week 12",
    badge: "Absorb",
    days: [
      { day: "Mon", focus: "Absorb week - main lifts only", eos: ["Back squat 4x3", "Deadlift/RDL 3x4", "Carry 3x50m"], home: ["Heavy goblet squat 4x5", "DB/RDL deadlift 3x6", "Carry 3x50m"] },
      { day: "Tue", focus: "Reduced hills", eos: ["Hill repeats 6x60 sec", "Walk-down recovery", "Dead hang 3x40 sec", "Pull-ups 3x6"], home: ["Hill repeats 6x60 sec", "Walk-down recovery", "Dead hang 3x40 sec", "Pull-ups 3x6"] },
      { day: "Wed", focus: "Recovery", eos: ["Walk or easy zone-2 30–40 min", "Mobility 10–15 min"], home: ["Walk or easy zone-2 30–40 min", "Mobility 10–15 min"] },
      { day: "Thu", focus: "Reduced obstacle density", eos: ["4 rounds: Pull-ups 8", "Box jumps 12", "Sandbag carry 50m", "Burpees 12", "Push-ups 15", "Bear crawl 20m"], home: ["4 rounds: Pull-ups 8", "Step-ups/jump squats 12", "Carry 50m", "Burpees 12", "Push-ups 15", "Bear crawl 20m"] },
      { day: "Fri", focus: "Rest", eos: ["Full rest"], home: ["Full rest"] },
      { day: "Sat", focus: "Steady run", eos: ["Run 6 miles steady"], home: ["Run 6 miles steady"] },
      { day: "Sun", focus: "Short hybrid", eos: ["3 rounds: Run 800m", "Carry 50m", "Burpees 15", "Pull-ups 6", "Walking lunges 20"], home: ["3 rounds: Run 800m", "Carry 50m", "Burpees 15", "Pull-ups 6", "Walking lunges 20"] },
    ],
  },
  13: {
    title: "Week 13",
    days: [
      { day: "Mon", focus: "Peak strength", eos: ["Squat 5x3", "Deadlift 4x3", "Split squat 3x8/leg", "Farmer carry 5x50m"], home: ["Heavy goblet squat 5x5", "DB/RDL deadlift 4x5", "Split squat 3x8/leg", "Carry 5x50m"] },
      { day: "Tue", focus: "Race-pace intervals + grip", eos: ["5x1000m hard controlled", "Rest 2 min", "Dead hang 4x45 sec", "Pull-ups 4x8"], home: ["5x1000m hard controlled", "Rest 2 min", "Dead hang 4x45 sec", "Pull-ups 4x8"] },
      { day: "Wed", focus: "Recovery", eos: ["Walk or easy zone-2 30–40 min", "Mobility 10–15 min"], home: ["Walk or easy zone-2 30–40 min", "Mobility 10–15 min"] },
      { day: "Thu", focus: "Spartan simulation", eos: ["4 rounds: Run 1 mile", "Sandbag carry 80m", "Burpees 20", "Pull-ups 8–10", "Box jumps 15", "Bear crawl 30m"], home: ["4 rounds: Run 1 mile", "Carry 80m", "Burpees 20", "Pull-ups 8–10", "Step-ups/jump squats 15", "Bear crawl 30m"] },
      { day: "Fri", focus: "Rest", eos: ["Full rest"], home: ["Full rest"] },
      { day: "Sat", focus: "Long run", eos: ["Run 7 miles steady on hills/trails if possible"], home: ["Run 7 miles steady on hills/trails if possible"] },
      { day: "Sun", focus: "Optional recovery", eos: ["Easy bike or jog 30 min"], home: ["Easy jog/walk 30 min"] },
    ],
  },
  14: {
    title: "Week 14",
    days: [
      { day: "Mon", focus: "Final truly hard strength day", eos: ["Trap bar deadlift 6x2 heavy", "Front squat 4x4", "Carry 6x60m", "Sled push 6 hard efforts"], home: ["Heavy DB/RDL deadlift 6x3", "Goblet squat 4x6", "Carry 6x60m", "Backpack/front-loaded stair marches 6 hard efforts"] },
      { day: "Tue", focus: "Hill repeats + grip", eos: ["12x1 min hill repeats", "Walk-down recovery", "Dead hang 4x1 min", "Towel pull-ups 4x5"], home: ["12x1 min hill repeats", "Walk-down recovery", "Dead hang 4x1 min", "Towel pull-ups 4x5"] },
      { day: "Wed", focus: "Recovery", eos: ["Walk or easy zone-2 30–40 min", "Mobility 10–15 min"], home: ["Walk or easy zone-2 30–40 min", "Mobility 10–15 min"] },
      { day: "Thu", focus: "Obstacle engine", eos: ["5 rounds: Pull-ups 10", "Burpees 20", "Sandbag carry 60m", "Push press 8", "Walking lunges 20"], home: ["5 rounds: Pull-ups 10", "Burpees 20", "Carry 60m", "DB shoulder press 8", "Walking lunges 20"] },
      { day: "Fri", focus: "Rest", eos: ["Full rest"], home: ["Full rest"] },
      { day: "Sat", focus: "Strong-effort run", eos: ["Run 6 miles", "Middle 3 miles at strong effort"], home: ["Run 6 miles", "Middle 3 miles at strong effort"] },
      { day: "Sun", focus: "Recovery", eos: ["Easy zone-2 30–40 min"], home: ["Easy zone-2 30–40 min"] },
    ],
  },
  15: {
    title: "Week 15",
    badge: "Taper",
    days: [
      { day: "Mon", focus: "Taper strength", eos: ["Squat 3x3", "Deadlift 3x3", "Carry 3x40m"], home: ["Heavy goblet squat 3x5", "DB/RDL deadlift 3x5", "Carry 3x40m"] },
      { day: "Tue", focus: "Fast intervals + light grip", eos: ["6x400m fast", "Full recovery jog/walk", "Pull-ups 3x6", "Dead hang 3x30–40 sec"], home: ["6x400m fast", "Full recovery jog/walk", "Pull-ups 3x6", "Dead hang 3x30–40 sec"] },
      { day: "Wed", focus: "Recovery", eos: ["Walk or easy zone-2 25–35 min", "Mobility 10 min"], home: ["Walk or easy zone-2 25–35 min", "Mobility 10 min"] },
      { day: "Thu", focus: "Short simulation", eos: ["3 rounds: Run 800m", "Burpees 15", "Pull-ups 6", "Carry 40m"], home: ["3 rounds: Run 800m", "Burpees 15", "Pull-ups 6", "Carry 40m"] },
      { day: "Fri", focus: "Rest", eos: ["Full rest"], home: ["Full rest"] },
      { day: "Sat", focus: "Easy-moderate run", eos: ["Run 5 miles easy-moderate"], home: ["Run 5 miles easy-moderate"] },
      { day: "Sun", focus: "Optional recovery", eos: ["Easy bike/walk 20–30 min"], home: ["Easy walk/jog 20–30 min"] },
    ],
  },
  16: {
    title: "Week 16",
    badge: "Race Week",
    days: [
      { day: "Mon", focus: "Race week shakeout", eos: ["Easy jog 20–25 min", "Mobility 10 min"], home: ["Easy jog 20–25 min", "Mobility 10 min"] },
      { day: "Tue", focus: "Light pull + activation", eos: ["Pull-ups 2x5", "Dead hang 2x20–30 sec", "4 short strides of 10 sec"], home: ["Pull-ups 2x5", "Dead hang 2x20–30 sec", "4 short strides of 10 sec"] },
      { day: "Wed", focus: "Rest", eos: ["Full rest"], home: ["Full rest"] },
      { day: "Thu", focus: "Easy jog", eos: ["Easy jog 10–15 min", "Light mobility"], home: ["Easy jog 10–15 min", "Light mobility"] },
      { day: "Fri", focus: "Rest", eos: ["Full rest", "Hydrate and prep race gear"], home: ["Full rest", "Hydrate and prep race gear"] },
      { day: "Sat", focus: "Race day", eos: ["Spartan Super Utah race day"], home: ["Spartan Super Utah race day"] },
      { day: "Sun", focus: "Recovery", eos: ["Walk, rehydrate, light mobility"], home: ["Walk, rehydrate, light mobility"] },
    ],
  },
};

const weekNumbers = Object.keys(plan).map(Number);

function keyFor(week, dayIdx, mode, itemIdx) {
  return `spartan-w${week}-d${dayIdx}-${mode}-i${itemIdx}`;
}

export default function SpartanSuperUtahGymApp() {
  const [week, setWeek] = useState(5);
  const [dayIndex, setDayIndex] = useState(0);
  const [mode, setMode] = useState("eos");
  const [todayOnly, setTodayOnly] = useState(false);
  const [checked, setChecked] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem("spartan-super-utah-app-progress");
    if (saved) setChecked(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("spartan-super-utah-app-progress", JSON.stringify(checked));
  }, [checked]);

  const weekData = plan[week];
  const dayData = weekData.days[dayIndex];
  const currentItems = mode === "eos" ? dayData.eos : dayData.home;
  
  const weekProgress = useMemo(() => {
    const total = weekData.days.reduce((sum, d) => sum + (mode === "eos" ? d.eos.length : d.home.length), 0);
    const done = weekData.days.reduce((sum, d, di) => {
      const arr = mode === "eos" ? d.eos : d.home;
      return sum + arr.filter((_, ii) => checked[keyFor(week, di, mode, ii)]).length;
    }, 0);
    return total ? Math.round((done / total) * 100) : 0;
  }, [week, weekData, checked, mode]);

  const todayShortcut = () => {
    const day = new Date().getDay();
    const map = { 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 0: 6 };
    setDayIndex(map[day] ?? 0);
    setTodayOnly(true);
  };
    setDayIndex(map[day] ?? 0);
  };

  const resetWeek = () => {
    const next = { ...checked };
    weekData.days.forEach((d, di) => {
      ["eos", "home"].forEach((m) => {
        const arr = m === "eos" ? d.eos : d.home;
        arr.forEach((_, ii) => delete next[keyFor(week, di, m, ii)]);
      });
    });
    setChecked(next);
  };

  const toggle = (itemIdx) => {
    const k = keyFor(week, dayIndex, mode, itemIdx);
    setChecked((prev) => ({ ...prev, [k]: !prev[k] }));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-3 sm:p-6">
      <div className="mx-auto max-w-md space-y-4">
        <Card className="rounded-2xl shadow-sm border-0">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardTitle className="text-xl">Spartan Super Utah</CardTitle>
                <p className="text-sm text-slate-600 mt-1">Weeks 5–16 intensified gym app</p>
              </div>
              {weekData.badge ? <Badge variant="secondary">{weekData.badge}</Badge> : null}
            </div>
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-sm">
                <span>{weekData.title}</span>
                <span>{weekProgress}% complete</span>
              </div>
              <Progress value={weekProgress} className="h-2" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1 rounded-xl" onClick={() => { setWeek((w) => Math.max(5, w - 1)); setTodayOnly(false); }}>
                <ChevronLeft className="mr-1 h-4 w-4" /> Week
              </Button>
              <Button variant={todayOnly ? "default" : "outline"} size="sm" className="flex-1 rounded-xl" onClick={todayShortcut}>
                <CalendarDays className="mr-1 h-4 w-4" /> Today
              </Button>
              <Button variant="outline" size="sm" className="flex-1 rounded-xl" onClick={() => { setWeek((w) => Math.min(16, w + 1)); setTodayOnly(false); }}>
                Week <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>

            <Tabs value={mode} onValueChange={setMode}>
              <TabsList className="grid w-full grid-cols-2 rounded-xl">
                <TabsTrigger value="eos" className="rounded-xl"><Dumbbell className="mr-2 h-4 w-4" />EOS</TabsTrigger>
                <TabsTrigger value="home" className="rounded-xl"><Home className="mr-2 h-4 w-4" />Home</TabsTrigger>
              </TabsList>
            </Tabs>

            {!todayOnly ? (
              <div className="grid grid-cols-4 gap-2">
                {weekData.days.map((d, idx) => (
                  <Button key={d.day} variant={idx === dayIndex ? "default" : "outline"} className="rounded-xl" onClick={() => setDayIndex(idx)}>
                    {d.day}
                  </Button>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border bg-white p-3 text-sm text-slate-600">
                Showing only today’s workout: <span className="font-medium text-slate-900">{dayData.day} — {dayData.focus}</span>
              </div>
            )
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm border-0">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between gap-3">
              <div>
                <CardTitle className="text-lg">{dayData.day} — {dayData.focus}</CardTitle>
                <p className="text-sm text-slate-600 mt-1">Tap each item when completed.</p>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full" onClick={resetWeek} title="Reset current week">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentItems.map((item, idx) => {
                const k = keyFor(week, dayIndex, mode, idx);
                const isChecked = !!checked[k];
                return (
                  <label key={k} className={`flex items-start gap-3 rounded-2xl border p-4 transition ${isChecked ? "bg-slate-100" : "bg-white"}`}>
                    <Checkbox checked={isChecked} onCheckedChange={() => toggle(idx)} className="mt-0.5" />
                    <span className={`text-sm leading-6 ${isChecked ? "line-through text-slate-500" : "text-slate-900"}`}>{item}</span>
                  </label>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm border-0">
          <CardContent className="pt-6 text-sm text-slate-600 space-y-2">
            <p><strong>Use:</strong> EOS or Home based on where you train that day.</p>
            <p><strong>Recovery-focused weeks:</strong> 8 and 12. <strong>Taper:</strong> 15 and 16.</p>
            <p><strong>Rule:</strong> Don’t double up missed days—just continue with the plan.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
