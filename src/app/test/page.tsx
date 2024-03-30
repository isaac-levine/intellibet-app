"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useState, useEffect } from "react";

export default function Test() {
  const [message, setMessage] = useState("Loading...");
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/home")
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
        setTeams(data.teams);
      });
  }, []);

  return (
    <MaxWidthWrapper>
      <h1>This is a test page for the python server</h1>
      <p>{message}</p>
      <br />
      <ul>
        {teams.map((team, index) => (
          <li key={index}>{team}</li>
        ))}
      </ul>
    </MaxWidthWrapper>
  );
}
