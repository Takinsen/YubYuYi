const assignDisplayIdToLot = async (id:string , token:string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/lot/edit/${id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",  
      },
        body: JSON.stringify({ displayId: id }),
      credentials: "include", 
  });

  return await res.json();
} catch (error) {
  console.error("Error assigning display ID to lot:", error);
  throw error;
}
}
export default assignDisplayIdToLot;