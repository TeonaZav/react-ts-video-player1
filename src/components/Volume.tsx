import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp, faVolumeMute } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
interface IVolumeProps {
  playerState: any;
  toggleMute: () => void;
  changeVolume: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const Volume = ({ playerState, toggleMute, changeVolume }: IVolumeProps) => {
  useEffect(() => {
    const el = document.querySelector(".volume-bar") as HTMLInputElement;
    el.style.setProperty("--min", el.min);
    el.style.setProperty("--max", el.max);
    el.style.setProperty("--value", "0");
  }, []);

  return (
    <Wrapper>
      <div className="container volume-ct ">
        <div className="volume">
          <div className="volume-icon" onClick={toggleMute}>
            <FontAwesomeIcon
              icon={!playerState.isMuted ? faVolumeUp : faVolumeMute}
              className="control-icon volume-icon"
            />
          </div>
          <div className="volume-range">
            <input
              type="range"
              min={0}
              max={1}
              step={0.02}
              value={0}
              onChange={(e) => changeVolume(e)}
              className="volume-bar"
            />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  .volume-ct {
    position: absolute;
    top: 10%;
    right: 50%;
    height: 3.5rem;
    width: 20rem;
    transform: translateY(-50%);
    transform: translateX(50%);
    transition: opacity 0.05s ease-out 0.05s;
    z-index: 999;
    .volume {
      background: rgba(0, 0, 0, 0.35);
      border-radius: 1rem;
      height: 100%;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .volume-icon {
        position: absolute;
        display: inline-block;
        cursor: pointer;
        color: var(--font-color);
        left: 5%;
        top: 50%;
        transform: translateY(-50%);
        font-size: 1.6rem;
      }
      .volume-range {
        height: 1rem;
        width: 15rem;
        background: rgba(70, 70, 70, 0.5);
        border-radius: 1rem;
        cursor: pointer;
        margin-left: 3.2rem;
        -webkit-appearance: none;

        .volume-bar {
          background: var(--font-color);
          width: 100%;
          height: 100%;
          border-radius: 1rem;
          transition: width 0.01s ease-in;
        }
      }
    }
  }
  input[type="range"].volume-bar::-webkit-slider-thumb {
    -webkit-appearance: none;
    visibility: hidden;
  }
  input[type="range"].volume-bar::-webkit-slider-thumb {
    -webkit-appearance: none;
    visibility: hidden;
  }
  @media (min-width: 90em) {
    .volume-ct {
      top: 45%;
      right: 5%;
      height: 21rem;
      width: 3.5rem;
      transform: translateY(-50%);
      .volume {
        .volume-icon {
          transform: rotate(-45deg);
          bottom: 5%;
          left: 50%;
          top: unset;
        }
        .volume-range {
          transform: rotate(-90deg);
          margin-bottom: 3.2rem;
          margin-left: 0rem;
        }
      }
    }
  }
`;
export default Volume;
