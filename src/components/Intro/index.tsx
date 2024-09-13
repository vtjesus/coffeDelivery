import { Coffee, Package, ShoppingCart, Timer } from "@phosphor-icons/react"
import introImage from "../../assets/intro-image.png"
import { IntroContainer } from "./styles"

export function Intro() {
  return (
    <IntroContainer>
      <div className="content">
        <div>
          <h2>Найди идеальный кофе для любого времени дня.</h2>
          <span className="subtitle">
          С Coffee Delivery вы получаете свой кофе где бы вы ни были, в любое время!
          </span>
          <div className="iconsContainer">
            <div className="contentWrapper">
              <div className="iconTitleWrapper yellow-dark">
                <ShoppingCart size={16} weight="fill" />
              </div>
              <span>Простая и безопасная покупка</span>
            </div>
            <div className="contentWrapper">
              <div className="iconTitleWrapper dark-gray">
                <Package size={16} weight="fill" />
              </div>
              <span>Простая и безопасная покупка</span>
            </div>
            <div className="contentWrapper">
              <div className="iconTitleWrapper yellow">
                <Timer size={16} weight="fill" />
              </div>
              <span>Простая и безопасная покупка</span>
            </div>
            <div className="contentWrapper">
              <div className="iconTitleWrapper purple">
                <Coffee size={16} weight="fill" />
              </div>
              <span>Простая и безопасная покупка</span>
            </div>
          </div>
        </div>
        <div className="introImage">
          <img src={introImage} alt="" />
        </div>
      </div>
    </IntroContainer>
  )
}
