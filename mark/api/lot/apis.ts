export const assignDisplayIdToLot = async (
  lotId: string,
  displayId: string,
  token: string
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/lot/edit/${lotId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ displayId }),
        credentials: "include",
      }
    );

    return await res.json();
  } catch (error) {
    console.error("Error assigning display ID to lot:", error);
    throw error;
  }
};

export const assignToShipping = async (
  shippingId: string,
  lotId: string,
  token: string
): Promise<void> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/lot/assign`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          shippingId,
          lotId,
        }),
      }
    );

    return await res.json();
  } catch (error) {
    console.error("Failed to assign lot to shiping:", error);
    throw error;
  }
};

export interface Lot {
  farmId: string;
  weight: {
    net: number;
    gross: number;
  };
  grade: string;
  type: "FRESH" | "DRY" | string;
  verify: boolean;
  size: {
    width: number;
    length: number;
    height: number;
  };
  variety: string;
  palletId: string;
}

export const createLot = async (lot: Lot, token: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/lot/create`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(lot),
      }
    );

    return await res.json();
  } catch (error) {
    console.error("Error creating lot:", error);
    throw error;
  }
};

export const getContents = async (id: string, token: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/lot/contents/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    return await res.json();
  } catch (error) {
    console.error("Error fetching lot contents:", error);
    throw error;
  }
};

export const getLot = async (token: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/lot/mine`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    return await res.json();
  } catch (error) {
    console.error("Error fetching lots:", error);
    throw error;
  }
};

export const approveLot = async (id: string, token: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/shipping/confirm/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    return await res.json();
  } catch (error) {
    console.error("Error fetching lots:", error);
    throw error;
  }
};
