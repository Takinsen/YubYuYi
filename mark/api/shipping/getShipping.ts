const getShipping = async (token: string) => {
  try{  
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/shipping/mine`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",  
      },
      credentials: "include", 
    });

    return await res.json();

  } catch (error)
 {
  console.error(error);
  throw error;
 }}

export default getShipping