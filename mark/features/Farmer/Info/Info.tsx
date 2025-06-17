"use client";

import { useEffect, useState } from "react";
import getDurianGuest from "@/api/durian/getDurianGuest";
import { useAuth } from "@/providers/AuthContext";

type InfoProps = {
  id: string;
};

export default function Info({ id }: InfoProps) {
  const { user } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(user);
        if (user?.token) {
          console.log("2222");
          const res = await getDurianGuest(id, "en", user.token);
          setData(res);
        }
      } catch (error) {
        console.error("Failed to fetch durian info", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, user]);

  

  return (
    <div>
      <h1>Farmer Info</h1>
      <p>Scanned ID: {id}</p>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
}
