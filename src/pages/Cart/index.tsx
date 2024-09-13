import {
  Check,
  CreditCard,
  CurrencyDollar,
  MapPinLine,
  Money,
  PixLogo,
  Spinner,
} from "@phosphor-icons/react"

import {
  CheckoutContainer,
  CheckoutForm,
  UserInformation,
  OrderInfoBox,
  ConfirmButton,
} from "./styles"

import { SelectPaymentButton } from "../../components/SelectPaymentButton"

import { useTheme } from "styled-components"
import { ProductOrderCard } from "../../components/ProductOrderCard"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from "zod"
import { useContext } from "react"
import { OrderContext } from "../../contexts/OrderContext"
import { useNavigate } from "react-router-dom"

import { useHookFormMask } from "use-mask-input"

const newOrderFormValidationSchema = zod.object({
  zipcode: zod
    .string()
    .min(9, "Введите индекс в формате 00000-000")
    .max(9, "Введите индекс в формате 00000-000"),
  address: zod.string().min(1, "Укажите название улицы."),
  addressNumber: zod.string().min(1, "Укажите номер здания."),
  addressExtra: zod.string().optional(),
  addressNeighborhood: zod.string().min(1, "Укажите район."),
  addressCity: zod.string().min(1, "Укажите город."),
  addressState: zod
    .string()
    .min(2, "Укажите область.")
    .max(2, "Введите только сокращение области."),
  paymentMethod: zod.enum(["приват24", "credit-card", "cash"]),
})

export type newOrderFormData = zod.infer<typeof newOrderFormValidationSchema>

export function Cart() {
  const theme = useTheme()
  const navigate = useNavigate()

  const {
    productList,
    totalItemsPrice,
    deliveryTax,
    CreateOrder,
    productAdding,
  } = useContext(OrderContext)

  const { register, handleSubmit, watch, formState, reset } =
    useForm<newOrderFormData>({
      resolver: zodResolver(newOrderFormValidationSchema),
      defaultValues: {
        zipcode: "",
        address: "",
        addressNumber: "",
        addressExtra: "",
        addressNeighborhood: "",
        addressCity: "Киев",
        addressState: "Область",
        paymentMethod: "Приват24",
      },
    })
  const registerWithMask = useHookFormMask(register)

  const selectedPaymentMethod = watch("paymentMethod")
  const isOrderFormDataValid = formState.isValid

  function handleCreateOrder(data: newOrderFormData) {
    CreateOrder(data)
    reset()

    setTimeout(() => {
      navigate("/success")
    }, 1000)
  }

  return (
    <CheckoutContainer>
      <CheckoutForm onSubmit={handleSubmit(handleCreateOrder)}>
        <div className="userInfos">
          <h2>Введите свои данные</h2>
          <UserInformation>
            <div className="addressInfo">
              <div className="header">
                <MapPinLine size={22} color={theme.colors["yellow-dark"]} />
                <div>
                  <p>Адрес доставки</p>
                  <span>Укажите адрес, по которому вы хотите получить свой заказ</span>
                </div>
              </div>
              <div className="inputContainer">
                <div>
                  <input
                    {...registerWithMask("zipcode", "99999-999", {
                      required: true,
                    })}
                    type="text"
                    placeholder="Индекс"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    id="address"
                    placeholder="Улица"
                    {...register("address")}
                  />
                </div>

                <div>
                  <input
                    type="text"
                    id="addressNumber"
                    placeholder="Номер"
                    {...register("addressNumber")}
                  />

                  <input
                    type="text"
                    id="addressExtra"
                    placeholder="Дополнительная информация"
                    {...register("addressExtra")}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    id="addressNeighborhood"
                    placeholder="Район"
                    {...register("addressNeighborhood")}
                  />
                  <input
                    type="text"
                    id="addressCity"
                    placeholder="Город"
                    {...register("addressCity")}
                  />
                  <select id="addressState" {...register("addressState")}>
                    <option value="default" >Выберите область...</option>
                    <option value="RN">Киевская</option>
                    <option value="RN">Одесская</option>
                    <option value="RN">Полтавская</option>
                    <option value="RN">Днепропетровская</option>
                    <option value="RN">Другая</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="paymentInfo">
              <div>
                <div className="header">
                  <CurrencyDollar size={22} color={theme.colors.purple} />
                  <div>
                    <p>Способ оплаты</p>
                    <span>
                    Оплата производится при доставке. Выберите способ оплаты, который вы предпочитаете.
                    </span>
                  </div>
                </div>

                <div className="selectPayment">
                  <SelectPaymentButton
                    icon={PixLogo}
                    title="Приват24"
                    isactive={selectedPaymentMethod === "приват24"}
                    value="приват24"
                    {...register("paymentMethod")}
                  />
                  <SelectPaymentButton
                    icon={CreditCard}
                    title="Кредитная/Дебетовая карта"
                    isactive={selectedPaymentMethod === "credit-card"}
                    value="credit-card"
                    {...register("paymentMethod")}
                  />
                  <SelectPaymentButton
                    icon={Money}
                    title="Наличные"
                    isactive={selectedPaymentMethod === "cash"}
                    value="cash"
                    {...register("paymentMethod")}
                  />
                </div>
              </div>
            </div>
          </UserInformation>
        </div>

        <div className="orderInfos">
          <h2>Проверьте свой заказ</h2>
          <OrderInfoBox>
            {productList.map((product) => (
              <ProductOrderCard
                id={product.id}
                image={product.image}
                price={product.price}
                quantity={product.quantity}
                title={product.title}
                key={product.id}
              />
            ))}

            <div className="subtotals">
              <span>Итоговое количество товаров</span>
              <span className="price">
              ₴ {totalItemsPrice.toFixed(2).replace(".", ",")}
              </span>
            </div>
            <div className="subtotals">
              <span>Доставка</span>
              <span className="price">
              ₴ {deliveryTax.toFixed(2).replace(".", ",")}
              </span>
            </div>
            <div className="totals">
              <span>Всего</span>
              <span>
              ₴{" "}
                {(totalItemsPrice + deliveryTax).toFixed(2).replace(".", ",")}
              </span>
            </div>
            <ConfirmButton type="submit" disabled={!isOrderFormDataValid}>
              {productAdding ? (
                <span>
                  <Spinner size={22} />
                </span>
              ) : (
                <span>
                  <Check size={22} />
                  Подтвердить заказ
                </span>
              )}
            </ConfirmButton>
          </OrderInfoBox>
        </div>
      </CheckoutForm>
    </CheckoutContainer>
  )
}
