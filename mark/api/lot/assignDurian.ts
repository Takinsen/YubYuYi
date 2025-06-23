const assignDurian = async (lotId: string, displayId: string): Promise<void> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/durian/assign`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        lotId,
        displayId,
      }),
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    console.log("Durian assigned successfully");
  } catch (error) {
    console.error("Failed to assign durian:", error);
    throw error;
  }
}

export default assignDurian;