import tw, { styled } from "twin.macro";
import { motion } from "framer-motion";
import { Modal } from "@mui/material";

const Container = styled(motion.div)`
  ${tw`rounded-lg py-8 sm:px-16 px-2 text-justify text-gray-600 text-sm flex flex-col items-center w-4/5  overflow-y-auto bg-white outline-none border-4 border-gray-300`}
`;
const Title = styled.h1`
  ${tw`font-bold text-2xl mb-4 tracking-wider uppercase`}
`;
const Wrapper = styled(motion.div)`
  ${tw``}
`;

const PrivacyModal = ({ isModalOpen, setIsModalOpen }) => {
  return (
    <Modal
      open={isModalOpen === 3}
      onClose={(e) => setIsModalOpen(false)}
      className="flex justify-center items-center backdrop-blur-sm"
    >
      <Container
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
        transition={{ duration: 1 }}
        className="h-[calc(100vh_-_2rem)]"
      >
        <Title>Privacy Policy</Title>
        <Wrapper>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam rerum
          sint possimus architecto, deleniti nam! Atque blanditiis delectus odit
          omnis, quae magni culpa nostrum facere quaerat in minima laborum
          deleniti. Aliquid exercitationem ullam minima accusamus, officia est
          assumenda illo eaque animi fugiat veritatis, omnis vel repellendus
          architecto explicabo quas commodi repellat minus nihil aliquam
          laudantium. Dolor voluptatem perspiciatis laboriosam vero? Omnis sit
          nisi ab amet voluptas ratione sunt voluptatem libero quo praesentium,
          ea repellendus veritatis doloremque, dolores, accusamus sint suscipit!
          Hic saepe delectus quod debitis, sapiente pariatur molestiae labore
          sunt. Voluptas quod deserunt veritatis ex obcaecati vitae, quam qui
          itaque dolor optio beatae consequatur, fuga mollitia cumque aliquam
          exercitationem nobis recusandae id fugiat. Vel officiis ipsum facere
          aut nobis. Porro. Eveniet ipsum magnam error inventore accusantium,
          aut voluptas voluptatibus id repellendus eaque quos perspiciatis, ea
          veniam vitae libero cupiditate ducimus dolorem nesciunt magni. Eveniet
          cum in vero quas, quae adipisci. Libero autem vero ipsa illo ad qui.
          Hic dolor distinctio, numquam enim ipsam vero cum doloribus magni
          mollitia tenetur dolore explicabo similique ab totam perferendis
          officiis possimus nesciunt veritatis ad? At corrupti, est recusandae
          cupiditate libero ullam modi culpa animi dolorem incidunt harum dolore
          quisquam voluptates veritatis fugit esse eius ex ratione facilis
          officiis. A aspernatur minima adipisci ratione illo. Perferendis eius
          suscipit minima at, facilis doloribus sit vero eum voluptatibus
          possimus, alias similique aperiam molestias quo id tempora corrupti
          quia a assumenda ullam earum delectus aut. Delectus, veritatis
          accusamus? Dignissimos, autem? Quas ad hic, minima maxime tempore
          minus earum in alias repellat repellendus at incidunt aliquam quam
          fuga quasi quia reiciendis pariatur. Vel quaerat, numquam nostrum
          nihil voluptatum suscipit! Quia amet consequatur quis culpa corrupti.
          Aspernatur, aperiam, ipsa quidem eveniet perferendis necessitatibus
          consequatur voluptate ipsam temporibus omnis magni nulla atque
          quibusdam officiis itaque ex esse delectus ab odio error! Illo tempore
          similique ea tempora voluptate dolor sequi quasi eius rerum, aliquam
          eos, cumque consequatur quis fuga quae delectus tenetur iure velit
          nisi commodi. Nobis quibusdam ab natus! Reiciendis, culpa! Neque id
          natus rerum sunt quod dolor maxime. Laboriosam quibusdam dolore
          voluptatibus quisquam facere voluptate perspiciatis iste quas autem,
          error adipisci ipsam eveniet rerum expedita ullam, nobis ipsa ratione
          modi! Voluptatibus nisi nihil, sit illo blanditiis fugiat eveniet
          libero obcaecati eligendi, cum, distinctio numquam facilis
          dignissimos. Praesentium reiciendis, officia dicta alias earum
          incidunt necessitatibus tempore iusto. Est soluta sunt eius. Molestias
          amet nihil earum inventore, error, molestiae expedita quibusdam
          commodi iusto praesentium aperiam. Neque voluptatem corporis, ipsum
          possimus eum quibusdam architecto unde magni ea, tempore voluptas quod
          est, expedita fugit. Officia libero dolores excepturi, a quod sit
          adipisci aperiam suscipit fugiat maiores temporibus reiciendis dolorum
          laboriosam reprehenderit hic commodi magnam sapiente veniam saepe?
          Quas odit nesciunt numquam, quia qui magni! Corrupti perferendis, ipsa
          facere illo exercitationem rerum sed facilis distinctio cupiditate.
          Neque iure, maxime fuga animi cupiditate ut consequatur maiores quasi
          nemo nostrum eaque facere temporibus eum voluptatem nobis natus. Illum
          commodi ab laboriosam a nesciunt, delectus vitae soluta praesentium
          corporis hic. Nobis amet quasi, maxime magni unde obcaecati. Iste
          dignissimos omnis vitae eum voluptas quibusdam eaque minus odio fuga.
          Nostrum ut dicta qui nihil quia vel delectus architecto laborum,
          consequatur et aperiam aliquid neque! Velit, magni. Assumenda
          accusantium debitis, officia quam architecto incidunt? Amet aspernatur
          sequi ducimus iste sunt? Tenetur veritatis ipsam laborum enim
          provident molestias, doloremque atque, similique reiciendis ab quos
          est laudantium adipisci nobis libero inventore dolores eveniet maiores
          fugiat. Quaerat culpa, error officiis accusantium excepturi expedita.
          Id accusantium sequi illum officiis veniam inventore sint, accusamus
          eius laboriosam error reprehenderit temporibus voluptate non, nobis
          amet eveniet perferendis facilis! Similique doloremque, possimus
          aliquid perferendis officiis minima! Magni, ad? Repudiandae explicabo
          blanditiis fugiat vel accusamus itaque, praesentium iure recusandae
          rem placeat ipsum consequatur dignissimos. Alias praesentium molestias
          error consectetur! Necessitatibus nemo temporibus ut sequi odio.
          Magnam magni quae consectetur. Saepe numquam dicta tenetur dolores
          accusantium cupiditate laudantium dolorum asperiores? Maiores aliquid
          quos magni culpa obcaecati! Quas, quia! Ipsum natus saepe vel tempore
          officiis officia neque voluptas voluptatem nihil quod. Est ipsum harum
          numquam, exercitationem odit doloribus hic veniam sint ipsam corrupti
          aspernatur, dignissimos omnis. Magni quia sed dignissimos, voluptatum
          laborum rem, quod voluptatem temporibus nemo quae, perspiciatis
          pariatur? Assumenda. Totam explicabo modi alias et quia adipisci
          eligendi dignissimos possimus necessitatibus consequatur dolore eos
          quasi incidunt nulla quibusdam facere, ea officiis? Aliquid sequi
          ipsum eaque libero quo eum placeat fugiat! Numquam repudiandae
          eligendi consequuntur suscipit quasi deserunt a in mollitia vel
          voluptas id assumenda dolore quaerat, officia sint laborum sapiente
          error? Ipsa modi tempora dolorum, qui mollitia sapiente temporibus
          quibusdam? Perferendis nihil, nobis reprehenderit ea laboriosam earum?
          Saepe asperiores veniam obcaecati harum assumenda perspiciatis.
          Repellat rem non ullam incidunt excepturi assumenda sed odit, earum
          doloremque voluptatibus temporibus maxime accusamus consequatur.
          Eveniet officia minima laborum rerum ipsum fuga commodi, corporis
          nesciunt totam, quibusdam neque autem voluptatum enim deserunt at
          consectetur eius ut, magnam porro. Ipsum provident similique qui
          explicabo neque ullam! Pariatur aliquam temporibus modi saepe
          consequuntur adipisci voluptates odit sequi aperiam ex sunt vero
          consequatur quasi commodi at amet, assumenda eos illo ut tempora natus
          quo dolorem. Eveniet, doloremque aliquid? At nobis sunt sit obcaecati
          similique blanditiis expedita quo nulla, molestias nostrum saepe
          perspiciatis architecto asperiores vero consequatur, maxime doloremque
          quae tempore, magni facilis natus exercitationem doloribus aut.
          Suscipit, asperiores? Molestias, tenetur, enim iure asperiores
          reprehenderit libero incidunt neque quisquam quas natus dolor.
          Corporis ad odio in, eveniet aperiam nobis alias velit fugit quod
          assumenda soluta sequi ab nesciunt modi. Neque ducimus necessitatibus
          facere est cupiditate omnis, esse eaque aut debitis ex maxime animi
          sed voluptatum tenetur accusantium. Autem minima dignissimos sed sunt
          ab perferendis officiis modi corporis esse animi. Voluptates neque
          expedita modi eius temporibus repudiandae facilis veritatis illum,
          reiciendis nostrum id deserunt autem, molestiae ullam officiis magnam
          numquam. Minima quos exercitationem eveniet vero accusamus aspernatur
          delectus blanditiis tenetur! Excepturi quibusdam ad, facilis quae
          voluptatem, consequuntur non dolor doloribus sunt nobis ut nesciunt
          ipsum? Illum ab tempore veniam in commodi recusandae, nam eveniet?
          Aliquam optio cupiditate maxime deleniti voluptatem. Impedit labore
          mollitia harum voluptatum facilis enim fugit perferendis similique
          voluptatibus consectetur tenetur velit quas, optio dolores commodi
          maiores eaque placeat maxime nulla! Dolorum numquam, officiis
          provident dolorem ea incidunt? Inventore animi quibusdam veniam libero
          aut quod? Nostrum tenetur iure fuga voluptate numquam fugit animi
          laudantium obcaecati ipsam possimus rem quia itaque, similique placeat
          quasi, distinctio quos aspernatur corporis accusantium? Amet est error
          inventore fugiat at reprehenderit dolores fuga nihil dolorum sit,
          officia ea, in nulla. Vero, maxime illum nostrum ratione non,
          laudantium cumque voluptatem, in consectetur ipsa dolore quidem.
          Deserunt nam assumenda iusto. Dolorem commodi accusamus unde
          necessitatibus voluptates cupiditate, vitae praesentium ipsa, possimus
          blanditiis asperiores? Reiciendis consequatur vitae cum eius dolor
          modi esse, debitis ad obcaecati ea porro? Aperiam veritatis aliquam,
          incidunt magnam non eos perferendis eius, fugit beatae veniam
          blanditiis corporis dolore aliquid nisi rem earum reiciendis, ducimus
          quaerat. Corrupti voluptatum illum veritatis, doloremque odit velit
          ipsa. Accusamus esse numquam ipsam veniam dolore rerum voluptatibus
          neque ullam, eius optio ratione dolorum nostrum, ipsum, dicta sed
          cupiditate quidem sunt eum deserunt culpa in? Sed sit dolore quos
          neque. Nostrum, dignissimos, maiores molestiae voluptates voluptate
          eum accusamus, quis commodi optio laboriosam ipsum. Dolorum, at saepe
          maxime id amet, error corporis accusantium ut eveniet placeat
          obcaecati odit incidunt nostrum quidem.
        </Wrapper>
      </Container>
    </Modal>
  );
};

export default PrivacyModal;
