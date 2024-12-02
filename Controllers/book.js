import {format} from 'date-fns';


let rooms=[{
   room_id:1,
   room_no:"101",
   room_name:"standard",
   room_booked_dates : [],
   amenities:"Tv,washingmechine,ironbox",
   seats: 4,
   price_per_hr:1000
},
{
    room_id:2,
    room_no:"103",
    room_name:"ultra",
    room_booked_dates : [],
    amenities:"Tv,washingmechine,ironbox",
    seats: 5,
    price_per_hr:4000

},
{
    room_id:3,
    room_no:"105",
    room_name:"delux",
    room_booked_dates : [],
    amenities:"Tv,washingmechine,ironbox",
    seats: 6,
    price_per_hr:6000

}]

let bookingRoom =[]

export const createRoom =  (req, res)=>{
    try{
        const {room_no,  room_name, amenities, seats, price_per_hr} = req.body;
        let index = rooms.findIndex(room=> room.room_no === room_no);
        if(index !== -1){
            return res.status(404).json({message : `The given Room No , try to give unique RNo`});
        }
        let newRoom = {
            ...(req.body),
            room_id : rooms.length+1,
            room_booked_dates : [],
        }
        rooms.push(newRoom);
        res.status(201).json({message : `Created Successfully`, data : newRoom});
    }catch(err){
            res.status(500).json({
            message : `Error!`
        })
        console.log(err);
    }
    
}
export const getAllRoomDetails =  (req, res)=>{
    try{

   
        if(rooms.length === 0){
            return res.status(404).json({ message: `There is no Room not yet created` });
        }

        
         res.status(200).json({message : `Data Fetched Suceesfully`, allRooms: rooms});

    }catch(err){

         
        res.status(500).json({
            message : `Error!`
        })
        console.log(err);
    }
    
}



export const roomBooking = (req, res) => {
    try {

        
        const { customer_name, date, start_time, end_time, room_id } = req.body;

        
        let dateTime = new Date();
        let today = format(dateTime, 'yyyy-MM-dd');

    
        const roomIndex = rooms.findIndex(room => room.room_id === room_id);
        if (roomIndex === -1) {
            return res.status(404).json({ message: `There is no Room with the  id ${room_id}` });
        }

        
        let room = rooms[roomIndex];
        let isBooked = room.room_booked_dates.some(bookedDate => bookedDate === date);
        if (isBooked) {
            return res.status(400).json({ message: `Room ${room.room_no} is already booked in the date ${date}` });
        }

        
        if (date < today) {
            return res.status(400).json({ message: "Booking date must be today or future" });
        }


        let roomDateCheck = bookingRoom.some(e=> e.date === date && e.room_id === room_id);
        if(roomDateCheck){
            return res.status(404).json({ message: `For the given room id : ${room_id}, the given date is not available` });
        }

        
        let bookedRoom = {
            ...(req.body),
            booking_status : "Booked",
            booking_date : today,
            booking_id : bookingRoom.length+1
        }

    
        bookingRoom.push(bookedRoom);

    
        room.room_booked_dates.push(date);

    
        res.status(200).json({ message: `Room ${room.room_no} booked successfully`, roomBookedDetails : {room_name: room.room_name, ...bookedRoom} });

    } catch (err) {

        
        res.status(500).json({
            message: `Error!`
        });
        console.log(err);
    }
}


export const getAllBookedRoomDetails = (req, res)=>{
    try{

        
        if(bookingRoom.length === 0){
            return res.status(404).json({ message: `There is no Room not yet booked` });
        }

        let bookedRoomInfo = bookingRoom.map(booking=>{
            let room = roomsDetails.find(e=> e.room_id === booking.room_id)
            return {
                room_name : room.room_name,
                booked_status : booking.booking_status,
                customer_name : booking.customer_name,
                date : booking.date,
                start_time : booking.start_time,
                end_time : booking.end_time
            }
        });

        
        res.status(200).json({message : `Fetched Suceesfully`, allBookedRooms: bookedRoomInfo});

   }catch(err){

    
       res.status(500).json({
           message : ` Error!`
       })
       console.log(err);
   }
} 


export const getAllCustomerWithRoomDetails = (req, res)=>{
    try{

    
        if(bookingRoom.length === 0){
            return res.status(404).json({ message: `There is no Room not yet booked` });
        }

        
            let customerDetails = bookingRoom.map(booking=>{
            let room = roomsDetails.find(e=> e.room_id === booking.room_id)
            return {
                customer_name : booking.customer_name,
                room_name : room.room_name,
                date : booking.date,
                start_time : booking.start_time,
                end_time : booking.end_time
            }
        });

    
        res.status(200).json({message : `Data Fetched Suceesfully`, BookedRoomsCustomerDetails: customerDetails});
    }catch(err){

    
        res.status(500).json({
            message : `Internal Server Error!`
        })
        console.log(err);
    }
}
export const customerBookDetails = (req, res)=>{
    try{

        
        const { customer_name } = req.params;

        
        let oneCustomerDetails = bookingRoom.filter(bookedRoom => bookedRoom.customer_name === customer_name);

        
        if(oneCustomerDetails.length === 0){
            return res.status(404).json({
                message : `There is no booked room details to show, for the customer: ${customer_name}`
            })
         }  

        
        oneCustomerDetails = oneCustomerDetails.map(booking => {
            let room = roomsDetails.find(room => room.room_id === booking.room_id);
            booking.room_name = room.room_name;
            return booking; 
        });

        
        let resCustomer = {
            customer_name : customer_name,
            booking_count: oneCustomerDetails.length,
            roomInfo : oneCustomerDetails.map(e => ({
                room_name: e.room_name,
                date: e.date,
                start_time: e.start_time,
                end_time: e.end_time,
                booking_id: e.booking_id,
                booking_date: e.booking_date,
                booking_status: e.booking_status
            }))
        };
            

         
         res.status(200).json({message : `Data Fetched Suceesfully`, data : resCustomer});

    }catch(err){


        res.status(500).json({
            message : `Internal Server Error!`
        })
        console.log(err);
    }
    
}   
export const pageNotFound = (req, res)=>{
    res.status(404).json({message : `For the given API Endpoint, there is no page available`});
}