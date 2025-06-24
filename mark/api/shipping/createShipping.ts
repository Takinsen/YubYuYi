export interface shipping {
  licensePlate: string;
      pickedAt: string;
      displayId: string;
      importBy: string;
      exportBy: string;
}



const createShipping = async (shipping: shipping, token: string) => {
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

export default createShipping;