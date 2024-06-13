import { Poppins } from "next/font/google";

import "@sqli/core/global-css";

import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";

import "@/styles/index.scss";

import "rc-slider/assets/index.css";

import { dir } from "i18next";

import { metadata as baseMetadata, LayoutContent } from '@sqli/core/ui'

import { PropsWithChildren } from "react";

import { Metadata } from "next";

const poppins = Poppins({
	subsets: ["latin"],
	display: "swap",
	weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
	...baseMetadata
};

export default async function RootLayout({
	children,
	params: { lng },
}: PropsWithChildren<{ params: { lng: string } }>) {

	return (
		<html lang={lng} dir={dir(lng)} className={poppins.className}>
			<LayoutContent lng={lng}>{children as any}</LayoutContent>
		</html>
	);
}
