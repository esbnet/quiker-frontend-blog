"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

import Image from "next/image";
import fotosImg from "../../assets/post1.jpg";

export function CarouselPlugin() {
	// const plugin = React.useRef(
	// 	Autoplay({ delay: 2000, stopOnInteraction: true }),
	// );

	return (
		<Carousel
			// plugins={[plugin.current]}
			className="w-full max-w-xl"
			// onMouseEnter={plugin.current.stop}
			// onMouseLeave={plugin.current.reset}
		>
			<CarouselContent>
				{Array.from({ length: 5 }).map((_, index) => {
					return (
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<CarouselItem key={index}>
							<div className="p-1 w-full">
								<Card>
									<CardHeader>
										<CardTitle className="font-bold text-3xl">
											Card Title
										</CardTitle>
										<CardDescription>Card Description</CardDescription>
									</CardHeader>
									<CardContent className="flex justify-center p-6 aspect-square">
										<Image
											src={fotosImg}
											alt=""
											width={500}
											height={400}
											loading="lazy"
											className="rounded-xl"
										/>
									</CardContent>
								</Card>
							</div>
						</CarouselItem>
					);
				})}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	);
}
