import tw, { styled } from "twin.macro";

const Container = styled.div`
  ${tw`w-52 h-32 flex mb-4`}
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
`;
const Left = styled.div`
  ${tw`w-1/2 h-full`}
`;
const Image = styled.img`
  ${tw`object-contain h-full`}
`;
const Right = styled.div`
  ${tw`w-1/2`}
`;
const Details = styled.div`
  ${tw`p-2`}
`;
const Name = styled.h2`
  ${tw`mb-2 text-[10px] font-semibold tracking-wider w-full h-8`}
`;
const Color = styled.div`
  ${tw`w-4 h-4 rounded-full mb-2 border-[1px]`}
  ${({ color }) => color === "yellow" && tw`bg-yellow-400`};
  ${({ color }) => color === "black" && tw`bg-black`};
  ${({ color }) => color === "white" && tw`bg-white`};
`;
const Size = styled.div`
  ${tw`h-5 w-10 border-[1px] font-medium border-black flex justify-center items-center text-sm mb-1`}
`;
const Quantity = styled.div`
  ${tw`h-5 w-10 border-[1px] font-medium border-black flex justify-center items-center text-sm`}
`;

const ProductSummary = ({ name, color, size, image, quantity }) => {
  return (
    <Container>
      <Left>
        <Image src={image} />
      </Left>
      <Right>
        <Details>
          <Name>{name}</Name>
          <Color color={color} />
          <Size>{size}</Size>
          <Quantity>{quantity}</Quantity>
        </Details>
      </Right>
    </Container>
  );
};

export default ProductSummary;
