import { useState, useEffect } from "react";
const useVideoPlayer = (videoEl: any) => {
  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    progress: 0,
    speed: 1,
    isMuted: true,
    duration: "00:00",
    displayTime: "00:00",
    volume: 0,
    fullscreen: false,
    lastVolume: 0.6,
    resolution: "720",
    lastSpeed: 1,
  });

  const togglePlay = () => {
    setPlayerState({
      ...playerState,
      isPlaying: !playerState.isPlaying,
    });
  };
  useEffect(() => {
    playerState.isPlaying ? videoEl.current.play() : videoEl.current.pause();
  }, [playerState.isPlaying, videoEl]);

  //======= Handle Time Update ===== //
  const handleOnTimeUpdate = () => {
    const progress =
      (videoEl.current.currentTime / videoEl.current.duration) * 100;
    setPlayerState({
      ...playerState,
      progress,
    });
    const el = document.querySelector(".progress-range") as HTMLInputElement;
    el.style.setProperty("--min", el.min === "" ? "0" : el.min);
    el.style.setProperty("--max", el.max === "" ? "100" : el.max);
    el.style.setProperty("--value", `${el.value}`);
    const minutes = `${Math.floor(videoEl.current.currentTime / 60)}`;
    const seconds = `${Math.floor(videoEl.current.currentTime % 60)}`;
    const displayTime = `${Number(minutes) < 1 ? 0 + minutes : minutes}:${
      Number(seconds) < 10 ? 0 + seconds : seconds
    }`;
    setPlayerState({
      ...playerState,
      progress,
      displayTime,
    });
  };
  /*================
  Handle Time Update 
  ================== */
  const handleVideoProgress = (event: React.ChangeEvent<HTMLInputElement>) => {
    const manualChange = Number(event.target.value);
    videoEl.current.currentTime =
      (videoEl.current.duration / 100) * manualChange;
    setPlayerState({
      ...playerState,
      progress: manualChange,
    });
    const el = event.target;
    el.style.setProperty("--min", el.min === "" ? "0" : el.min);
    el.style.setProperty("--max", el.max === "" ? "100" : el.max);
    el.style.setProperty("--value", `${el.value}`);
  };
  /*================
  Handle Video Speed 
  ================== */
  const handleVideoSpeed = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const speed = Number(event.target.value);
    videoEl.current.playbackRate = speed;
    setPlayerState({
      ...playerState,
      speed,
    });
  };
  /*================
  Handle Video Resolution 
  ================== */
  const handleVideoResolution = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const resolution = event.target.value;
    if (playerState.speed === 1) {
      setPlayerState({
        ...playerState,
        resolution,
        isPlaying: !playerState.isPlaying ? true : true,
      });
    } else {
      videoEl.current.playbackRate = playerState.lastSpeed;
      setPlayerState({
        ...playerState,
        resolution,
        isPlaying: !playerState.isPlaying ? true : true,
        speed: playerState.lastSpeed,
      });
    }
    videoEl.current.load();
    videoEl.current.play();
  };

  /*================
  Calculate Video Duration
  ================== */
  const calculateDurtion = () => {
    if (videoEl.current) {
      const durationM = `${Math.floor(videoEl.current.duration / 60)}`;
      const durationS = `${Math.floor(videoEl.current.duration % 60)}`;
      const duration = `${Number(durationM) < 1 ? 0 + durationM : durationM}:${
        Number(durationS) < 10 ? 0 + durationS : durationS
      }`;

      setPlayerState({
        ...playerState,
        duration,
      });
    }
  };
  /*================
  Change Video Volume
  ================== */
  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { valueAsNumber } = e.target as HTMLInputElement;
    setPlayerState({
      ...playerState,
      volume: valueAsNumber,
    });
    videoEl.current.volume = valueAsNumber;
    const el = e.target;
    el.style.setProperty("--min", el.min === "" ? "0" : el.min);
    el.style.setProperty("--max", el.max === "" ? "100" : el.max);
    el.style.setProperty("--value", el.value);
    if (Number(el.value) >= 0.02) {
      setPlayerState({
        ...playerState,
        isMuted: false,
      });
      videoEl.current.muted = false;
    }
  };
  /*================
  Mute/Unmute Video
  ================== */
  const toggleMute = () => {
    setPlayerState({
      ...playerState,
      isMuted: !playerState.isMuted,
    });
    const el = document.querySelector(".volume-bar") as HTMLInputElement;
    if (!playerState.isMuted) {
      setPlayerState({
        ...playerState,
        isMuted: true,
        volume: 0,
        lastVolume: videoEl.current.volume,
      });

      el.style.setProperty("--min", el.min === "" ? "0" : el.min);
      el.style.setProperty("--max", el.max === "" ? "100" : el.max);
      el.style.setProperty("--value", "0");
    } else {
      videoEl.current.volume = playerState.lastVolume;

      setPlayerState({
        ...playerState,
        isMuted: false,
        volume: playerState.lastVolume,
      });
      el.style.setProperty("--min", el.min === "" ? "0" : el.min);
      el.style.setProperty("--max", el.max === "" ? "100" : el.max);
      el.style.setProperty("--value", `${playerState.lastVolume}`);
    }
  };
  useEffect(() => {
    playerState.isMuted
      ? (videoEl.current.muted = true)
      : (videoEl.current.muted = false);
  }, [playerState.isMuted, videoEl]);
  /*================
 Rewind Video Forward/Backward
  ================== */
  const handleForwardStep = () => {
    if (videoEl.current) {
      videoEl.current.currentTime = videoEl.current.currentTime + 15;
    }
  };
  const handleBackwardStep = () => {
    if (videoEl.current) {
      videoEl.current.currentTime = videoEl.current.currentTime - 15;
    }
  };
  /*====================== FULLSCREEN ================== */

  /*================
  Open Fullscreen 
  ================== */

  function openFullscreen(element: any) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
      videoEl.current.style.minWidth = "100vw";
    } else if (element.mozRequestFullScreen) {
      /* Firefox */
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      /* IE/Edge */
      element.msRequestFullscreen();
    }
  }
  /*================
 Close Fullscreen
  ================== */
  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      videoEl.current.style.minWidth = "unset";
    }
  }
  /*================
 Toggle Fullscreen
  ================== */

  function toggleFullscreen() {
    const element = document.querySelector(".player");
    !playerState.fullscreen ? openFullscreen(element) : closeFullscreen();
    setPlayerState({
      ...playerState,
      fullscreen: !playerState.fullscreen,
    });
  }

  return {
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
  };
};

export default useVideoPlayer;
