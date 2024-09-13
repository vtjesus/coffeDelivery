import { CurrencyDollar, MapPin, Receipt, Timer } from "@phosphor-icons/react"
import deliveryGuy from "../../assets/sucess-delivery-guy.png"

import { SuccessContainer, SuccessContent } from "./styles"
import { useContext, useEffect } from "react"
import { OrderContext } from "../../contexts/OrderContext"
import { useNavigate } from "react-router-dom"

export function Success() {
  const { order } = useContext(OrderContext)
  const navigate = useNavigate()

  function paymentMethodConvert(method: string) {
    switch (method) {
      case "pix":
        return "Pix"

      case "credit-card":
        return "Кредитная/дебетовая карта"

      case "cash":
        return "Наличные"

      default:
        return "Приват24"
    }
  }

  useEffect(() => {
    if (order === undefined) {
      navigate("/")
    }
  }, [order])

  return (
    <SuccessContainer>
      <SuccessContent>
        <header>
          <h2>Ура! Заказ подтверждён</h2>
          <p>Теперь просто подождите, и скоро кофе будет у вас</p>
        </header>

        <main>
          <div className="gradientBorder">
            <div className="gradientPadding">
              <div className="contentWrapper">
                <div className="iconTitleWrapper purple">
                  <MapPin size={20} weight="fill" />
                </div>
                <span className="deliveryAddress">
                Адрес доставки{" "}
                  <b>
                    {order?.userInfo.address}, {order?.userInfo.addressNumber}
                    {order?.userInfo.addressExtra !== ""
                      ? `, ${order?.userInfo.addressExtra}`
                      : null}
                    ,
                  </b>{" "}
                  {order?.userInfo.addressCity}, {order?.userInfo.addressState}
                </span>
              </div>
              <div className="contentWrapper">
                <div className="iconTitleWrapper yellow">
                  <Timer size={20} weight="fill" />
                </div>
                <span>
                Ожидаемое время доставки
                  <br />
                  <b>20–30 минут</b>
                </span>
              </div>
              <div className="contentWrapper">
                <div className="iconTitleWrapper yellow-dark">
                  <CurrencyDollar size={20} />
                </div>
                <span>
                Оплата при доставке
                  <br />
                  <b>
                    {order?.userInfo.paymentMethod
                      ? paymentMethodConvert(order.userInfo.paymentMethod)
                      : null}
                  </b>
                </span>
              </div>
              <div className="contentWrapper">
                <div className="iconTitleWrapper dark-gray">
                  <Receipt size={20} />
                </div>
                <span>
                  <ul>
                    {order?.products.map((item) => (
                      <li key={item.id}>
                        <p>
                          {`${item.quantity}`}x {item.title} ₴ {" "}
                          {(item.price * item.quantity)
                            .toFixed(2)
                            .replace(".", ",")}
                        </p>
                      </li>
                    ))}
                  </ul>
                  <b>Итого ₴ {order?.total.toFixed(2).replace(".", ",")}</b>
                </span>
              </div>
            </div>
          </div>
          <div>
            <img src={deliveryGuy} />
          </div>
        </main>
      </SuccessContent>
    </SuccessContainer>
  )
}
