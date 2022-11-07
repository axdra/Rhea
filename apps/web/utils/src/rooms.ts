import parse from "node-html-parser";
import { endpoint, startTimeLookup } from "./constants";
import { IKronoxBookingRoom, IKronoxTimeSlot } from "./types/booking";

export const getRooms = async (session: string, location:string, date:string):Promise<IKronoxBookingRoom[]> => {
    const response = await fetch(`${endpoint}ajax/ajax_resursbokning.jsp?${
        new URLSearchParams({
            op: 'hamtaBokningar',
            datum: date,
            flik: location
    })}`, {
        headers: {
            'Cookie': `JSESSIONID=${session}`,
        }
    })
    const data = await response.text(); 
    const doc = parse(data);
    console.log(data)
    const rooms:IKronoxBookingRoom[] = [];
    const roomElements = doc.querySelectorAll('tr').slice(1);
    roomElements.forEach(roomElement => {
        const roomId = roomElement.querySelector('td b')?.text;
        const timeSlots: IKronoxTimeSlot[] = [];
        roomElement.querySelectorAll('.grupprum-ledig, .grupprum-upptagen').forEach((element,i) => {
            const slotNumber = i;
            if(element.classList.contains('grupprum-ledig')){
                timeSlots.push({
                    slotNumber:slotNumber,
                    startTime: startTimeLookup[slotNumber],
                    endTime: startTimeLookup[slotNumber],
                    isBookable: true
            

                });
            }
            else{
                timeSlots.push({
                    slotNumber: slotNumber,
                    startTime: startTimeLookup[slotNumber],
                    endTime: startTimeLookup[slotNumber],
                    isBookable: false,
                    bookedBy: element.querySelector('center')?.text.trim(),
                    bookingReason: element.getAttribute('title'),

                })
            }
            
        });
        rooms.push({
            id: roomId ?? '',
            timeSlots,
            date,
            location
        })
    });
    return rooms;

        
}
