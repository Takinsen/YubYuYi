const inspect = async (displayId: string, status: string, note: string, token:string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/durian/inspect`, {
      method: "POST",
       headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        displayId,
        status,
        note
      }),
    })
  } catch (error) {
    console.error("Failed to insoect:", error);
    throw error;
  }
}

export default inspect;