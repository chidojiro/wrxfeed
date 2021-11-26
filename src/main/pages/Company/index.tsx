/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import MainLayout, { MainRightSide } from '@common/templates/MainLayout';
import TargetPanel from '@main/organisms/TargetPanel';
import FeedList from '@main/organisms/FeedList';
import { useRecoilValue } from 'recoil';
import { rollupsState } from '@main/states/rollup.state';

const CompanyPage: React.VFC = () => {
  const rollups = useRecoilValue(rollupsState);
  return (
    <MainLayout>
      <h1 className="sr-only">Feed list</h1>
      <FeedList rollups={rollups} onLoadMore={() => undefined} />
      <MainRightSide>
        <TargetPanel />
      </MainRightSide>
    </MainLayout>
  );
};

export default CompanyPage;
