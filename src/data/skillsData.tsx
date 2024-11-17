import { BsLightbulb } from "react-icons/bs";
import { GiBrain } from "react-icons/gi";
import { GrNode, GrReactjs } from "react-icons/gr";
import { SiNextdotjs } from "react-icons/si";
import { TbBrandTypescript } from "react-icons/tb";

import { GiTalk } from "react-icons/gi";
import { MdManageHistory } from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";

const SkillsData = [
  {
    title: "Trabalho em equipe",
    width: "85%",
    icon: <RiTeamFill />,
    color: "#76859A",
    type: "soft",
  },
  {
    title: "Gerenciamento do tempo",
    width: "75%",
    icon: <MdManageHistory />,
    color: "#76859A",
    type: "soft",
  },
  {
    title: "Comunicação",
    width: "80%",
    icon: <GiTalk />,
    color: "#76859A",
    type: "soft",
  },
  {
    title: "Liderança",
    width: "80%",
    icon: <GiBrain />,
    color: "#76859A",
    type: "soft",
  },
  {
    title: "criatividade",
    width: "90%",
    icon: <BsLightbulb />,
    color: "#76859A",
    type: "soft",
  },
  {
    title: "node",
    width: "67%",
    icon: <GrNode />,
    color: "#3EA818",
    type: "hard",
  },
  {
    title: "react",
    width: "80%",
    icon: <GrReactjs />,
    color: "#4E8CF3",
    type: "hard",
  },
  {
    title: "react native",
    width: "70%",
    icon: <GrReactjs />,
    color: "#4E8CF3",
    type: "hard",
  },
  {
    title: "typescript",
    width: "85%",
    icon: <TbBrandTypescript />,
    color: "#0454FF",
    type: "hard",
  },
  {
    title: "next js",
    width: "80%",
    icon: <SiNextdotjs />,
    color: "#000",
    type: "hard",
  },
];

export default SkillsData;
