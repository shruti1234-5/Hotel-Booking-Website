import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Room from '../components/Room';
import Loader from '../components/Loader';
import 'antd/dist/reset.css';  
import Error from '../components/Error';
import moment from 'moment';
import { DatePicker, Space } from 'antd';
const {RangePicker} = DatePicker;


function Homescreen() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true); // Set initial loading state to true
    const [error, setError] = useState(false); // Use boolean for error
    const [fromdate, setfromdate] = useState();
    const [todate, settodate] = useState();
    const [duplicaterooms, setduplicaterooms] = useState([]);
    const [searchkey, setsearchkey] = useState('');
    const [type, settype] = useState('all');

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get('/api/rooms/getallrooms');
                setRooms(response.data);
                 setduplicaterooms(response.data);             
            } catch (err) {
                setError(true);
                console.log(err);
            } finally {
                setLoading(false); // Always set loading to false at the end
            }
        };
        fetchRooms();
    }, []); // Empty dependency array to run once on mount
       

    function filterByDate(dates)
    {      
        console.log((dates[0].format('DD-MM-YYYY')))
        console.log((dates[1].format('DD-MM-YYYY')))
        setfromdate((dates[0].format('DD-MM-YYYY')))
        settodate((dates[1].format('DD-MM-YYYY')))
   
         var temprooms = []
         var availability = false
         for( const room of duplicaterooms)
         {
                 if (room.currentbookings.length > 0){
                    for( const booking of room.currentbookings){
                        if (
                            !moment(dates[0].format("DD-MM-YYYY")).isBetween(booking.fromdate, booking.todate) &&
                            !moment(dates[1].format("DD-MM-YYYY")).isBetween(booking.fromdate, booking.todate)
                        )
                        {
                        if(
                        moment((dates[0]).format("DD-MM-YYYY")) !== booking.fromdate &&
                        moment((dates[0]).format("DD-MM-YYYY")) !== booking.todate &&
                        moment((dates[1]).format("DD-MM-YYYY")) !== booking.fromdate &&
                        moment((dates[1]).format("DD-MM-YYYY")) !== booking.todate 
                    )
                    {
                        availability = true
                    }
                    }
                    }
                 }
                 if(availability === true || room.currentbookings.length == 0)
                 {
                    temprooms.push(room)
                 }
                 setRooms(temprooms)
                }
    }
    function filterBySearch(){
        const temprooms = duplicaterooms.filter(room=>room.name.toLowerCase().includes(searchkey.toLowerCase()))
        setRooms(temprooms)
    }
    function filterByType(e){
        settype(e)
        if(e !== "all")
        {
        const temprooms = duplicaterooms.filter(room=>room.type.toLowerCase()=== e.toLowerCase())
        setRooms(temprooms)
        }
        else{
          setRooms(duplicaterooms)
        }
    }


    return (
        <div className='container'>
            <div className='row mt-5 bs'>
              <div className='col-md-3 boundary' >
                < RangePicker format='DD-MM-YYYY' onChange={filterByDate} />
              </div>
                
              <div className='col-md-5'>
                <input type="text"className='form-control' placeholder='Search rooms' value={searchkey}
                onChange={(e)=>{setsearchkey(e.target.value)}} onKeyUp={filterBySearch}/>
                </div>
                <div className='col-md-3'>
                <select className='form-control'value={type}
                onChange={(e)=>{filterByType(e.target.value)}}>
                    <option value="all">All</option>
                    <option value="delux">Delux</option>
                    <option value="non-delux">Non-Delux</option>
                </select>
                </div>

            </div>

            <div className='row justify-content-center mt-5'>
                {loading ? (
                    <Loader/>
                ) : 
                (
                    rooms.map((room) => {
                      return ( <div className='col-md-9 mt-3' > {/* Add a unique key */}
                            <Room room={room} fromdate={fromdate} todate={todate} />
                        </div>
                      )
                  })
                )  }
            </div>
        </div>
    );
}

export default Homescreen;
