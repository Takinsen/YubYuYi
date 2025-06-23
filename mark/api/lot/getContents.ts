const getContents = async (id:string , token:string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/lot/contents/${id}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",  
      },
      credentials: "include", 
  });

  return await res.json();
} catch (error) {
  console.error("Error fetching lot contents:", error);
  throw error;
}
}
export default getContents;