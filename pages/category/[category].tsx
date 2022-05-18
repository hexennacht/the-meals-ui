import {Category, Meals} from "../../type/type";
import {useEffect, useState} from "react";
import {
	Box,
	Button,
	Center,
	Container,
	Flex,
	Heading,
	LinkBox,
	Stack,
	Text,
	Wrap,
	WrapItem,
	Link
} from "@chakra-ui/react";
import {GetServerSidePropsContext} from "next";
import Image from "next/image";
import NextLink from "next/link";
import {meals_category_list} from "../../config/api";

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const {category} = context.query;

	const res = await fetch(`${meals_category_list}${category}`);
	const data = await res.json();

	context.res.setHeader('Cache-Control', 's-maxage=600, public, max-age=600, stale-while-revalidate=600');

	return {
		props: {
			category_meals: data?.meals,
		}
	}
}

type Props = {
	category_meals: Meals[] | null
}

export default function MealsBasedOnCategory({category_meals}: Props) {
	const [meals, setMeals] = useState<Meals[] | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		setMeals(category_meals)
		setLoading(false)
	}, [loading, category_meals]);

	function renderMeal(meal: Meals) {
		if (meal) {
			return (
				<Box
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
			)
		}
	}

	return (
		<>
			{loading ? <div>Loading...</div> :
				<Container pt={`20px`} pb={`20px`} maxW={`6xl`} backgroundColor={`transparent`}>
					<Heading pb={`20px`} textAlign={`center`}>Please Choose Your Meal</Heading>
					<Flex mb={`10px`} p={`19px`}>
						<NextLink href={`/`}>
							<Link style={{float: 'left'}}>
								<Flex>
									<svg style={{ width: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"
										 xmlns="http://www.w3.org/2000/svg">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
											  d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
									</svg>
									<Text>
										Back To Homepage
									</Text>
								</Flex>
							</Link>
						</NextLink>
					</Flex>
					<Wrap flexDirection="row" spacing={`30px`} justify='center'>
						{
							meals?.map((meal: Meals, key: number) => {
								return (
									<WrapItem key={key}>
										<Center>
											<LinkBox>
												<Link href={`/meal/${meal.idMeal}`}>
													{renderMeal(meal)}
												</Link>
											</LinkBox>
										</Center>
									</WrapItem>
								)
							})
						}
					</Wrap>
				</Container>
			}
		</>
	)
}