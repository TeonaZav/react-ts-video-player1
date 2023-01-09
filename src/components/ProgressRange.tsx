import styled from "styled-components";

interface IProgressRangeProps {
  handleVideoProgress: (e: React.ChangeEvent<HTMLInputElement>) => void;
  playerState: any;
}

const ProgressRange = ({
  playerState,
  handleVideoProgress,
}: IProgressRangeProps) => {
  return (
    <Wrapper>
      <div className="progress-range-ct">
        <p className="time-elapsed">{playerState.displayTime} </p>
        <div>
          <input
            type="range"
            min="0"
            max="100"
            value={playerState.progress}
            onChange={(e) => handleVideoProgress(e)}
            className="progress-range"
          />
        </div>

        <p className="time-duration">{playerState.duration}</p>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  .progress-range-ct {
    .progress-range {
      height: 0.6rem;
      z-index: 10;
      background: rgba(70, 70, 70, 0.5);
      margin-left: 10%;
      width: 80%;
      top: 0;
      left: 0;
      border-radius: 0;
      border-radius: 1rem;
      position: absolute;
      cursor: pointer;
      transition: height 0.05s ease-in-out;
      &:hover {
        height: 1rem;
      }
    }
    .time-elapsed,
    .time-duration {
      color: var(--font-color);
      font-weight: bold;
      user-select: none;
      font-size: 1.2rem;
      position: absolute;
      transform: translateY(-30%);
    }
    .time-elapsed {
      left: 1.6%;
    }
    .time-duration {
      right: 1.6%;
    }
  }
  @media (min-width: 90em) {
    .progress-range-ct {
      .progress-range {
        height: 0.6rem;
        z-index: 10;
        background: rgba(70, 70, 70, 0.5);
        margin-left: 10%;
        width: 80%;
        top: 0;
        left: 0;
        border-radius: 0;
        border-radius: 1rem;
        position: absolute;
        cursor: pointer;
        transition: height 0.05s ease-in-out;
        &:hover {
          height: 1rem;
        }
      }
      .time-elapsed,
      .time-duration {
        font-size: 1.8rem;
      }
      .time-elapsed {
        left: 4%;
      }
      .time-duration {
        right: 4%;
      }
    }
  }
`;
export default ProgressRange;
