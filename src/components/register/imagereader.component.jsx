import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CustomButton from '../custom-button/button.component'
import PartialRegister from '../register/partial-register.component'
import './imagereader.styles.scss';
import { SignInAndSignUpContainer } from '../../pages/signin-signup/inicio-styles'
import { SignUpTitle, ButtonsBarContainer } from './register.styles'
import { storage, firestore } from '../../firebase/firebase.utils'

 
const ImageInput  = ({currentUser}) =>{

  const allinputs = {imgUrl: ''}
  const [imageAsfile, setImageAsfile] = useState('');
  const [imageAsurl, setImageAsurl] = useState(allinputs);
  const [imagePreview, setImagePreview] = useState();

  useEffect(() => {
    if(!imageAsfile) {
      setImagePreview(undefined);
      return
    }
    const objectUrl = URL.createObjectURL(imageAsfile)
    setImagePreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl)
  }, [imageAsfile])

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
  if(currentUser.firstname === ""){
    return(
      <div className='signUp'>
        <PartialRegister/>
      </div>
    )
  }else{
    return (
      <div className='readerContent'>
        <div className='formreader'>

          <div className='form'>

            <div className='sigUp'>
              <SignUpTitle>Solo falta un paso <br/> para disfrutar</SignUpTitle>
                <form className='fromularioR' onSubmit={handleFirebaseUpload}>
                  <ButtonsBarContainer>
                    <input type='file' id='file' onChange={handleImageAsFile}/>
                    <label htmlFor="file">Elegir foto</label>
                    <CustomButton type='submit'>Subir foto</CustomButton>
                  </ButtonsBarContainer>
                </form>

            </div>

          </div>

        </div>

        <div className='imagePreview'>
          {
            imagePreview ? <img src={imagePreview} className='preview'/> : <img/>
          }
        </div>
      </div>
    );
  }
    
    
}
 
const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(
  mapStateToProps,
  null
)(ImageInput);