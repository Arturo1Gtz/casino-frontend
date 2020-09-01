import React, { useEffect, useRef, useState } from 'react';
import {Header, Menu, Segment, Sidebar, Container} from 'semantic-ui-react';
import SignIn from '../../components/signin/signin.component';

const SidebarA = () => {
    const [visible, setVisible] = useState(true)
    
    // let sidebarRef =useRef();

    // useEffect(() => {
    //     let handler = (event)=>{
    //         if(!sidebarRef.current.contains(event.target)){
    //             setVisible(false);

    //         }
    //     };

    //     document.addEventListener('mousedown', handler);
    //     return()=>{
    //         document.removeEventListener('mousedown', handler);
    //     }
    // });

  
    
    return(

        <Sidebar 
        animation='overlay'
        direction='right'
        icon='labeled'
        onHide={() => setVisible(false)}
        vertical
        visible={visible}
        >
            <Segment basic>
                <Header 
                className='header1'
                as='h3'
                margin='40px'
                >
                    Bienvenido
                </Header>
            </Segment>
            <Segment inverted>
                <SignIn>
                </SignIn>
            </Segment>
            
        </Sidebar>
       
    );
}
export default SidebarA;