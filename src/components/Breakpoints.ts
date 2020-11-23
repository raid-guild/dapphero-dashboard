import { ThemedCssFunction, BaseThemedCssFunction } from 'styled-components';
import { css } from 'styled-components';

const sizes = {
	xsmall: 450,
	small: 600,
	medium: 1024,
	large: 1440,
	xlarge: 1920,
};

// Iterate through the sizes and create a media template
export const media = (Object.keys(sizes) as (keyof typeof sizes)[]).reduce(
  (acc, label) => {
    acc[label] = (first: any, ...interpolations: any[]) => css`
      @media (min-width: ${sizes[label]}px) {
        ${css(first, ...interpolations)}
      }
    `;

    return acc;
  },
  {} as { [key in keyof typeof sizes]: ThemedCssFunction<BaseThemedCssFunction<any[]>>},
);

// const respondTo = Object.keys(breakpoints).reduce((accumulator, label) => {
// 	accumulator[label] = (...args) => css`
// 		@media (min-width: ${breakpoints[label]}) {
// 			${css(...args)};
// 		}
// 	`;
// 	return accumulator;
// }, {});

// export default respondTo