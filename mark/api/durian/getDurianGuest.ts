const getDurianGuest = async (id:string, lang:string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/durian/${id}?lang=${lang}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })

    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default getDurianGuest;