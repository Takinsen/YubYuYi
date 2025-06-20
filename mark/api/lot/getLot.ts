const getLot = async (token:string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/lot/mine`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",  
      },
      credentials: "include", 
  });

  return await res.json();
} catch (error) {
  console.error("Error fetching lots:", error);
  throw error;
}
}
export default getLot;