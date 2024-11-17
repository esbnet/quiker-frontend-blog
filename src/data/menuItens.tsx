import { AiOutlineHome } from "react-icons/ai";
import { BsPersonVcard } from "react-icons/bs";

const menuItens = [
	{
		name: "Artigos",
		isSelected: true,
		href: "/",
		icon: <AiOutlineHome size={24} className="visible" />,
	},
	{
		name: "Entrar",
		isSelected: true,
		href: "/sign-in",
		icon: <BsPersonVcard size={24} className="visible" />,
	},
	{
		name: "Registrar",
		isSelected: true,
		href: "/sign-up",
		icon: <BsPersonVcard size={24} className="visible" />,
	},
];

export default menuItens;
