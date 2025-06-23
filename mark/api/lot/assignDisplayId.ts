const assignDisplayIdToLot = async (lotId:string ,displayId:string , token:string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/lot/edit/${lotId}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",  
      },
        body: JSON.stringify({ displayId }),
      credentials: "include", 
  });

  return await res.json();
} catch (error) {
  console.error("Error assigning display ID to lot:", error);
  throw error;
}
}
export default assignDisplayIdToLot;