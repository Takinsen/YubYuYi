export interface Lot {
  farmId: string;
  weight: {
    net: number;
    gross: number;
  };
  grade: string;
  type: 'FRESH' | 'DRY' | string; 
  verify: boolean;
  size: {
    width: number;
    length: number;
    height: number;
  };
  variety: string;
  palletId: string;
}

const createLot = async (lot: Lot, token: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/lot/create`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",  
      },
      credentials: "include", 
      body: JSON.stringify(lot),
    });

    return await res.json();
  } catch (error) {
    console.error("Error creating lot:", error);
    throw error;
  }
}

export default createLot;