import {Meals} from "../../type/type";
import {useEffect, useState} from "react";
import {
	Box,
	Center,
	Container, Flex,
	Heading,
	SimpleGrid,
	Stack,
	Text,
	Wrap,
	WrapItem,
	Image, useColorModeValue, StackDivider, VStack, List, ListItem, AspectRatio, Avatar, Tag, TagLabel, Spacer, Link
} from "@chakra-ui/react";
import {GetServerSidePropsContext} from "next";
import NextLink from "next/link";
import {meals_id} from "../../config/api";
import BackLink from "../../components/backlink";

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const {idMeal} = context.query;

	const res = await fetch(`${meals_id}${idMeal}`);
	const data = await res.json();

	let ingredients: string[] | null = [];
	let measurements: string[] | null = [];

	const keys = Object.keys(data.meals[0]);
	keys.map((key) => {
		if (key.includes("strIngredient") && data.meals[0][key] && data.meals[0][key] !== "") {
			ingredients?.push(data.meals[0][key]);
		}

		if (key.includes("strMeasure") && data.meals[0][key] && data.meals[0][key] !== "") {
			measurements?.push(data.meals[0][key]);
		}
	})

	context.res.setHeader('Cache-Control', 's-maxage=600, public, max-age=600, stale-while-revalidate=600');

	return {
		props: {
			item: data?.meals?.map((item: Meals) => {
				return {
					idMeal: item.idMeal,
					strMeal: item.strMeal,
					strCategory: item.strCategory,
					strArea: item.strArea,
					strInstructions: item.strInstructions,
					strMealThumb: item.strMealThumb,
					strTags: item.strTags,
					strYoutube: item.strYoutube?.replace(`https://www.youtube.com/watch?v=`, `https://www.youtube.com/embed/`),
					strIngredients: ingredients,
					strMeasurements: measurements,
				} as Meals;
			})[0]
		}
	}
}

type Props = {
	item: Meals | null
}

export default function MealsBasedOnId({item}: Props) {
	const [meal, setMeal] = useState<Meals | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		setMeal(item)
		setLoading(false)
		console.log(item)
	}, [loading, item]);

	function renderMeal(food: Meals) {
		if (food) {
			return (
				<Container maxW={'7xl'}>
					<SimpleGrid
						columns={{ base: 1, lg: 2 }}
						spacing={{ base: 8, md: 10 }}
						py={{ base: 18, md: 24 }}>
						<BackLink text={`Back To ${meal?.strCategory} Category`} href={`/category/${meal?.strCategory!}`}/>
						<Spacer></Spacer>
						<Flex direction={`column`}>
							<Image
								rounded={'md'}
								alt={'product image'}
								src={food.strMealThumb}
								fit={'cover'}
								align={'center'}
								w={'100%'}
								h={{ base: '100%', sm: '400px', lg: '500px' }}
							/>

							<Box rounded={`md`} mt={`20px`} maxW={`520px`} border={`1px solid #333`} shadow={`md`} dropShadow={`md`}>
								<AspectRatio ratio={16/9}>
									<iframe
										title={food.strMeal}
										src={food.strYoutube!}
										allowFullScreen
									>
									</iframe>
								</AspectRatio>
							</Box>
						</Flex>
						<Stack spacing={{ base: 6, md: 10 }}>
							<Box as={'header'}>
								<Heading
									lineHeight={1.1}
									fontWeight={600}
									fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
									{food.strMeal}
								</Heading>
								<Text mt={`10px`}>
									{food?.strTags?.split(',').map((tag: string, key: number) => {
										return (
											<Tag size='lg' borderRadius='full' key={key} ml={`5px`}>
												<Avatar
													size='xs'
													name={tag}
													ml={-1}
													mr={2}
												/>
												<TagLabel>{tag}</TagLabel>
											</Tag>
										);
									})}

								</Text>
							</Box>

							<Stack
								spacing={{ base: 4, sm: 6 }}
								direction={'column'}
								divider={
									<StackDivider
									/>
								}>
								<VStack spacing={{ base: 4, sm: 6 }}>
									<Text fontSize={'lg'}>
										{food.strInstructions}
									</Text>
								</VStack>
								<Box>
									<Text
										fontSize={{ base: '16px', lg: '18px' }}
										fontWeight={'500'}
										textTransform={'uppercase'}
										mb={'4'}>
										Ingredients
									</Text>

									<SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
										<List spacing={2}>
											{
												food?.strIngredients?.map((ingredient, index) => {
													return (
														<ListItem key={index} fontWeight={`bold`}>{ingredient?.toLocaleUpperCase()}:</ListItem>
													)
												})
											}
										</List>
										<List spacing={2}>
											{
												food?.strMeasurements?.map((measurement, index) => {
													return (
														<ListItem key={index}>{measurement}</ListItem>
													)
												})
											}
										</List>
									</SimpleGrid>
								</Box>
							</Stack>
						</Stack>

					</SimpleGrid>
				</Container>
			)
		}
	}

	return (
		<>
			{loading && !meal ? <div>Loading...</div> :
				<Container maxW={`6xl`} backgroundColor={`transparent`}>
					<Wrap flexDirection="row" spacing={`30px`} justify='center'>
						{
							<WrapItem>
								<Center>
									{renderMeal(meal!)}
								</Center>
							</WrapItem>
						}
					</Wrap>
				</Container>
			}
		</>
	)
}