const assignToShipping = async (shippingId: string, lotId: string, token: string) : Promise<void> => {
 try {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/lot/assign`, {
    method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        shippingId,
        lotId
      }),
  });

  return await res.json();

 } catch (error) {
  console.error("Failed to assign lot to shiping:", error);
  throw error;
 }
}

export default assignToShipping;