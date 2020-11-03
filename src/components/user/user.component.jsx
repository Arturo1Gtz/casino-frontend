import { storage, firestore } from '../../firebase/firebase.utils';
import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';

const User = ({currentUser}) => {
    const [transfer, setTransfer] = useState(null);
    const [recieve, setRecieve] = useState(null);
    const allinputs = {imgUrl: ''}
    const [imageAsfile, setImageAsfile] = useState('');
    const [imageAsurl, setImageAsurl] = useState(allinputs);

    const handleImageAsFile = (e) => {
        const image = e.target.files[0];
        setImageAsfile(imageFile => (image))
    }

    const handleFirebaseUpload = e => {
        e.preventDefault();
        console.log('start of upload');
        if(imageAsfile == ''){
            console.error(`not an image, the fila is a ${typeof(imageAsfile)}`);
        }
        const uploadTask = storage.ref(`/images/${imageAsfile.name}`).put(imageAsfile);
        uploadTask.on('state_changed',
        (snapshot) => {
            console.log(snapshot);
        }, (err) => {
            console.log(err);
        }, () => {
            storage.ref('images').child(imageAsfile.name).getDownloadURL().then(fireimageURL => {
                const userURLimage = firestore.collection("user").doc(`${currentUser.id}`);
                userURLimage.update({
                    imgurl: fireimageURL
                })
                setImageAsurl(prevObject => ({...prevObject, imgUrl: fireimageURL}))
            })
        })
        
    }
    
    return(
        <div className=''>
            <span>Hola soy el usuario {currentUser.nickname}</span>
            <h2></h2>
            <div>
                <Form onSubmit = {handleFirebaseUpload}>
                    <input 
                        type = "file"
                        onChange = {handleImageAsFile}
                    />
                    <Button  type="submit">Sube imagen</Button>
                </Form>
            </div>
            <div className ='image'>
                <img src={imageAsurl.imgUrl} alt="image tag"/>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
});

export default connect(
    mapStateToProps,
    null
)(User);