import { useState } from 'react';
import {
  ReviewList,
  ReviewOverview,
  ReviewModal,
} from '../components/organisms';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getReviewStatisticsAPI } from '../apis/reviewAPI';

const ReviewPage = () => {
  const { productId } = useParams();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const { data } = useQuery({
    queryKey: ['review-statistics', productId],
    queryFn: () => getReviewStatisticsAPI(parseInt(productId || '-1')),
    staleTime: 30 * 1000,
  });

  return (
    <>
      <ReviewOverview data={data} />
      <ReviewList score={score} setIsOpenModal={setIsOpenModal} />
      {isOpenModal && (
        <ReviewModal
          setIsOpenModal={setIsOpenModal}
          value={score}
          setValue={setScore}
          options={data?.scoreCounts || []}
        />
      )}
    </>
  );
};

export default ReviewPage;
