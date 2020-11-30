import { ThemedCssFunction, BaseThemedCssFunction } from 'styled-components';
import { css } from 'styled-components';

const sizes = {
	small: 850,
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
