const login = async ( username:string, password:string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username , password }),
    });

    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default login;