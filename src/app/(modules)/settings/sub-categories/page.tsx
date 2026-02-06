import { NextPage } from 'next';
import SubCategory from '@/components/pages/settings/sub-category';
import { Suspense } from 'react';

const SubCategoryPage: NextPage = () => {
  return (
    <Suspense>
      <SubCategory />
    </Suspense>
  );
};

export default SubCategoryPage;
