const logout = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default logout;