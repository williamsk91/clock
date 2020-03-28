import styled from "styled-components";

/**
 * A utility component to create vertical spacing between components.
 */
export const Spacer = styled.div<{ spacing: string }>`
  margin-top: ${p => p.spacing}px;
  display: block;
`;
