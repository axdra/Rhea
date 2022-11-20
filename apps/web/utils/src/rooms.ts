import parse from "node-html-parser";
import { endpoint, startTimeLookup } from "./constants";
import { IKronoxBookingRoom, IKronoxTimeSlot } from "./types/booking";



export const getBookableRooms = async (session: string, location: string): Promise<String[]> => {
     const response = await fetch(`${endpoint}ajax/ajax_resursbokning.jsp?${
        new URLSearchParams({
            op: 'hamtaBokningar',
            flik: location,
            datum:'00-00-00'
    })}`, {
        headers: {
            'Cookie': `JSESSIONID=${session}`,
        }
     })
        const data = await response.text(); 
    const doc = parse(data);
    const rooms = doc.querySelectorAll('.grupprum-kolumn > b').map((e) => e.innerText);
    return rooms;
}
    


export const getRoomBookings = async (session: string, location:string, date:string):Promise<IKronoxBookingRoom[]> => {
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

interface IRoomBookingResponse {
    room: string;
    ok: boolean;
}


export const bookRoom = async (session: string, location:string, date:string, roomId:string, timeSlot: number):Promise<IRoomBookingResponse> => {
    return fetch(`${endpoint}ajax/ajax_resursbokning.jsp?${
        new URLSearchParams({
            op: 'boka',
            datum: date,
            flik: location,
            id: roomId,
            intervall: timeSlot.toString(),
            typ: 'RESURSER_LOKALER',
            moment: "Booked via Rhea"
    })}`, {
        headers: {
            'Cookie': `JSESSIONID=${session}`,
        }
    }).then(res => {
       return res.text().then(data => {
            if(data.includes("OK")){
                return {
                    room: roomId,
                    ok: true
                }
            }
            else{
                return {
                    room: roomId,
                    ok: false
                }
            }
        })
    }).catch(err => {
        return {
            room: roomId,
            ok: false
        }
    }
    )
}