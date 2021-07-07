
import React from 'react'
import JournalEntry from './JournalEntry';


const JournalEntries = () => {

    const entries = [1,2,3,4,6,7];
    
    return (
        <div className="journal__entries">
            {
                entries.map( i => (
                    <JournalEntry key={ i }/>
                ))
            }
        </div>
    )
}

export default JournalEntries
