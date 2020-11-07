import React, { useState } from 'react';
import { connect } from 'react-redux';
import CustomButton from '../custom-button/button.component'
import { SignInContainer } from '../signin/signin.styles';
import './register.style.scss';
import { SignUpTitle, SignUpContainer, ButtonsBarContainer } from './register.styles'
import { storage, firestore } from '../../firebase/firebase.utils'

 
const ImageInput  = ({currentUser}) =>{

  const allinputs = {imgUrl: ''}
  const [imageAsfile, setImageAsfile] = useState('');
  const [imageAsurl, setImageAsurl] = useState(allinputs);
  const [imagePreview, setImagePreview] = useState('');

  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsfile(imageFile => (image))

    let reader = new FileReader();

    reader.onloadend = () => {
      setImagePreview(prevObject => ({...prevObject, imagepreview: reader.result}))
    }
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
 
    return (
      <SignUpContainer>
        <SignUpTitle>Solo falta un paso <br/> para disfrutar</SignUpTitle>
        <form className='fromularioR' onSubmit={handleFirebaseUpload}>
            <ButtonsBarContainer>
              <input type='file' id='file' onChange={handleImageAsFile}/>
              <label htmlFor="file">Elegir foto</label>
              <CustomButton type='submit'>Subir foto</CustomButton>
            </ButtonsBarContainer>
            <img src={imagePreview.imagepreview}/>
        </form>
      </SignUpContainer>
    );
    
}
 
const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(
  mapStateToProps,
  null
)(ImageInput);