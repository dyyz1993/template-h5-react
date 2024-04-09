import { FC, PropsWithClassName } from 'react';
import styled from 'styled-components';

type Props = PropsWithClassName<{}>;

/** 落地页 */
const LandingView: FC<Props> = (props) => {
  // TODO: 落地页样式
  return <div className={props.className}>落地页</div>;
};

export default styled(LandingView)``;
