import React from 'react';
import {Header, Menu, Segment, Sidebar, Container, Button} from 'semantic-ui-react';
import SignIn from '../signin/signin.component';
import Register from '../register/register.component';
import { useState } from 'react';

const SidebarA = (props) => {
    const[isVisible, setIsvisible] = useState (true)
    const [forms, setForm] = React.useState(true)
    

    
    return(
        <Sidebar
        animation='overlay'
        direction='right'
        icon='labeled'
        onHide={() => setIsvisible(false)}
        vertical
        visible={isVisible}
        >
            <Header 
                as='h1'
                textAlign='center'
                >
                    Bienvenido
            </Header>
             {
                 forms ? <Segment basic><SignIn/><Button basic onClick= {()=> setForm(false)}>Registrarse</Button></Segment>:
                 <Segment basic><Register/><Button basic onClick= {()=> setForm(true)}>Sign in</Button></Segment>
             }
        </Sidebar>
    );
    
}


export default SidebarA