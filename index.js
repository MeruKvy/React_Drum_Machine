const audioClips = [ 
    {       
      keyCode: 81,
      key: 'Q',
      id: 'Heater-1',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
    },
    {
      keyCode: 87,
      key: 'W',
      id: 'Heater-2',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
    },
    {
      keyCode: 69,
      key: 'E',
      id: 'Heater-3',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
    },
    {
      keyCode: 65,
      key: 'A',
      id: 'Heater-4',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
    },
    {
      keyCode: 83,
      key: 'S',
      id: 'Clap',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
    },
    {
      keyCode: 68,
      key: 'D',
      id: 'Open-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
    },
    {
      keyCode: 90,
      key: 'Z',
      id: "Kick-n'-Hat",
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
    },
    {
      keyCode: 88,
      key: 'X',
      id: 'Kick',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
    },
    {
      keyCode: 67,
      key: 'C',
      id: 'Closed-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
    }
  ];
                              
  function App() {
    const [speed, setSpeed] = React.useState('0.5')
    const [recording, setRecording] = React.useState('')
    const [volume, setVolume] = React.useState(1)
    let index = 0
    let recordArray = recording.split(" ");
    
    const playRecording = () => {
      const interval = setInterval(() => {
        const audioTag = document.getElementById(recordArray[index])
        audioTag.volume = volume;
        audioTag.currentTime = 0;
        audioTag.play();
        index++
      }, speed * 600);
      setTimeout(
        () => clearInterval(interval), 
        300 * speed * recordArray.length - 1
      )
    }
    return (
      
      <div id="drum-machine" className="min-vh-100">
        <div className="text-center ">
          <h1 className="mb-5" >Drum Machine</h1>
          <div id="display" className="keyboard">
          {audioClips.map((clip) => (
            <Pad className="drum-pad" key={clip.id} clip={clip} volume={volume} setRecording={setRecording}/>
          ))}
           
             </div>
            <h3 className="mt-4">Volume</h3>
            <input type="range"
              step="0.01"
              onChange={(e) => setVolume(e.target.value)}
              value={volume}
              max="1"
              min="0"
              className="W-50"></input>
         
        </div>
        <div className="recording">
          <h4>{recording}</h4>
          </div>
        {recording && (
          <div className="toolBar">
            <button className="tool" onClick={playRecording}>Play</button>
            <button className="tool" onClick={() => setRecording("")}>Clear</button>
            
          </div>
        )}
        <div className="speed">
          <h3 className="mt-1">Speed</h3>
         <input 
              
              type="range"
              step="0.01"
              onChange={(e) => setSpeed(e.target.value)}
              value={speed}
              max="1.2"
              min="0.1"
              className="W-50">
                
          </input>
      </div>
   </div>
      
      
    );
  }
  
  function Pad({clip, volume, setRecording}) {
  
  const [active, setActive] = React.useState(false);
  
  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return() => {
      document.removeEventListener('keydown', handleKeyPress);
    }
  })
  
  
  const playSound = () => {
  const audioTag = document.getElementById(clip.key)
  setActive(true);
  setTimeout(() => setActive(false), 200);
  audioTag.volume = volume;
  audioTag.currentTime = 0;
  audioTag.play();
  setRecording((prev) => prev + clip.key + ' ');
  }
  
  const handleKeyPress = (e) => {
    if(e.keyCode === clip.keyCode){
      playSound();
    }
  }
  
  return (
    <div onClick={playSound} className={`btn btn-secondary p-5 m-2 ${active && 'pressed'}`}>
      <audio className="clip" id={clip.key} src={clip.url}/>
      {clip.key}
    </div>
  )
  }  
  
  
  
  
  ReactDOM.render(<App/>, document.getElementById('app'));