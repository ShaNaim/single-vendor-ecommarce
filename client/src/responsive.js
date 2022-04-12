import { css } from "styled-components";

export const mobile = (props) => {
	return css`
		@media only screen and (max-width: ${props.mobileOn
				? props.mobileOn
				: "1000px"}) {
			${props}
		}
	`;
};
