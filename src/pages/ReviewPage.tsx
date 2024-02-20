import { ReviewOverview } from '../components/organisms';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getReviewStatisticsAPI } from '../apis/reviewAPI';

const ReviewPage = () => {
  const { productId } = useParams();

  const { data } = useQuery({
    queryKey: ['review-statistics', productId],
    queryFn: () => getReviewStatisticsAPI(parseInt(productId || '-1')),
    staleTime: 30 * 1000,
  });

  return (
    <>
      <ReviewOverview data={data} />
    </>
  );
};

export default ReviewPage;
