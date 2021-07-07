import React from 'react'

const JournalEntry = () => {
    return (
        <div className="journal__entry pointer">
            <div 
                className="journal__entry-picture"
                style={{
                    backgroundSize:"cover",
                    backgroundImage:'url(https://www.gamereactor.es/media/72/legendzelda_2137223_1200x675.png)'
                }}
            >
            </div>
            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    un nuevo dia
                </p>
                <p className="journal__entry-content">
                    Lorem ipsum dolor sit amet consectetur.
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>Monday</span>
                <h4>20</h4>
            </div>
        </div>
    )
}

export default JournalEntry
