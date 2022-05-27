import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/cartRedux";
import { clearTempoDetails } from "../redux/tempoShippingRedux";
import { publicRequest, userRequest } from "../requestMethod";

const Paypal = ({ setError }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state);
  const { currentUser } = useSelector((state) => state.user);
  const { tempoShippingDetails } = useSelector((state) => state.shipping);
  const id = currentUser._id;

  //[START]=*=*=*=*=*=UPDATING USERS SHIPPING ADDRESS=*=*=*=*=*=//
  let shipAd;
  if (tempoShippingDetails) {
    shipAd = tempoShippingDetails;
  } else {
    shipAd = currentUser.shippingDetails;
  }
  //=*=*=*=*=*=UPDATING USERS SHIPPING ADDRESS=*=*=*=*=*=[END]//

  //[START]=*=*=*=*=*=UPDATING PRODUCT'S SOLD=*=*=*=*=*=//
  const updateSold = async (id, quantity) => {
    try {
      const res = await publicRequest.put(
        "/products/updateSold/" + id,
        quantity
      );
    } catch (err) {
      console.log(err);
    }
  };
  //=*=*=*=*=*=UPDATING PRODUCT'S SOLD=*=*=*=*=*=[END]//

  //[START]=*=*=*=*=*=ADDING TO USER'S ORDERS=*=*=*=*=*=//
  const updateOrders = async (order) => {
    try {
      const res = await userRequest.post("/orders/", order);
    } catch (err) {
      console.log(err);
    }
  };
  //=*=*=*=*=*=ADDING TO USER'S ORDERS=*=*=*=*=*=[END]//

  //[START]=*=*=*=*=*=SETTING PRODUCTS INFO=*=*=*=*=*=//
  useEffect(() => {
    let productsCopy = [];
    for (let i = 0; i < cart.products.length; i++) {
      const {
        categories,
        colors,
        imgBg,
        inStock,
        oldprice,
        sizes,
        sold,
        status,
        subName,
        createdAt,
        updatedAt,
        ...others
      } = cart.products[i];
      productsCopy.push({ ...others });
    }
    //=*=*=*=*=*=SETTING PRODUCTS INFO=*=*=*=*=*=[END]//

    //[START]=*=*=*=*=*=PAYPAL BUTTON FUNCTIONALITY=*=*=*=*=*=//
    window.paypal.Button.render(
      {
        // Configure environment
        //Set to "production" once ready
        env: "sandbox",
        client: {
          sandbox: process.env.REACT_APP_PAYPAL_SANDBOX_ID,
          production: process.env.REACT_APP_PAYPAL_PRODUCTION_ID,
        },
        // Customize button (optional)
        locale: "en_US",
        style: {
          size: "large",
          color: "black",
          shape: "rect",
          label: "checkout",
        },

        // Enable Pay Now checkout flow (optional)
        commit: true,

        // Set up a payment
        payment: function (data, actions) {
          return actions.payment.create({
            transactions: [
              {
                amount: {
                  total: cart.total,
                  currency: "USD",
                  details: {
                    subtotal: cart.total,
                    // tax: "0.00",
                    // shipping: "0.00",
                    // handling_fee: "0.00",
                    // shipping_discount: "0.00",
                    // insurance: "0.00",
                  },
                },
                description: "The payment transaction description.",
                custom: "90048630024435",
                //invoice_number: '12345', Insert a unique invoice number
                payment_options: {
                  allowed_payment_method: "INSTANT_FUNDING_SOURCE",
                },
                soft_descriptor: "ECHI5786786",
                item_list: {
                  items: cart.products.map((item) => {
                    return {
                      name: item.name,
                      description: item.color + ", " + item.size,
                      quantity: item.quantity,
                      price: item.price,
                      tax: "0.00",
                      currency: "USD",
                    };
                  }),

                  shipping_address: {
                    recipient_name: shipAd.firstName + " " + shipAd.lastName,
                    line1: shipAd.address,
                    city: shipAd.city,
                    country_code: "PH",
                    postal_code: shipAd.postal,
                    phone: shipAd.phone,
                    state: shipAd.state,
                  },
                },
              },
            ],
            note_to_payer: "Contact us for any questions on your order.",
          });
        },
        // Execute the payment
        onAuthorize: function (data, actions) {
          return actions.payment.execute().then(function () {
            // Show a confirmation message to the buyer
            dispatch(clearTempoDetails());
            updateOrders({
              userId: id,
              products: productsCopy,
              amount: cart.total,
              address: shipAd,
              paymentData: data,
            });
            cart.products.map((item) =>
              updateSold(item._id, { quantity: item.quantity })
            );
            dispatch(clearCart());
            navigate("/success");
          });
        },
        onError: (err) => {
          // console.log(err);
          setError(true);
        },
      },
      "#paypal-button"
    );
    //=*=*=*=*=*=PAYPAL BUTTON FUNCTIONALITY=*=*=*=*=*=[END]//
  }, [
    setError,
    dispatch,
    navigate,
    cart,
    shipAd.firstName,
    shipAd.lastName,
    shipAd.address,
    shipAd.city,
    shipAd.postal,
    shipAd.phone,
    shipAd.state,
    shipAd,
    id,
  ]);

  return <div id="paypal-button"></div>;
};

export default Paypal;
