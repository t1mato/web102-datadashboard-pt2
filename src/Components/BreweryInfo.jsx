import React, { useState, useEffect } from 'react'

const BreweryInfo = ({ id, name, city, state, type }) => {
    
    const [label, setLabel] = useState(null)

    useEffect(() => {

        const getBreweryInfo = async () => {
            const response = await fetch(
                `https://api.openbrewerydb.org/v1/breweries?by_state=${state}`
            )
            const json = await response.json()
            setLabel(json)
        }
        getBreweryInfo().catch(console.error)

    }, [state])

    return (
        <>
            { label ? (
                <>
                    <tr key={id}>
                        <td>{name}</td>
                        <td>{city}</td>
                        <td>{state}</td>
                        <td>{type}</td>
                    </tr>
                </>
            ) :
            null
            }
        </>
    )

}

export default BreweryInfo