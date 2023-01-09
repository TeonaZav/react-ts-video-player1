import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReplyAll } from "@fortawesome/free-solid-svg-icons";

interface IVideoProps {
  videoRef?: React.ForwardedRef<HTMLVideoElement>;
  handlePlay: () => void;
  calculateDurtion: () => void;
  handleOnTimeUpdate: () => void;
  handleEnd: () => void;
  handleReplay: () => void;
  playerState: any;
  MyVideo420: string;
  MyVideo720: string;
}
const Video = ({
  videoRef,
  handlePlay,
  calculateDurtion,
  handleOnTimeUpdate,
  playerState,
  MyVideo420,
  MyVideo720,
  handleEnd,
  handleReplay,
}: IVideoProps) => {
  return (
    <Wrapper>
      <div>
        <video
          ref={videoRef}
          poster={process.env.PUBLIC_URL + "/images/transparent.png"}
          playsInline
          onClick={!playerState.ended ? handlePlay : handleReplay}
          onTimeUpdate={handleOnTimeUpdate}
          onCanPlay={calculateDurtion}
          onEnded={handleEnd}
          muted
        >
          <source
            src={playerState.resolution === "420" ? MyVideo420 : MyVideo720}
          />
        </video>
        <FontAwesomeIcon
          icon={playerState.ended && !playerState.isPlaying && faReplyAll}
          className="replay-icon"
          onClick={!playerState.ended ? handlePlay : handleReplay}
        />
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  video {
    width: 100vw;
    height: auto;
    object-fit: fill;
    border-radius: 0;
    background: transparent url(${require("../assets/images/poster1.jpg")})
      no-repeat 0 0;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    position: relative;
  }
  video[poster] {
    margin: 0 auto;
    width: 100%;
    min-height: 100%;
    height: 100%;
    object-fit: cover;
    justify-self: center;
  }
  .replay-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 6rem;
    color: #ffffff49;
    transform: translate(-50%, -50%);
  }
  @media (min-width: 48em) {
    video {
      object-fit: fill;
      width: 50vw;
      min-height: 100%;
      max-height: 100vh;
      border-radius: 5px;
      height: auto;
      object-fit: cover;
    }
  }
  @media (min-width: 90em) {
    video {
      object-fit: fill;
      min-width: 100%;
      min-height: 100%;
      max-width: 100vw;
      max-height: 100vh;
      border-radius: 5px;
      height: auto;
      object-fit: cover;
    }
    .replay-icon {
      font-size: 10rem;
    }
  }
`;
export default Video;
