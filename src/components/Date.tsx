import { format } from "date-fns";
import styled from "styled-components";

/**
 * Displays today as big heading
 */
export const Today = () => (
  <>
    <TodayContainer>{format(new Date(), "dd")}</TodayContainer>
    <TodayContainer>{format(new Date(), "MMMM")}</TodayContainer>
  </>
);

const TodayContainer = styled.div`
  font-size: 64px;
  color: rgba(55, 53, 47, 0.85);
  line-height: 1;
`;
