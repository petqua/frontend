import { useState } from 'react';
import { Modal, Filter } from '../components/molecules';

const ProductListPage = () => {
  const options = [
    { name: 'SALE_PRICE_ASC', title: '낮은 가격순' },
    { name: 'SALE_PRICE_DESC', title: '높은 가격순' },
    { name: 'REVIEW_COUNT_DESC', title: '리뷰 많은 순' },
  ];
  const [value, setValue] = useState('필터');
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      <Filter value={value} setIsOpenModal={setIsOpenModal} />
      {isOpenModal && (
        <Modal
          options={options}
          title="필터"
          value={value}
          setIsOpenModal={setIsOpenModal}
          setValue={setValue}
        />
      )}
    </>
  );
};

export default ProductListPage;
