import React from 'react'

function Profile({user}) {
    return (
        <div>
            <h1>Hello {user.displayName? user.displayName.split(' ')[0] : ''}</h1>
        </div>
    )
}

export default Profile
