import React from 'react';
import {Header, Menu, Segment, Sidebar, Container} from 'semantic-ui-react';
import SignIn from '../../components/signin/signin.component';

const SidebarA = () => {
    const [visible, setVisible] = React.useState(true)
    
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