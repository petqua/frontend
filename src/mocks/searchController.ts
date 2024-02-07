import { HttpResponse, http } from 'msw';

export const mockGetTrendingKeywordsAPI = http.get(
  '/api/products/keywords',
  () => {
    const data = [
      { id: 1, keyword: '상어' },
      { id: 2, keyword: '상어 어항' },
      {
        id: 3,
        keyword: '아기 상어 뚜루루 뚜루',
      },
    ];
    return HttpResponse.json(data);
  },
);

export const mockGetSearchProductsAPI = http.get(
  '/api/products/search',
  ({ request }) => {
    const url = new URL(request.url);
    const lastViewedId = url.searchParams.get('lastViewedId');
    if (lastViewedId === '-1') {
      const data = {
        products: [
          {
            id: 1,
            name: '상품AA',
            category: 'category',
            price: 1,
            storeName: 'store',
            discountRate: 0,
            discountPrice: 1,
            wishCount: 0,
            reviewCount: 0,
            reviewAverageScore: 0.0,
            thumbnailUrl:
              'https://docs.petqua.co.kr/products/thumbnails/thumbnail3.jpeg',
          },
          {
            id: 2,
            name: '상품A',
            category: 'category',
            price: 1,
            storeName: 'store',
            discountRate: 0,
            discountPrice: 1,
            wishCount: 0,
            reviewCount: 0,
            reviewAverageScore: 0.0,
            thumbnailUrl:
              'https://docs.petqua.co.kr/products/thumbnails/thumbnail3.jpeg',
          },
          {
            id: 3,
            name: '상품AAA',
            category: 'category',
            price: 1,
            storeName: 'store',
            discountRate: 0,
            discountPrice: 1,
            wishCount: 0,
            reviewCount: 0,
            reviewAverageScore: 0.0,
            thumbnailUrl:
              'https://docs.petqua.co.kr/products/thumbnails/thumbnail3.jpeg',
          },
          {
            id: 5,
            name: '상품AAAA',
            category: 'category',
            price: 1,
            storeName: 'store',
            discountRate: 0,
            discountPrice: 1,
            wishCount: 0,
            reviewCount: 0,
            reviewAverageScore: 0.0,
            thumbnailUrl:
              'https://docs.petqua.co.kr/products/thumbnails/thumbnail3.jpeg',
          },
        ],
        hasNextPage: true,
        totalProductsCount: 13,
      };
      return HttpResponse.json(data);
    } else if (lastViewedId === '5') {
      const data = {
        products: [
          {
            id: 7,
            name: '상품BB',
            category: 'category',
            price: 1,
            storeName: 'store',
            discountRate: 0,
            discountPrice: 1,
            wishCount: 0,
            reviewCount: 0,
            reviewAverageScore: 0.0,
            thumbnailUrl:
              'https://docs.petqua.co.kr/products/thumbnails/thumbnail3.jpeg',
          },
          {
            id: 9,
            name: '상품B',
            category: 'category',
            price: 1,
            storeName: 'store',
            discountRate: 0,
            discountPrice: 1,
            wishCount: 0,
            reviewCount: 0,
            reviewAverageScore: 0.0,
            thumbnailUrl:
              'https://docs.petqua.co.kr/products/thumbnails/thumbnail3.jpeg',
          },
          {
            id: 10,
            name: '상품BBB',
            category: 'category',
            price: 1,
            storeName: 'store',
            discountRate: 0,
            discountPrice: 1,
            wishCount: 0,
            reviewCount: 0,
            reviewAverageScore: 0.0,
            thumbnailUrl:
              'https://docs.petqua.co.kr/products/thumbnails/thumbnail3.jpeg',
          },
          {
            id: 11,
            name: '상품BBBB',
            category: 'category',
            price: 1,
            storeName: 'store',
            discountRate: 0,
            discountPrice: 1,
            wishCount: 0,
            reviewCount: 0,
            reviewAverageScore: 0.0,
            thumbnailUrl:
              'https://docs.petqua.co.kr/products/thumbnails/thumbnail3.jpeg',
          },
        ],
        hasNextPage: true,
        totalProductsCount: 13,
      };
      return HttpResponse.json(data);
    } else if (lastViewedId === '11') {
      const data = {
        products: [
          {
            id: 20,
            name: '상품CC',
            category: 'category',
            price: 1,
            storeName: 'store',
            discountRate: 0,
            discountPrice: 1,
            wishCount: 0,
            reviewCount: 0,
            reviewAverageScore: 0.0,
            thumbnailUrl:
              'https://docs.petqua.co.kr/products/thumbnails/thumbnail3.jpeg',
          },
          {
            id: 25,
            name: '상품C',
            category: 'category',
            price: 1,
            storeName: 'store',
            discountRate: 0,
            discountPrice: 1,
            wishCount: 0,
            reviewCount: 0,
            reviewAverageScore: 0.0,
            thumbnailUrl:
              'https://docs.petqua.co.kr/products/thumbnails/thumbnail3.jpeg',
          },
          {
            id: 31,
            name: '상품CCC',
            category: 'category',
            price: 1,
            storeName: 'store',
            discountRate: 0,
            discountPrice: 1,
            wishCount: 0,
            reviewCount: 0,
            reviewAverageScore: 0.0,
            thumbnailUrl:
              'https://docs.petqua.co.kr/products/thumbnails/thumbnail3.jpeg',
          },
          {
            id: 32,
            name: '상품CCCC',
            category: 'category',
            price: 1,
            storeName: 'store',
            discountRate: 0,
            discountPrice: 1,
            wishCount: 0,
            reviewCount: 0,
            reviewAverageScore: 0.0,
            thumbnailUrl:
              'https://docs.petqua.co.kr/products/thumbnails/thumbnail3.jpeg',
          },
        ],
        hasNextPage: true,
        totalProductsCount: 13,
      };
      return HttpResponse.json(data);
    } else if (lastViewedId === '32') {
      const data = {
        products: [
          {
            id: 49,
            name: '상품DDDDD',
            category: 'category',
            price: 1,
            storeName: 'store',
            discountRate: 0,
            discountPrice: 1,
            wishCount: 0,
            reviewCount: 0,
            reviewAverageScore: 0.0,
            thumbnailUrl:
              'https://docs.petqua.co.kr/products/thumbnails/thumbnail3.jpeg',
          },
        ],
        hasNextPage: false,
        totalProductsCount: 13,
      };
      return HttpResponse.json(data);
    } else {
      const data = {
        products: [],
        hasNextPage: false,
        totalProductsCount: 13,
      };
      return HttpResponse.json(data);
    }
  },
);
