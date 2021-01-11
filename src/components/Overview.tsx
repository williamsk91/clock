import { ReactNode } from "react";
import styled from "styled-components";

import { Text } from "./Text";

interface Props {
  title: string;
  subtitle: string;
  icon?: ReactNode;
}

/**
 * Displays a specific summarised information in a card format.
 * Best used with an icon.
 *
 * When there are multiple `Overview`s wrap it inside `OverviewsContainer`
 */
export const Overview = (props: Props) => {
  const { title, subtitle, icon } = props;
  return (
    <Container>
      <Text.Title>{title}</Text.Title>
      <Text.SubTitle>{subtitle}</Text.SubTitle>
      <IconContainer>{icon}</IconContainer>
    </Container>
  );
};

const Container = styled.div`
  width: min-content;

  display: grid;
  grid-template-columns: repeat(3, min-content);
  align-items: end;
  grid-gap: 12px;

  padding: 24px;
  box-sizing: border-box;

  border: 2px solid black;
  border-radius: 6px;
`;

const IconContainer = styled.div`
  font-size: 36px;
`;

/**
 * Container for displaying multiple Overviews.
 * Lays `Overviews` in a row and wraps it naturally.
 */
export const OverviewsContainer = styled.div`
  display: flex;
  ${Container} {
    margin-right: 24px;
  }
`;
