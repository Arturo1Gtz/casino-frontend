import React, { useState } from 'react'
import { Header, Segment, Grid, Button, Sidebar } from 'semantic-ui-react'

const SidebarUser = () => {
    const [logout, setLogout] = useState(false)
    const [isVisible, setIsvisible] = useState(true)
    
    return(
        <Sidebar 
        animation='overlay'
        direction='right'
        icon='labeled'
        vertical
        onHide={() => setIsvisible(false)}
        visible={isVisible}
        >

        </Sidebar>
    )
    
}