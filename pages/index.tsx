import type {GetServerSidePropsContext, NextPage} from 'next'
import Head from 'next/head'
import {
	Box,
	ChakraProps,
	Container,
	Heading,
	Text,
	Center,
	Stack,
	WrapItem,
	Wrap,
	useDisclosure,
	LinkBox,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	ModalFooter, Button, Spacer
} from "@chakra-ui/react";
import Image from 'next/image';
import {Category} from "../type/type";
import {useEffect, useState} from "react";
import Link from "next/link";
import {meals_category} from "../config/api";

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const res = await fetch(meals_category);
	const response = await res.json();

	context.res.setHeader('Cache-Control', 's-maxage=600, public, max-age=600, stale-while-revalidate=600');

	return {
		props: {
			meals_category: response.categories
		}
	}
}

type Props = {
	meals_category?: Category[] | null,
	properties?: ChakraProps | null
}

const Home: NextPage = ({meals_category}: Props) => {
	const [loading, setLoading] = useState<boolean>(true);
	const {isOpen, onOpen, onClose} = useDisclosure();
	const [categories, setCategories] = useState<Category[] | null>(null);
	const [category, setCategory] = useState<Category | null>(null);

	useEffect(() => {
		setCategories(meals_category!);
		setLoading(false)
	}, [loading, meals_category])

	function openModalCategoryDetail(key: number) {
		setCategory(categories![key]);
		onOpen();
	}

	function closeModalCategoryDetail() {
		onClose();
	}

	function renderCategories(category: Category) {
		if (categories) {
			return (
				<Box
					maxW={'300px'}
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
							src={category.strCategoryThumb}
							layout={'fill'}
							alt={category.strCategory}
						/>
					</Box>
					<Stack>
						<Text
							color={'green.500'}
							textTransform={'uppercase'}
							fontWeight={800}
							fontSize={'sm'}
							letterSpacing={1.1}>
							{category.idCategory}
						</Text>
						<Heading
							fontSize={'2xl'}
							fontFamily={'body'}>
							{category.strCategory}
						</Heading>
						<Text color={'gray.500'}>
							{category.strCategoryDescription?.substring(0, 50)}...
						</Text>
					</Stack>
				</Box>
			)
		}
	}

	function renderModalCategoryDetail(isOpen: boolean, category: Category) {
		return (
			<Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={closeModalCategoryDetail} isCentered scrollBehavior={`inside`}>
				<ModalOverlay/>
				<ModalContent>
					<ModalHeader>{category.strCategory}</ModalHeader>
					<ModalCloseButton/>
					<ModalBody pb={6}>
						<Box
							h={'300px'}
							bg={'gray.100'}
							mt={-6}
							mx={-6}
							mb={6}
							pos={'relative'}>
							<Image
								src={category.strCategoryThumb}
								layout={'fill'}
								alt={category.strCategory}
							/>
						</Box>
						{category.strCategoryDescription}
					</ModalBody>

					<ModalFooter>
						<Button onClick={closeModalCategoryDetail}>Close</Button>
						<Spacer />
						<Link href={`category/${category.strCategory}`}>
							<Button colorScheme={'blue'} variant={`outline`}>Select Category</Button>
						</Link>
					</ModalFooter>
				</ModalContent>
			</Modal>
		)
	}

	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="The Meals DB UI"/>
				<link rel="icon" href="/favicon.ico"/>
			</Head>
			{
				loading ? <Center><Heading>Loading...</Heading></Center> :
					<Container pt={`20px`} pb={`20px`} maxW={`6xl`} backgroundColor={`transparent`}>
						<Heading pb={`20px`} textAlign={`center`}>Please Choose Your Category</Heading>
						<Wrap flexDirection="row" spacing={`30px`} justify='center'>
							{
								categories?.map((cat: Category, key: number) => {
									return (
										<WrapItem key={cat.idCategory}>
											<LinkBox as={`article`} onClick={() => openModalCategoryDetail(key)}>
												<Center>
													{renderCategories(cat)}
												</Center>
											</LinkBox>
										</WrapItem>
									)
								})
							}
						</Wrap>
					</Container>
			}
			{isOpen && renderModalCategoryDetail(isOpen, category!)}
		</>
	)
}

export default Home
