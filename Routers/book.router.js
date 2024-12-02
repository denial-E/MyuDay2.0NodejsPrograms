import express from 'express'
import { createRoom, customerBookDetails, getAllBookedRoomDetails, getAllCustomerWithRoomDetails, getAllRoomDetails, pageNotFound, roomBooking } from '../Controllers/book.js';

const router= express.Router()

router.post('/createRoom', createRoom);
router.get('/allRooms', getAllRoomDetails);
router.post('/roomBooking', roomBooking);
router.get('/allBookedRoomDetails', getAllBookedRoomDetails);
router.get('/allBookedCustomerDetails', getAllCustomerWithRoomDetails);
router.get('/customerBookDetails/:customer_name', customerBookDetails);
router.get('*', pageNotFound)













export default router;