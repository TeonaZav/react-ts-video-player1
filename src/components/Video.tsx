import styled from "styled-components";
interface IVideoProps {
  videoRef?: React.ForwardedRef<HTMLVideoElement>;
  handlePlay: () => void;
  calculateDurtion: () => void;
  handleOnTimeUpdate: () => void;
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
}: IVideoProps) => {
  return (
    <Wrapper>
      <video
        ref={videoRef}
        poster={process.env.PUBLIC_URL + "/poster.jpg"}
        playsInline
        onClick={handlePlay}
        onTimeUpdate={handleOnTimeUpdate}
        onCanPlay={calculateDurtion}
        muted
      >
        <source
          src={playerState.resolution === "420" ? MyVideo420 : MyVideo720}
        />
      </video>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  video {
    width: 100vw;
    min-height: auto;
    object-fit: fill;
    border-radius: 0;
    background: transparent url("./poster.jpg") no-repeat 0 0;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }
  video[poster] {
    margin: 0 auto;
    width: 100%;
    min-height: 100%;
    height: 100%;
    object-fit: cover;
    justify-self: center;
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
  }
`;
export default Video;
