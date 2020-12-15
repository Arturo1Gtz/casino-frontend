import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CustomButton from '../custom-button/button.component'
import PartialRegister from '../register/partial-register.component'
import './imagereader.styles.scss';
import { SignUpTitle, ButtonsBarContainer } from './register.styles'
import { storage, firestore } from '../../firebase/firebase.utils'
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

 
const ImageInput  = ({currentUser}) =>{

  const allinputs = {imgUrl: ''}
  const [imageAsfile, setImageAsfile] = useState('');
  const [imageAsurl, setImageAsurl] = useState(allinputs);
  const [imagePreview, setImagePreview] = useState();
  const [cropper, setCropper] = useState(null);
  const [cropData, setCropData] = useState(null);

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

  const getCropData = () => {
    if(cropper){
      cropper.getCroppedCanvas().toBlob((blob) => {
        setCropData(blob);
      });
    }
  }

  const handleFirebaseUpload = e => {
    e.preventDefault();
    getCropData();
    console.log('start of upload');
    if(imageAsfile == ''){
        console.error(`not an image, the fila is a ${typeof(imageAsfile)}`);
    }
    const uploadTask = storage.ref(`/images/${imageAsfile.name}`).put(cropData);
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

            <div className='imageForm'>
              <SignUpTitle>Solo falta un paso <br/> para disfrutar</SignUpTitle>
                <form className='formI' onSubmit={handleFirebaseUpload}>
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
            //imagePreview ? <img src={imagePreview} className='preview'/> : <img/>
            <Cropper
              style={{ height: 400, width: "100%"}}
              aspectRatio={1}
              src={imagePreview}
              guides={true}
              zoomable={false}
              autoCropArea={0.6}
              highlight={false}
              cropBoxResizable={false}
              dragMode={"none"}
              responsive
              background={false}
              onInitialized={(instance) => {
                setCropper(instance);
              }}
            /> 
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