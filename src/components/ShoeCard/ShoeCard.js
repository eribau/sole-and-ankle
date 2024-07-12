import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const variants = {
  'on-sale': {
    '--price-decoration': 'line-through',
    '--price-color': COLORS.gray[700],
    '--flag-text': 'Sale',
    '--flag-color': COLORS.primary,
  },
  'new-release': {
    '--display-sales-price': 'none',
    '--price-decoration': 'none',
    '--price-color': COLORS.gray[900],
    '--flag-text': 'Just Released!',
    '--flag-color': COLORS.secondary,
  },
  'default': {
    '--display-sales-price': 'none',
    '--price-decoration': 'none',
    '--price-color': COLORS.gray[900],
    '--flag-text': '',
    '--display-flag': 'none',
  },
}

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  const styles = variants[variant];

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
          <Flag style={styles}>{styles['--flag-text']}</Flag>
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price style={styles}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          <SalePrice style={styles}>{formatPrice(salePrice)}</SalePrice>
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
  flex: 1 1 344px;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 340px;
  border-radius: 16px 16px 4px 4px;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
  margin-right: auto;
`;

const Price = styled.span`
  color: var(--price-color);
  text-decoration: var(--price-decoration);
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  display: var(--display-sales-price);
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
  margin-left: auto;
`;

const Flag = styled.span`
  display: var(--display-flag);
  position: absolute;
  right: -4px;
  top: 12px;
  padding: 8px;
  background-color: var(--flag-color);
  border-radius: 2px;
  color: ${COLORS.white};
  font-weight: 700;
`;

export default ShoeCard;
