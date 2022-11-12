import parse from "node-html-parser"
import { endpoint } from "./constants"
import { IKronoxBookingRoom, IKronoxTimeSlot } from "./types/booking"

export const GetUserBookings = async (token: string, location: string, date:string ): Promise<IKronoxBookingRoom[]> => {
    const response = await fetch(endpoint + "minaresursbokningar.jsp?" + new URLSearchParams({
            flik: location,
            datum:  date
        }) , {
        headers: {
                cookie: `JSESSIONID=${encodeURI(token)}`,
        },
    })
    
    
    const data = await response.text()
    const doc = parse(data)
    let rooms = doc.querySelectorAll("[id*='post']")
    
    
    const roomList: any[] =   rooms.map(room=>{
        return {
            bookingId: room.getAttribute("id"),
            name: room.querySelector("div > b")?.text.split(',')[1].trim(),
            date: room.querySelector("div > a")?.text,
            startTime: room.querySelector("div")?.text.split(' ')[1].split('-')[0].trim(),

        }

    })
    return new Promise((resolve, reject) => {
        resolve(roomList)
    })
    
    
}
