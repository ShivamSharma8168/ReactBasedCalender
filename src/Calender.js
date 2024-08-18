import React, { Component } from 'react';
import CalenderDays from './calender-days';
import './calender.css';

// adding weekdays and all months of a year 

export default class Calender extends Component {
    constructor() {
        super();
        this.weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.state = {
            currentDay: new Date(),
            // adding event here 
            events: {}
        };
    }
    changeCurrentDay = (day) => {
        this.setState({ currentDay: new Date(day.year, day.month, day.number) });
    }
    // adding an event 
    addEvent = (date, event) => {
        const dateString = date.toDateString();
        // for debugging puprose 
        console.log("Adding Event :", event, "on ", dateString);
        this.setState(prevState => {
            const events = { ...prevState.events };
            if (!events[dateString]) {
                events[dateString] = [];
            }
            events[dateString].push(event);
            // debugging purpose 
            console.log("Updated event state :", events);
            return { events };
        });

    }
    removeEvent = (date, index) => {
        const dateString = date.toDateString();
        this.setState(prevState => {
            const events = { ...prevState.events };
            if (events[dateString]) {
                events[dateString].splice(index, 1);
                if (events[dateString].length === 0) {
                    delete events[dateString];
                }
            }
            return { events };
        });
    }




    render() {
        // newly updated 
        const currentMonth = this.state.currentDay.getMonth();
        const currentYear = this.state.currentDay.getFullYear();
        // const formattedMonth = (currentMonth + 1).toString().padStart(2, '0');

        return (
            <div className="calender" >
                <div className="calender-head">

                    <h2>
                        {/* {this.months[this.state.currentDay.getMonth()]} {this.state.currentDay.getFullYear()} */}
                        {this.months[currentMonth]} {currentYear}
                    </h2>
                </div>

                <div className="calender-body">
                    <div className="table-header">
                        {
                            this.weekdays.map((weekday, index) => {
                                return <div className="weekday" key={index} > <p> {weekday}</p> </div>
                            })
                        }

                    </div>
                    <div >
                        <CalenderDays
                            day={this.state.currentDay}
                            changeCurrentDay={this.changeCurrentDay}
                            events={this.state.events}

                        />


                        {/* form to add an event  */}
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const event = e.target.event.value;
                            const date = this.state.currentDay;
                            // const selectedDate = new Date(document.getElementById('dateInput').value);


                            // const dateInput = e.target.date.value;

                            // && selectedDate.getFullYear() === currentYear

                            // if (selectedDate.getMonth() === currentMonth ) {

                            //     document.getElementById('demo').innerText = `Selected Date: ${selectedDate.toString()}`;
                            // } else {
                            //     alert('Please select a date within the current month.');
                            // }
                            this.addEvent(date, event);

                            // this.addEvent(date, event);
                            e.target.reset();
                        }}>
                            {/* <input type="date"  id="dateInput" /> */}
                            <div className="inputbox">
                                <input type="text" name="event" placeholder="Event name" required />
                                <button type="submit">Add Event</button>
                            </div>

                        </form>
                        {/* display the evenet here  */}
                        <div className="generated-text" >
                            {console.log("Current Day:", this.state.currentDay.toDateString())}
                            {console.log("Events on Current Day:", this.state.events[this.state.currentDay.toDateString()])}

                            {this.state.events[this.state.currentDay.toDateString()] ? (
                                this.state.events[this.state.currentDay.toDateString()].map((event, index, selectedDate) => (<>
                                    <p className="para-data" key={index}  >{event}
                                    <button
                                        className="delete-btn"
                                        onClick={() => this.removeEvent(this.state.currentDay, index)}
                                    >
                                        ×
                                    </button>

                                    </p>
                                   





                                </>

                                ))
                            ) : (
                                <p id="noevent" >No events for today</p>
                            )}
                        </div>



                    </div>
                </div>
            </div>
        );
    }
}


