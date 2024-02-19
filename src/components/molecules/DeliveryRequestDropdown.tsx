import { useState } from 'react';
import styled from 'styled-components';
import { RegularText } from '../atoms';
import { theme } from '../../styles/theme';
import { IoIosArrowUp, IoIosArrowDown, IoIosCheckmark } from 'react-icons/io';

const Container = styled.section`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const Header = styled.div`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.8rem;
  border: 0.1rem solid ${({ theme }) => theme.color.gray[40]};
`;

const Ul = styled.ul`
  border: 0.1rem solid ${({ theme }) => theme.color.gray[50]};
`;

const Option = styled.li`
  height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.8rem;
  &:not(:last-child) {
    border-bottom: 0.1rem solid ${({ theme }) => theme.color.gray[50]};
  }
`;
const Textarea = styled.textarea`
  height: 13rem;
  padding: 0.8rem;
  border: 0.1rem solid ${({ theme }) => theme.color.gray[50]};
  color: ${({ theme }) => theme.color.gray[70]};
  ${({ theme }) => theme.font.regular14}
  resize: none;
`;

const options = [
  '부재시 문앞에 놓아주세요',
  '배송전에 미리 연락주세요',
  '부재시 경비실에 맡겨주세요',
  '부재시 전화주세요',
  '직접 입력',
];

const DeliveryRequestDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCustomInputOpen, setIsCustomInputOpen] = useState(false);
  const [selectedOption, setSelectedOption] =
    useState('배송시 요청사항을 선택해주세요');
  const [customInput, setCustomInput] = useState('');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (selectedOption === '직접 입력') {
      setIsCustomInputOpen(!isCustomInputOpen);
    }
  };

  const handleOptionSelect = (option: string) => {
    setIsCustomInputOpen(option === '직접 입력');
    setSelectedOption(option);
    setIsOpen(false);
  };
  return (
    <Container>
      <Header onClick={toggleDropdown}>
        <RegularText size={14} color={theme.color.gray[50]}>
          {selectedOption}
        </RegularText>
        {isOpen ? (
          <IoIosArrowUp size={24} color={theme.color.gray[50]} />
        ) : (
          <IoIosArrowDown size={24} color={theme.color.gray[50]} />
        )}
      </Header>
      {isOpen && (
        <Ul>
          {options.map((option, index) => (
            <Option key={index} onClick={() => handleOptionSelect(option)}>
              {option === selectedOption ? (
                <>
                  <RegularText size={14} color={theme.color.gray[70]}>
                    {option}
                  </RegularText>
                  <IoIosCheckmark size={24} color={theme.color.gray[70]} />
                </>
              ) : (
                <RegularText size={14} color={theme.color.gray[40]}>
                  {option}
                </RegularText>
              )}
            </Option>
          ))}
        </Ul>
      )}
      {isCustomInputOpen && (
        <Textarea
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          maxLength={120}
        />
      )}
    </Container>
  );
};

export default DeliveryRequestDropdown;
