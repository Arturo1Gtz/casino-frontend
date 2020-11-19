import React from 'react';
import GameBanner from '../../components/gameBanner/gameBanner.component';
import ImageIput from '../../components/register/imagereader.component';
import Croupier from '../../components/croupier/croupier.componente';
import MiniCroupier from '../../components/mini-croupier/mini-croupier.component';

import './rooms.styles.scss';
import fondoDados from '../../img/dados.jpg';
import fondoRuleta from '../../img/roulette.jpg';
import fondoPoker from '../../img/poker.jpg';
import { connect } from 'react-redux';



const RoomsPaige = ({history, currentUser})=> {
    function ruleta(){
        history.push('/ruleta');
    }
    // if('GOMD' !== "") {
    if(currentUser.imgurl != "") {
      return(
        <div className={'rooms'}>

        {/* fila 1 */}
        <div className={'rooms__fila'}>
          <div className={'rooms__fila__cont'} onClick={ruleta}>
            <div className={'rooms__fila__cont__coupier'}>
              <MiniCroupier num={1}></MiniCroupier>
            </div>
          </div>
          <div className={'rooms__fila__cont'} onClick={ruleta}>
            <div className={'rooms__fila__cont__coupier'}>
                <MiniCroupier num={2}></MiniCroupier>
              </div>
          </div>
          <div className={'rooms__fila__cont'} onClick={ruleta}>
            <div className={'rooms__fila__cont__coupier'}>
              <MiniCroupier num={3}></MiniCroupier>
            </div>
          </div>
          <div className={'rooms__fila__cont'} onClick={ruleta}>
            <div className={'rooms__fila__cont__coupier'}>
              <MiniCroupier num={4}></MiniCroupier>
            </div>
          </div>
          <div className={'rooms__fila__cont'} onClick={ruleta}>
            <div className={'rooms__fila__cont__coupier'}>
              <MiniCroupier num={5}></MiniCroupier>
            </div>
          </div>
          <div className={'rooms__fila__cont'} onClick={ruleta}>
           <div className={'rooms__fila__cont__coupier'}>
              <MiniCroupier num={6}></MiniCroupier>
            </div>
          </div>
          <div className={'rooms__fila__cont'} onClick={ruleta}>
            <div className={'rooms__fila__cont__coupier'}>
              <MiniCroupier num={7}></MiniCroupier>
            </div>
          </div>
          <div className={'rooms__fila__cont'} onClick={ruleta}>
            <div className={'rooms__fila__cont__coupier'}>
                <MiniCroupier num={8}></MiniCroupier>
              </div>
          </div>
        </div>

        {/* fila2 */}
        <div className={'rooms__fila'} >
          <div className={'rooms__fila__cont'} onClick={ruleta}>
            <div className={'rooms__fila__cont__coupier'}>
              <MiniCroupier num={9}></MiniCroupier>
            </div>
          </div>
          <div className={'rooms__fila__cont'} onClick={ruleta}>
            <div className={'rooms__fila__cont__coupier'}>
              <MiniCroupier num={10}></MiniCroupier>
            </div>
          </div>
          <div className={'rooms__fila__cont'} onClick={ruleta}>
            <div className={'rooms__fila__cont__coupier'}>
              <MiniCroupier num={11}></MiniCroupier>
            </div>
          </div>
          <div className={'rooms__fila__cont'} onClick={ruleta}>
           <div className={'rooms__fila__cont__coupier'}>
              <MiniCroupier num={12}></MiniCroupier>
            </div>
          </div>
          <div className={'rooms__fila__cont'} onClick={ruleta}>
            <div className={'rooms__fila__cont__coupier'}>
              <MiniCroupier num={13}></MiniCroupier>
            </div>
          </div>
          <div className={'rooms__fila__cont'} onClick={ruleta}>
            <div className={'rooms__fila__cont__coupier'}>
                <MiniCroupier num={14}></MiniCroupier>
              </div>
          </div>
          <div className={'rooms__fila__cont'} onClick={ruleta}>
            <div className={'rooms__fila__cont__coupier'}>
              <MiniCroupier num={15}></MiniCroupier>
            </div>
          </div>
          <div className={'rooms__fila__cont'} onClick={ruleta}>
            <div className={'rooms__fila__cont__coupier'}>
              <MiniCroupier num={16}></MiniCroupier>
            </div>
          </div>
        </div>


        {/* fila3 */}
        <div className={'rooms__fila'}>
          
          <div className={'rooms__fila__cont'} onClick={ruleta}>
            <div className={'rooms__fila__cont__coupier'}>
              <MiniCroupier num={17}></MiniCroupier>
            </div>
          </div>
          <div className={'rooms__fila__cont'} onClick={ruleta}>
           <div className={'rooms__fila__cont__coupier'}>
              <MiniCroupier num={18}></MiniCroupier>
            </div>
          </div>
          <div className={'rooms__fila__cont'} onClick={ruleta}>
           <div className={'rooms__fila__cont__coupier'}>
              <MiniCroupier num={19}></MiniCroupier>
            </div>
          </div>
          <div className={'rooms__fila__cont'} onClick={ruleta}>
           <div className={'rooms__fila__cont__coupier'}>
              <MiniCroupier num={20}></MiniCroupier>
            </div>
          </div>
          <div className={'rooms__fila__cont'} onClick={ruleta}>
           <div className={'rooms__fila__cont__coupier'}>
              <MiniCroupier num={21}></MiniCroupier>
            </div>
          </div>
          <div className={'rooms__fila__cont'} onClick={ruleta}>
           <div className={'rooms__fila__cont__coupier'}>
              <MiniCroupier num={22}></MiniCroupier>
            </div>
          </div>
          <div className={'rooms__fila__cont'} onClick={ruleta}>
           <div className={'rooms__fila__cont__coupier'}>
              <MiniCroupier num={23}></MiniCroupier>
            </div>
          </div>
          <div className={'rooms__fila__cont'} onClick={ruleta}>
           <div className={'rooms__fila__cont__coupier'}>
              <MiniCroupier num={24}></MiniCroupier>
            </div>
          </div>
          
        </div>

        </div>

      )
      
    }else{
        return(
          <ImageIput></ImageIput>
        )
    }
    
};

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

export default connect(
  mapStateToProps,
  null
)(RoomsPaige);