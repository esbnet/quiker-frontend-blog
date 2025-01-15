"use client";

import { useEffect, useState } from "react";

interface FormattedDateProps {
	date: Date;
	locale?: string;
	options?: Intl.DateTimeFormatOptions;
}

export const FormattedDate: React.FC<FormattedDateProps> = ({
	date,
	locale = "pt-BR",
	options = {
		dateStyle: "full",
	},
}) => {
	const [formattedDate, setFormattedDate] = useState<string>("");

	useEffect(() => {
		setFormattedDate(new Intl.DateTimeFormat(locale, options).format(date));
	}, [date, locale, options]);

	return <span>{formattedDate}</span>;
};
