import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

interface IPlayBtnProps {
  playerState: any;
  handlePlay: () => void;
}
const PlayBtn = ({ playerState, handlePlay }: IPlayBtnProps) => {
  return (
    <div className="play-controls play-controls-p" onClick={handlePlay}>
      <FontAwesomeIcon
        icon={!playerState.isPlaying ? faPlay : faPause}
        className="control-icon"
      />
    </div>
  );
};
export default PlayBtn;
