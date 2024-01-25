import React from 'react';
import { styled } from 'styled-components';

interface FlexBox {
  children: React.ReactNode;
  col?: boolean;
  gap?: string;
  justify?: string;
  align?: string;
  style?: any;
}
const FlexBox = ({ children, col, gap, justify, align, style }: FlexBox) => {
  return <Container></Container>;
};

export default FlexBox;

const Container = styled.div`
  display: flex;
`;
