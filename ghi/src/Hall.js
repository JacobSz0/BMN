import Darol from "./img/darol.gif"
import Flare from "./img/flare.jpg"
import Madame from "./img/madame.jpg"
import Swinging from "./img/swinging.gif"
import HeMan from "./img/heman.jpg"
import Tilted from "./img/tilted.jpg"
import Bunnies from "./img/bunnies.gif"

function NewPage() {

  return (
    <div>
      <p className="text">Meme Hall of Fame</p>
			<div className="ib pad">
				<img className="img-size" src={Darol}></img>
			</div>
			<div className="ib pad">
				<img className="img-size" src={HeMan}></img>
			</div>
			<div className="ib pad">
				<img className="img-size" src={Flare}></img>
			</div>
			<div className="ib pad">
				<img className="img-size" src={Swinging}></img>
			</div>
			<div className="ib pad">
				<img className="img-size" src={Tilted}></img>
			</div>
			<div className="ib pad">
				<img className="img-size" src={Bunnies}></img>
			</div>
			<div className="ib pad">
				<img className="img-size" src={Madame}></img>
			</div>
    </div>
  )
}

export default NewPage;