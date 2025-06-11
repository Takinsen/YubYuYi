export const roleQuery = {
    farm: {
        select: 'farmId,status',
        populate: 'farmId:name;GAP'
    },
    house: {
        read: ["name" , "nameEN"],
        
    }

}