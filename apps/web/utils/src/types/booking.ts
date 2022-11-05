
export interface IKronoxBookingRoom{
    id: string;
    timeSlots: IKronoxTimeSlot[];
    date: string;
    location: string;
}

export interface IKronoxTimeSlot{
    slotNumber: number;
    startTime: Date;
    endTime: Date;
    isBookable: boolean;
    bookedBy?: string;
    bookingReason?: string;
    bookingId?: string;
}

