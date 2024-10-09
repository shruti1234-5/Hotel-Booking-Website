// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import Loader from "../components/Loader";
// import Error from "../components/Error";
// import moment from "moment";
// import Swal from "sweetalert2";

// function Bookingscreen() {
//   const { roomid } = useParams();
//   const { fromdate } = useParams();
//   const { todate } = useParams();
//   const [room, setRoom] = useState();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState();
//   const totaldays = moment(todate, "DD-MM-YYYY").diff(moment(fromdate, "DD-MM-YYYY"), "days") +1;
//   const totalamount = room ? totaldays * room.rentperday : 0;

//   useEffect(() => {
    
//     // if(!localStorage.getItem('currentUser')){
//     //   window.location.reload='/login'
//     // }
//     const fetchRoomData = async () => {
   
//       try {
//         setLoading(true);
//         const response = await axios.post("/api/rooms/getroombyid", { roomid });
//         // settotalamount(response.data.rentperday * totaldays)
//         setRoom(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError(true);
//       } finally {
//         setLoading(false);
//       }
    
//     };

//     fetchRoomData();
//   }, [roomid]); // Add roomid as a dependency

//   async function bookRoom() {

//     const bookingDetails = {
//       room,
//       userid: JSON.parse(localStorage.getItem("currentUser"))._id,
//       fromdate,
//       todate,
//       totalamount,
//       totaldays,
//     };
//     console.log("Current User:", localStorage.getItem("currentUser"));
//     try {
//       setLoading(true);
//       const response = await axios.post(
//         "/api/bookings/bookroom",
//         bookingDetails
//       );
//       setLoading(false);
//       Swal.fire(
//         "Congratulations",
//         "Your Room Booked Successfully",
//         "success"
//       ).then((result) => {
//         window.location.href = "/profile";
//       });
//     } catch (error) {
//       setLoading(false);
//       Swal.fire("Oops, Something went wrong", "error");
//     }

//   }
 
//   return (
//     <div>
//       {loading ? (
//         <Loader />
//       ) : room ? (
//         <div className="m-5">
//           <div className=" justify-content-center mt-5 bs">
//             <h1 style={{ textAlign: "center" }}> {room.name}</h1>
//             <div className="col-lg-4 ">
//               <h1 className="mt-4 mb-4">Booking Details</h1>

           
//                 <p><b>Name</b> : {JSON.parse(localStorage.getItem('currentUser')).name } </p>
               
//                  <p> <b>From Date</b> : {fromdate} </p>
//                 <p> <b>To Date</b> : {todate}</p>
//                 <p> <b>Max Count </b>: {room.maxcount}  </p>
             
//             </div>
//             <div style={{ textAlign: "right" }}>
//               <b>
//                 <h1 className=" mb-4">Amount</h1>

//                 <p>
//                   <b>Total Days</b> : {totaldays}
//                 </p>
//                 <p>
//                   <b>Rent per day</b> : {room.rentperday}
//                 </p>
//                 <p>
//                   <b>Total Amount</b> : {totalamount}
//                 </p>
//               </b>

//               <button className="btn " onClick={bookRoom}> Pay Now </button>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <Error />
//       )}
//     </div>
//   );
// }
// export default Bookingscreen;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
import Swal from "sweetalert2";

function Bookingscreen() {
  const { roomid } = useParams();
  const { fromdate } = useParams();
  const { todate } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const totaldays = moment(todate, "DD-MM-YYYY").diff(moment(fromdate, "DD-MM-YYYY"), "days") + 1;
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const totalamount = room ? totaldays * room.rentperday : 0;

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        setLoading(true);
        const response = await axios.post("/api/rooms/getroombyid", { roomid });
        setRoom(response.data);
        setLoading(false);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomData();
  }, [roomid]);

  async function bookRoom() 
  {
    const bookingDetails = {
      room,
      userid: currentUser._id,
      fromdate,
      todate,
      totalamount,
      totaldays,
    };

    try {
      setLoading(true);
      const response = await axios.post("/api/bookings/bookroom", bookingDetails);
      setLoading(false);
      Swal.fire("Congratulations", "Your Room Booked Successfully", "success").then((result) => {
        window.location.href = "/profile";
      });
    } catch (error) {
      setLoading(false);
      Swal.fire("Oops, Something went wrong", "error");
    }
  }

  // Check if the user is logged in or if the name is empty
  if (!currentUser || currentUser.name === '') {
    Swal.fire('Please log in to book a room!', '', 'warning');
    // Optionally redirect to login page
    navigate('/login'); // Redirect to login page
    return null; // Don't render anything
  }

  return (
    <div>
      {loading ? (
        <Loader />
      ) : room ? (
        <div className="m-5">
          <div className="justify-content-center mt-5 bs">
            <h1 style={{ textAlign: "center" }}> {room.name}</h1>
            <div className="col-lg-4">
              <h1 className="mt-4 mb-4">Booking Details</h1>
              <b>
                <p><b>Name</b>: {currentUser.name}</p>
                <p><b>From Date</b>: {fromdate}</p>
                <p><b>To Date</b>: {todate}</p>
                <p><b>Max Count</b>: {room.maxcount}</p>
              </b>
            </div>
            <div style={{ textAlign: "right" }}>
              <b>
                <h1 className="mb-4">Amount</h1>
                <p><b>Total Days</b>: {totaldays}</p>
                <p><b>Rent per day</b>: {room.rentperday}</p>
                <p><b>Total Amount</b>: {totalamount}</p>
              </b>
              <button className="btn" onClick={bookRoom}>Confirm Booking</button>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}

export default Bookingscreen;

