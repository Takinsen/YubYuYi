const getDurianGuest = async (id:string, lang:string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/durian/${id}?lang=${lang}`)
  } catch (error) {
    
  }
}