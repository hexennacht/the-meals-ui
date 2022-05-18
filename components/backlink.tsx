import {Flex, Link, Text} from "@chakra-ui/react";
import NextLink from "next/link";

type Props = {
  href?: string|undefined;
  text: string;
};

export default function BackLink({href, text}: Props) {
	return (
		<NextLink href={href ? href : '/'}>
			<Link style={{float: 'left'}}>
				<Flex>
					<svg style={{ width: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"
						 xmlns="http://www.w3.org/2000/svg">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
							  d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
					</svg>
					<Text>
						{text}
					</Text>
				</Flex>
			</Link>
		</NextLink>
	)
}