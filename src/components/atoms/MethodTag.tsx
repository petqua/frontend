import { styled } from 'styled-components';
import {
  getBackgroundColor,
  getKoreanDeliveryMethod,
  getTextColor,
} from '../../utils/delivery';

interface MethodTag {
  deliveryMethod: string;
}

const MethodTag = ({ deliveryMethod }: MethodTag) => {
  return (
    <Tag $method={deliveryMethod || ''}>
      {getKoreanDeliveryMethod(deliveryMethod)}
    </Tag>
  );
};

export default MethodTag;

const Tag = styled.span<{ $method: string }>`
  padding: 0.3rem 0.6rem;
  border-radius: 0.6rem;
  background-color: ${({ $method }) => getBackgroundColor($method)};
  color: ${({ $method }) => getTextColor($method)};
  font-size: 1rem;
  font-weight: 700;
  display: inline-block;
  vertical-align: middle;
  margin-left: 0.4rem;
  line-height: 1;
  margin-bottom: 0.2rem;
`;
