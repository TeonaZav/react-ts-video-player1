import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

import styled from "styled-components";
interface IVideoQualityProps {
  playerState: any;
  handleVideoResolution: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const VideoQuality = ({
  playerState,
  handleVideoResolution,
}: IVideoQualityProps) => {
  return (
    <Wrapper>
      <div className="dropup">
        <button className="dropbtn">
          <div className="play-controls">
            <FontAwesomeIcon icon={faGear} className="control-icon" />
          </div>
        </button>
        <div className="dropup-content">
          <ul>
            <li>
              <input
                type="radio"
                id="f-option"
                name="selector"
                value="420"
                onChange={(e) => handleVideoResolution(e)}
              />
              <label htmlFor="f-option">420p</label>

              <div className="check"></div>
            </li>

            <li>
              <input
                type="radio"
                id="s-option"
                name="selector"
                value="720"
                onChange={(e) => handleVideoResolution(e)}
              />
              <label htmlFor="s-option">720p</label>

              <div className="check">
                <div className="inside"></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  .dropbtn {
    border: none;
    border-radius: 50%;
  }

  .dropup {
    position: relative;
    display: inline-block;
    z-index: 100;
  }
  ul {
    list-style: none;
  }
  .dropup-content {
    display: none;
    position: absolute;
    background-color: #424547da;
    height: 10rem;
    min-width: 10rem;
    border-radius: 0.8rem;
    bottom: 4rem;
    z-index: 1;
  }

  .dropup:hover .dropup-content {
    display: block;
  }

  .container ul {
    list-style: none;
    margin: 0;
    padding: 0;
    overflow: auto;
  }

  ul li {
    color: #aaaaaa;
    display: block;
    position: relative;
    float: left;
    width: 100%;
    height: 4rem;
    border-bottom: 1px solid #333;
    padding-bottom: 1rem;
  }

  ul li input[type="radio"] {
    position: absolute;
    visibility: hidden;
  }

  ul li label {
    display: block;
    position: relative;
    font-weight: 300;
    font-size: 1.35em;
    padding: 2rem 2rem 2.5rem 6rem;
    height: 2rem;
    z-index: 9;
    cursor: pointer;
    -webkit-transition: all 0.25s linear;
  }

  ul li:hover label {
    color: #ffffff;
  }

  ul li .check {
    display: block;
    position: absolute;
    border: 5px solid #aaaaaa;
    border-radius: 100%;
    height: 2rem;
    width: 2rem;
    top: 1.6rem;
    left: 1.6rem;
    z-index: 5;
    transition: border 0.25s linear;
    -webkit-transition: border 0.25s linear;
  }

  ul li:hover .check {
    border: 5px solid #ffffff;
  }

  ul li .check::before {
    display: block;
    position: absolute;
    content: "";
    border-radius: 100%;
    height: 1.5rem;
    width: 1.5rem;
    top: 2px;
    left: 2.1px;
    margin: auto;
    transition: background 0.25s linear;
    -webkit-transition: background 0.25s linear;
  }

  input[type="radio"]:checked ~ .check {
    border: 5px solid var(--primary-color);
  }

  input[type="radio"]:checked ~ .check::before {
    background: var(--primary-color);
  }

  input[type="radio"]:checked ~ label {
    color: var(--primary-color);
  }
`;
export default VideoQuality;
