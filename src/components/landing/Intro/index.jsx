import React from 'react'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { Header } from 'components/theme'
import { Container, Button } from 'components/common'
import dopanik from 'assets/illustrations/dopanik.svg'
import { Wrapper, IntroWrapper, Details, Thumbnail } from './styles'

export const Intro = () => (
	<Wrapper>
		<Header />
		<IntroWrapper as={Container}>
			<Details>
				<h1>Hi There!</h1>
				<h4>I’m Dominik and I’m a Trainer & DevOps engineer!</h4>
				<Button as={AnchorLink} href="#contact">
					Contact me
				</Button>
			</Details>
			<Thumbnail>
				<img src={dopanik} alt="I’m Dominik and I’m a Trainer & DevOps engineer!" />
			</Thumbnail>
		</IntroWrapper>
	</Wrapper>
)
