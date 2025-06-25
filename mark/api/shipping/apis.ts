export interface shipping {
  licensePlate: string;
      pickedAt: string;
      displayId: string;
      importBy: string;
      exportBy: string;
}



export const createShipping = async (shipping: shipping, token: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/shipping/create`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",  
      },
      credentials: "include", 
      body: JSON.stringify(shipping),
    })
  } catch (error) {
    console.error("Error creating shipping:", error);
    throw error;
  }
}

export const getContents = async (id:string , token:string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/shipping/contents/${id}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",  
      },
      credentials: "include", 
  });

  return await res.json();
} catch (error) {
  console.error("Error fetching shipping contents:", error);
  throw error;
}
}

export const getShipping = async (token: string) => {
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



