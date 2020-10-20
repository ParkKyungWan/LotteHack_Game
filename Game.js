import React, { useRef, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    mygame : {
      border: '10px solid #485922',
      margin: '10px',
      borderRadius: '10px',
      
    },
    
  }));

const Game = props => {

  const classes = useStyles();
  
  const canvasRef = useRef(null)
  
  
  //캔버스 관련 변수

        //가로 세로
        const [cWidth, setcWidth] = useState(810);
        const [cHeight, setcHeight] = useState(466);

        //현재 페이지
        const [nowPage,setnowPage] = useState('main');

        
        //타이틀 버튼 구현
        const [buttonSrc,setButtonSrc] = useState('/resources/pages/main/startButton.png');

         //아이템들 정보
         const [items,setitems] = useState(
             [
                 {
                    'name' : '파스퇴르',
                    'current' : [0,0],//현재좌표
                    'loc1': [51,42], //좌측 상단 모서리 좌표
                    'loc2': [118,228], //우측 하단 모서리 좌표
                    'answer' : 0,
                    'success' : false,
                 },{
                    'name' : '아이시스',
                    'current' : [0,0],//현재좌표
                    'loc1': [155,85], //좌측 상단 모서리 좌표
                    'loc2': [203,234], //우측 하단 모서리 좌표
                    'answer' : 0,
                    'success' : false,
                 },{
                    'name' : '떡볶이',
                    'current' : [0,0],//현재좌표
                    'loc1': [240,113], //좌측 상단 모서리 좌표
                    'loc2': [391,228], //우측 하단 모서리 좌표
                    'answer' : 1,
                    'success' : false,
                 },{
                    'name' : '자일리톨',
                    'current' : [0,0],//현재좌표
                    'loc1': [424,25], //좌측 상단 모서리 좌표
                    'loc2': [502,133], //우측 하단 모서리 좌표
                    'answer' : 0,
                    'success' : false,
                 },{
                    'name' : '자껍',
                    'current' : [0,0],//현재좌표
                    'loc1': [526,47], //좌측 상단 모서리 좌표
                    'loc2': [634,128], //우측 하단 모서리 좌표
                    'answer' : 0,
                    'success' : false,
                 },{
                    'name' : '알약',
                    'current' : [0,0],//현재좌표
                    'loc1': [484,167], //좌측 상단 모서리 좌표
                    'loc2': [621,254], //우측 하단 모서리 좌표
                    'answer' : 1,
                    'success' : false,
                 },{
                    'name' : '좋은 물',
                    'current' : [0,0],//현재좌표
                    'loc1': [671,65], //좌측 상단 모서리 좌표
                    'loc2': [751,233], //우측 하단 모서리 좌표
                    'answer' : 1,
                    'success' : false,
                 },
             ]
         );

        //지금 잡고있는 아이템 정보
        const [selected,setSelected] = useState(-1);
        //잡을 당시 마우스 좌표
        const [selectedloc,setSelectedLoc] = useState([-1,-1]);
        //잡을 당시 아이템 위치
        const [selectedIloc,setSelectedILoc] = useState([[-1,-1],[-1,-1],[-1,-1]]);

        
        //몇번 아이템의 설명을 보여줄까요 -> description 페이지 전용
        const [descNum,setdescNum] = useState(-1);


  const draw = (ctx) => {


    ctx.clearRect(0, 0, cWidth, cHeight)
    
    //메인 배경 이미지 그리기
    let mainbackg = new Image();
    mainbackg.src = '/resources/pages/main/mainbackg.jpg';
    ctx. drawImage( mainbackg, 0,0, cWidth ,cHeight );

    if (nowPage == 'main'){
        mainPage(ctx);

    }else if (nowPage == 'game'){
        gamePage(ctx);
    }else if (nowPage == 'description'){
      descriptionPage(ctx);
    } else if (nowPage == 'success'){
      successPage(ctx);
    } 

  }

  const mainPage = (ctx) => {
    //로고 그리기
    let mainlogo = new Image();
    mainlogo.src = '/resources/pages/main/mainlogo.png';
    ctx. drawImage( mainlogo, 0,0, cWidth ,cHeight );

    //게임 설명
    let subtitle = new Image();
    subtitle.src = '/resources/pages/main/subtitle.png';
    ctx. drawImage( subtitle, 0,0, cWidth ,cHeight );

    
    //시작 버튼
    let startButton = new Image();



    const canvas = canvasRef.current
    canvas.onmousedown =  (e) => {
        //277 372
        //549 412
        if( e.layerX > 281 && e.layerX < 544 && e.layerY<411 && e.layerY >370){
            setButtonSrc('/resources/pages/main/clickedButton.png');
        }
      }
    canvas.onmouseup = ( e ) => {
        if(buttonSrc == '/resources/pages/main/clickedButton.png'){
            setButtonSrc('/resources/pages/main/startButton.png');
            setnowPage('game');
        }
    }

    
    startButton.src = buttonSrc;
    ctx. drawImage( startButton, 270,360 , 270, startButton.height * (270/startButton.width) );
  }

  const gamePage  = (ctx) =>{

    let isEnd = true
    for(let i = 0 ; i < 7 ; i++){
      if(!items[i].success){
        isEnd = false;
        break;
      }
    }
    if(isEnd){
      setnowPage('success');
    }
    
    let items_tmp = items;

    //분류 창
    let core = new Image();
    core.src = '/resources/pages/game/gameCore.png';
    ctx. drawImage( core, 0,0, cWidth ,cHeight );

    
    //파스퇴르
    //51 ,42
    //118,228
    if(!items_tmp[0].success){
      let past = new Image();
      past.src = '/resources/pages/game/things/파스퇴르.png';
      ctx. drawImage( past, items_tmp[0].current[0],items_tmp[0].current[1], cWidth ,cHeight );
    }

    
    //아이시스
    //155 , 85
    //203 , 234
    if(!items_tmp[1].success){
      let icis = new Image();
      icis.src = '/resources/pages/game/things/아이시스.png';
      ctx. drawImage( icis, items_tmp[1].current[0],items_tmp[1].current[1], cWidth ,cHeight );
    }

    
    //떡볶이
    //240 , 113
    //391 , 228
    
    if(!items_tmp[2].success){
      let dduck = new Image();
      dduck.src = '/resources/pages/game/things/떡볶이.png';
      ctx. drawImage( dduck, items_tmp[2].current[0],items_tmp[2].current[1], cWidth ,cHeight );
    }

    
    //자일리톨
    //424 , 25
    //502 , 133
    
    if(!items_tmp[3].success){
      let xi = new Image();
      xi.src = '/resources/pages/game/things/자일리톨.png';
      ctx. drawImage( xi, items_tmp[3].current[0],items_tmp[3].current[1], cWidth ,cHeight );
    }
    //자껍
    //526 , 47
    //634 , 128
    
    if(!items_tmp[4].success){
      let xi_g = new Image();
      xi_g.src = '/resources/pages/game/things/자껍.png';
      ctx. drawImage( xi_g, items_tmp[4].current[0],items_tmp[4].current[1], cWidth ,cHeight );
    }

    
    //알약
    //484 , 167
    //621 , 254
    
    if(!items_tmp[5].success){
      let drug = new Image();
      drug.src = '/resources/pages/game/things/알약.png';
      ctx. drawImage(drug, items_tmp[5].current[0],items_tmp[5].current[1], cWidth ,cHeight );
    }

    
    //좋은물
    //671 , 65
    //751 , 233
    
    if(!items_tmp[6].success){
      let water = new Image();
      water.src = '/resources/pages/game/things/좋은물.png';
      ctx. drawImage(water, items_tmp[6].current[0],items_tmp[6].current[1], cWidth ,cHeight );
    }

    const canvas = canvasRef.current
    canvas.onmousedown =  (e) => {
        let items_tmp = items;
        let _selected = -1;
        for(let i = 0 ; i <7 ; i ++){
          if(!items_tmp[i].success){ //성공된건 생략
            if( e.layerX > items_tmp[i].loc1[0] && e.layerX < items_tmp[i].loc2[0] && e.layerY>items_tmp[i].loc1[1] && e.layerY <items_tmp[i].loc2[1]){
              _selected = i
            }
          }
        }
        if (_selected != -1){
          setSelected(_selected);
          setSelectedLoc([e.layerX,e.layerY]);
          setSelectedILoc([[items_tmp[_selected].current[0],items_tmp[_selected].current[1]],
            [items_tmp[_selected].loc1[0],items_tmp[_selected].loc1[1]],
            [items_tmp[_selected].loc2[0],items_tmp[_selected].loc2[1]]] );
        }


    }
    canvas.onmouseup = ( e ) => {
      //분리수거 하기
        //197 , 292
        //409 , 431
      //다시 가져가기
        //417 , 293
        //618 , 430
        if(selected != -1){

            const _selected = selected;
            let items_tmp = items;

            setSelected(-1);
            setSelectedLoc([-1,-1]);
            setSelectedILoc([[-1,-1],[-1,-1],[-1,-1]]);

            if( e.layerX > 197 && e.layerX < 409 && e.layerY > 292 && e.layerY < 431){
              //분리수거 하기에다가 놓은 경우
              if(items_tmp[_selected].answer == 0){
                
                let items_tmp = items;
                items_tmp[_selected].success = true;
                setitems(items_tmp);
                setdescNum(_selected);
                setnowPage('description');
              }else{
                alert("다시 생각해 보세요!")
              }

            }else if (e.layerX > 417 && e.layerX < 618 && e.layerY > 293 && e.layerY < 430){
              //다시 가져가기에다가 놓은 경우
              
              if(items_tmp[_selected].answer == 1){
                let items_tmp = items;
                items_tmp[_selected].success = true;
                setitems(items_tmp);
                setdescNum(_selected);
                setnowPage('description');
                
              }else{
                alert("다시 생각해 보세요!")
              }

            }
        }
    }
    canvas.onmousemove = ( e ) => {
      let items_tmp = items;
      let _selected = selected;
      let _selectedloc = selectedloc;
      let _selectedIloc = selectedIloc;
      if(selected != -1){
        
        items_tmp[_selected].current[0] = (_selectedIloc[0][0] + (e.layerX-_selectedloc[0]));
        items_tmp[_selected].current[1] = (_selectedIloc[0][1] + (e.layerY-_selectedloc[1]));
        
        items_tmp[_selected].loc1[0] = (_selectedIloc[1][0] + (e.layerX-_selectedloc[0]));
        items_tmp[_selected].loc1[1] = (_selectedIloc[1][1] +(e.layerY-_selectedloc[1]));

        
        items_tmp[_selected].loc2[0] = (_selectedIloc[2][0] + (e.layerX-_selectedloc[0]));
        items_tmp[_selected].loc2[1] = (_selectedIloc[2][1] +(e.layerY-_selectedloc[1]));
        
      }
      setitems(items_tmp);
   }

  }

  const descriptionPage = (ctx) => {
    let descItems = [
      '파스퇴르_설명.png',
      '아이시스_설명.png',
      '떡볶이_설명.png',
      '자일리톨_설명.png',
      '자껍_설명.png',
      '알약_설명.png',
      '좋은물_설명.png',

    ]
    let descBackg = new Image();
    descBackg.src = '/resources/pages/description/'+descItems[descNum];
    ctx. drawImage( descBackg, 0,0, cWidth ,cHeight );
    
    const canvas = canvasRef.current
    canvas.onmousedown = ( e ) => {
      //나가기버튼 
        //738 , 387
        //801 , 448
      if( e.layerX > 738 && e.layerX < 801 && e.layerY > 387 && e.layerY < 448){
        setnowPage('game')
      }
    }

  }
  const successPage = (ctx) =>{
    let successBackg = new Image();
    successBackg.src = '/resources/pages/success/success.png';
    ctx. drawImage( successBackg, 0,0, cWidth ,cHeight );
  }
  useEffect(() => {
    
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    let animationFrameId


    
    //draw 로 시작
    const render = () => {
      draw(context)
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()
    
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw])
  
  return <canvas ref={canvasRef} className={classes.mygame} width="810" height="466"/>
}

export default Game