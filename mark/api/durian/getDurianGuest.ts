const getDurianGuest = async (id: string, lang: string) => {
  try {
    console.log(id);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/durian/guest/${id}?lang=${lang}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",  
      },
      credentials: "include",  
    });

    console.log("Success");

    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default getDurianGuest;
