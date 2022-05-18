import {Category, Meals} from "../type/type";
import {Box, Heading, Stack, Text} from "@chakra-ui/react";
import Image from "next/image";
import {ReactElement, ReactPropTypes} from "react";

type Prop = {
	type: 'category' | 'meal';
	item: Category | Meals;
	element: ReactPropTypes|ReactElement;
}

export default function Card({type, item, element}: Prop) {

	return (
		<Box
			{...element}
			minW={'250px'}
			maxW={'250px'}
			w={'full'}
			boxShadow={'md'}
			rounded={'md'}
			border={`1px solid`}
			borderColor={'gray.200'}
			p={6}
			overflow={'hidden'}>
			<Box
				h={'210px'}
				bg={'gray.100'}
				mt={-6}
				mx={-6}
				mb={6}
				pos={'relative'}>
				<Image
					src={meal.strMealThumb}
					layout={'fill'}
					alt={meal.strMeal}
				/>
			</Box>
			<Stack>
				<Text
					color={'green.500'}
					textTransform={'uppercase'}
					fontWeight={800}
					fontSize={'sm'}
					letterSpacing={1.1}>
					{meal.idMeal}
				</Text>
				<Heading
					fontSize={'2xl'}
					fontFamily={'body'}>
					{meal.strMeal}
				</Heading>
			</Stack>
		</Box>
	);
}