"use client";
import useDefault from "@/hooks/useDefault";
import { Button } from "@mui/material";

export default function Home() {
  const { error, isLoading, msg } = useDefault();

  if (error) return <p>Error</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Connect to backend : {msg && msg}</h1>
      <Button variant="contained">Ride the rock</Button>
    </div>
  );
}
