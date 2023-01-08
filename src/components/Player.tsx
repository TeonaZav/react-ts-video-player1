import React, { useRef } from "react";
import styled from "styled-components";
import MyVideo420 from "../videoFiles/420.mp4";
import MyVideo720 from "../videoFiles/720.mp4";
import usePlayer from "../hooks/usePlayer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackwardStep,
  faForwardStep,
  faPen,
  faExpand,
  faCompress,
} from "@fortawesome/free-solid-svg-icons";
import Video from "./Video";
import ProgressRange from "./ProgressRange";
import Volume from "./Volume";
import PlayBtn from "./PlayBtn";
import VideoQuality from "./VideoQuality";
const Player1 = () => {
  const videoElement = useRef<HTMLVideoElement>(null);

  const {
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleVideoSpeed,
    toggleMute,
    calculateDurtion,
    changeVolume,
    handleForwardStep,
    handleBackwardStep,
    toggleFullscreen,
    handleVideoResolution,
  } = usePlayer(videoElement);
  return (
    <Wrapper>
      <div className="player">
        <Video
          videoRef={videoElement}
          handlePlay={togglePlay}
          calculateDurtion={calculateDurtion}
          handleOnTimeUpdate={handleOnTimeUpdate}
          playerState={playerState}
          MyVideo420={MyVideo420}
          MyVideo720={MyVideo720}
        />
        <Volume
          toggleMute={toggleMute}
          playerState={playerState}
          changeVolume={changeVolume}
        />
        <div className="show-controls">
          <div className="controls-container">
            <ProgressRange
              handleVideoProgress={handleVideoProgress}
              playerState={playerState}
            />
            <div className="control-group">
              <div className="controls-left">
                <div className="play-controls">
                  <FontAwesomeIcon icon={faPen} className="control-icon" />
                </div>
                <div className="play-controls" onClick={handleBackwardStep}>
                  <FontAwesomeIcon
                    icon={faBackwardStep}
                    className="control-icon"
                  />
                </div>
              </div>
              <div className="controls-center">
                <PlayBtn playerState={playerState} handlePlay={togglePlay} />
              </div>
              <div className="controls-right">
                <div className="play-controls" onClick={handleForwardStep}>
                  <FontAwesomeIcon
                    icon={faForwardStep}
                    className="control-icon"
                  />
                </div>
                <VideoQuality
                  handleVideoResolution={handleVideoResolution}
                  playerState={playerState}
                />
                <select
                  className="video-velocity"
                  value={playerState.speed}
                  onChange={(e) => handleVideoSpeed(e)}
                >
                  <option value="1">1x</option>
                  <option value="1.25">1.25x</option>
                  <option value="2">2x</option>
                </select>
              </div>
              <div className="fullscreen" onClick={toggleFullscreen}>
                <FontAwesomeIcon
                  icon={!playerState.fullscreen ? faExpand : faCompress}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  .player {
    min-height: auto;
    max-height: auto;
    width: 100vw;
    border-radius: 0;
    position: relative;
    cursor: pointer;
    background-color: #070305;
    display: flex;
    align-items: center;

    .show-controls {
      width: 100%;
      height: 30%;
      z-index: 2;
      position: absolute;
      bottom: 0;
      cursor: default;
      .controls-container {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 8rem;
        background: linear-gradient(0deg, #000000 0%, rgba(0, 0, 0, 0) 100%);
        box-sizing: border-box;
        z-index: 5;
        display: flex;
        justify-content: center;
        opacity: 0;
        transition: all 0.05s ease-out 2s;
        .control-group {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          gap: 1rem;
          .controls-left,
          .controls-right {
            display: flex;
            justify-content: center;
            gap: 1rem;
          }
          .controls-right {
            position: relative;
            .video-velocity {
              position: absolute;
              appearance: none;
              background: none;
              color: var(--primary-color);
              outline: none;
              border: none;
              text-align: center;
              font-size: 1.4rem;
              width: 5rem;
              right: -3rem;
              bottom: 90%;
              & option {
                background-color: #424547da;
                color: #e8ebf1;
                font-size: 1.6rem;
                text-align: center;
                border-radius: 0.5rem;
              }
            }
          }
          /* Fullscreen */
          .fullscreen {
            color: var(--font-color);
            font-size: 3.2rem;
            cursor: pointer;
            position: absolute;
            right: 5%;
            bottom: 10%;
            transform: translateY(-30%);
            z-index: 100;
          }
          .player.mobile-fullscreen {
            height: 100vh;
            border-radius: 0;
          }
          /* Play & Pause */
          .play-controls {
            width: 3.2rem;
            height: 3.2rem;
            background-color: var(--font-color);
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            cursor: pointer;
            &:hover > .control-icon {
              color: var(--primary-color);
            }
            .control-icon {
              color: black;
              font-size: 2rem;
            }
          }
          .play-controls.play-controls-p,
          .play-controls.play-controls-p {
            width: 4rem;
            height: 4rem;
          }
        }
      }
      &:hover .controls-container {
        opacity: 1;
        transition: all 0.2s ease-out;
      }
    }
  }
  .player:hover .container {
    opacity: 1;
    transition: all 0.2s ease-out;
  }

  /* more than 768PX */
  @media (min-width: 48em) {
    .player {
      object-fit: cover;
      width: 50vw;
      .show-controls {
        width: 100%;
        .controls-container {
          width: 100%;
          height: 14rem;
          .control-group {
            gap: 2.4rem;
            .controls-left,
            .controls-right {
              gap: 2.4rem;
              .video-velocity {
                font-size: 2rem;
                bottom: 50%;
                transform: translateY(50%);
                width: 10rem;
                right: -10rem;
                & option {
                  font-size: 1.6rem;
                }
              }
            }
            .fullscreen {
              bottom: 27%;
            }
          }
        }
      }
    }
    .play-controls.play-controls-p,
    .play-controls.play-controls-p {
      width: 5rem;
      height: 5rem;
    }
  }
  /* more than 768PX */
  @media (min-width: 90em) {
    .player {
      width: 50vw;
      height: auto;
      max-width: 100vw;
      max-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      .show-controls {
        width: 100%;
        .controls-container {
          width: 100%;
          height: 14rem;
          .control-group {
            gap: 2.4rem;
            .controls-left,
            .controls-right {
              gap: 2.4rem;
              .video-velocity {
                font-size: 2rem;
                bottom: 50%;
                transform: translateY(50%);
                width: 10rem;
                right: -10rem;
                & option {
                  font-size: 1.6rem;
                }
              }
            }
            .fullscreen {
              bottom: 27%;
            }
          }
        }
      }
    }
    .play-controls.play-controls-p,
    .play-controls.play-controls-p {
      width: 5rem;
      height: 5rem;
    }
  }
`;
export default Player1;
