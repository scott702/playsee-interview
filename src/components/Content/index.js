import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { from } from 'rxjs'
import { getPosts } from 'apis/request'


const App = ({ className }) => {
  const [data, setData] = useState([]);
  const [currPost, setCurrPost] = useState({});
  const [currPostId, setCurrPostId] = useState('');
  const [disabledLeftBtn, setDisabledLeftBtn] = useState(false);
  const [disabledRightBtn, setDisabledRightBtn] = useState(false);
  
  useEffect(() => {
    console.log('================ useEffect [fetch data] ====================');
    //bonus-以下為預先寫好的Api Request
    from(getPosts()).subscribe((response) => {
      const { p: res } = response.data;
      console.log('response: ', res);
      if (!res) {
        return;
      }
      
      const newData = res.map((item) => ({
        userId: item.source[2][0],
        postId: item.id,
        postDesc: item.desc,
        locationName: item.plc[3],
        createdTime: item.at,
      }));
      console.log('useEffect [fetch data] newData: ', newData);
      setData(newData);
      setCurrPostId(newData[0].postId);
      setDisabledLeftBtn(true);
      setDisabledRightBtn(false);
    })
  }, [])

  useEffect(() => {
    console.log('================ useEffect [watch currPostId] ====================');

    const newPost = data.find((item) => item.postId === currPostId);
    console.log('useEffect [fetch currPostId]: newPost', newPost);

    setCurrPost(newPost);
  }, [currPostId, data]);

  function handleClickLeft() {
    console.log('')
    console.log('================ handleClickLeft ====================');
    const postIdx = data.findIndex((item) => item.postId === currPostId);
    if (postIdx === -1) {
      return;
    }

    const newIdx = postIdx - 1;
    if (newIdx < 0) {
      setDisabledLeftBtn(true);
      return;
    }
    if (newIdx === 0) {
      setDisabledLeftBtn(true);
    } else {
      setDisabledLeftBtn(false);
    }
    setCurrPostId(data[newIdx].postId);
  }

  function handleClickRight() {
    console.log('================ handleClickRight ====================');

    const postIdx = data.findIndex((item) => item.postId === currPostId);
    if (postIdx === -1) {
      return;
    }

    const newIdx = postIdx + 1;
    if (newIdx > data.length - 1) {
      setDisabledRightBtn(true);
      return;
    }
    if (newIdx === data.length - 1) {
      setDisabledRightBtn(true);
    } else {
      setDisabledRightBtn(false);
    }
    setCurrPostId(data[newIdx].postId);
  }

  return <div className={className}>
    <div className="post-section">
      <div
        className={`left-arrow ${disabledLeftBtn ? 'disabled' : ''}`}
        onClick={handleClickLeft}
      >&#60;</div>
      <div className="post-content">
        <div className="video-section">
          <video controls key={currPostId} width="300">
            <source src={`https://g-pst.playsee.co/vdo/${currPostId}.mp4`}
                    type="video/mp4"/>
          </video>
        </div>

        <div className="info-section">
          <div className="author">
            
          </div>
          <div className="post-msg">
    
          </div>
        </div>
      </div>
      <div
        className={`right-arrow ${disabledRightBtn ? 'disabled' : ''}`}
        onClick={handleClickRight}
      >&#62;</div>
      
    </div>
  </div>
}


const StyledApp = styled(App)`
  background: url(${require('../../assets/images/background/bg.png')});
  flex: 1 1 auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;


  .post-section {
    display: flex;
    flex-flow: row;

  }

  .post-content {
    width: 60vmin;
    height: 50vmin;
    border: 3px solid lightgray;
    border-radius: 10px;
    margin: 0 8px;
    display: flex;
    flex-flow: row;

    .video-section {
      flex: 1;
      height: 100%;
      video {
        height: 100%;
      }
    }
    .info-section {
      flex: 1 1 auto;
      dispaly: flex;
      flex-flow: column;
      .author {
        background-color: white;
        flex: 1 1 3vmin;
      }
    }
  }

  .left-arrow,
  .right-arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 8px;
    border-radius: 10px;
    cursor: pointer;
    font-size: 1.5rem;
    font-weight: bold;
    color: gray;
    &:hover {
      background-color: lightgray;
      opacity: 0.5;
    }

    &.disabled {
      cursor: not-allowed;
    }
  }


`;

export default StyledApp;
