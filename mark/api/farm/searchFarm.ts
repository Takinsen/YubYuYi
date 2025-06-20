const searchFarm = async (token: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/farm/search`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    return await res.json();
  } catch (error) {
    console.error("Error searching farm:", error);
    throw error;
  }
}

export default searchFarm;