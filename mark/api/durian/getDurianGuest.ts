const getDurianGuest = async (id: string, lang: string, token: string) => {
  try {
    console.log(id);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/durian/${"684f7890e8f98371464cd13a"}?lang=${lang}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
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
