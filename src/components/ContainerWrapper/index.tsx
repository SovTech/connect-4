import * as React from 'react';
import { getPackageVersionNumber } from '../../utils';
import { ContainerWrapperInner, ContainerWrapperOuter, VersionNumber } from './styles';

type Props = {
  children: any;
}

const ContainerWrapper = (props: Props) =>
  (
    <ContainerWrapperOuter>
      <ContainerWrapperInner>
        {props.children}
      </ContainerWrapperInner>
      <VersionNumber>v{getPackageVersionNumber()}</VersionNumber>
    </ContainerWrapperOuter>
  );

export default ContainerWrapper;
