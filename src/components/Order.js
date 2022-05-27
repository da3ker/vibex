import tw, { styled } from "twin.macro";
import moment from "moment";
import { Link } from "react-router-dom";

const Container = styled.div`
  ${tw`flex mb-10 py-2 pl-2 pr-20 uppercase relative flex-col gap-2`}
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;
const Status = styled.span`
  ${tw`text-xs font-semibold absolute top-0 right-0 rotate-90 `}
  ${({ status }) =>
    status === "ready to deliver" &&
    tw`translate-x-12 translate-y-14 text-yellow-500`};
  ${({ status }) =>
    status === "on the way" && tw`translate-x-8 translate-y-10 text-green-500`};
  ${({ status }) =>
    status === "delivered" && tw`translate-x-6 translate-y-8 text-blue-500`};
`;
const Top = styled.div`
  ${tw`tracking-wide`}
`;
const InfoWrapper = styled.div`
  ${tw`flex md:gap-2 gap-0 md:items-center items-start md:flex-row flex-col`}
`;
const Label = styled.h4`
  ${tw`md:text-xs text-[10px] font-light`}
`;
const Info = styled.h3`
  ${tw`md:text-sm text-xs font-medium`}
`;
const OtherInfoWrapper = styled.div`
  ${tw`flex md:gap-2 gap-0 mt-2 md:flex-row flex-col`}
`;
const OtherInfo = styled.h3`
  ${tw`font-semibold md:text-base text-sm`}
`;
const Bottom = styled.div`
  ${tw`flex mt-2 gap-2`}
`;
const Products = styled.div`
  ${tw`text-sm flex gap-2 p-2 overflow-x-auto`}
  box-shadow: rgba(0, 0, 0, 0.04) 0px -3px 5px;
`;
const ProductWrapper = styled.div`
  ${tw` min-w-[8rem] max-w-[12rem] p-1 cursor-pointer`}
  box-shadow: rgba(0, 0, 0, 0.08) 0px 3px 5px;
`;
const ProductImg = styled.img`
  ${tw`object-cover`}
`;
const ProductInfo = styled.h4`
  ${tw` font-medium`}
`;
const ProductInfoWrapper = styled.div`
  ${tw`flex items-center gap-1`}
`;
const Color = styled.div`
  ${tw`rounded-full w-3 h-3 border-[1px] border-gray-400`}
  ${({ color }) => color === "yellow" && tw`bg-yellow-400`};
  ${({ color }) => color === "black" && tw`bg-black`};
  ${({ color }) => color === "white" && tw`bg-white`};
`;
const Size = styled.h4`
  ${tw``}
`;
const Quantity = styled.h4`
  ${tw`lowercase`}
`;
const TotalPriceWrapper = styled.div`
  ${tw`self-end text-sm tracking-wider absolute bottom-2 right-2`}
`;
const LabelTotal = styled.h4`
  ${tw`text-xs`}
`;
const TotalAmount = styled.h3`
  ${tw`font-semibold`}
`;

const Order = ({ item }) => {
  return (
    <Container>
      <Status status={item.status}>{item.status}</Status>
      <Top>
        <InfoWrapper>
          <Label>Order ID:</Label>
          <Info>{item.paymentData.orderID}</Info>
        </InfoWrapper>
        <InfoWrapper>
          <Label>Payment ID:</Label>
          <Info>{item.paymentData.paymentID}</Info>
        </InfoWrapper>
        <InfoWrapper>
          <Label>Date Ordered:</Label>
          <Info>{moment(item.createdAt).format("MMMM Do YYYY")}</Info>
        </InfoWrapper>
        <OtherInfoWrapper>
          <OtherInfo>
            {item.address.firstName} {item.address.lastName}
          </OtherInfo>
          <OtherInfo>{item.address.phone}</OtherInfo>
        </OtherInfoWrapper>
        <OtherInfo>
          {item.address.address} {item.address.city} {item.address.state}{" "}
          {item.address.postal}
        </OtherInfo>
      </Top>
      <Bottom>
        <Products>
          {item.products.map((prod) => (
            <Link to={`/product/${prod._id}`} key={prod._id + Math.random()}>
              <ProductWrapper>
                <ProductImg src={prod.img} />
                <ProductInfo>{prod.name}</ProductInfo>
                <ProductInfoWrapper>
                  <Color color={prod.color} />
                  <Size>{prod.size}</Size>
                  <Quantity>x{prod.quantity}</Quantity>
                </ProductInfoWrapper>
                <ProductInfo>${prod.price}.00</ProductInfo>
              </ProductWrapper>
            </Link>
          ))}
        </Products>
        <TotalPriceWrapper>
          <LabelTotal>Total:</LabelTotal>
          <TotalAmount>${item.amount}.00</TotalAmount>
        </TotalPriceWrapper>
      </Bottom>
    </Container>
  );
};

export default Order;
