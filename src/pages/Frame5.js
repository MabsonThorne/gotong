import React from "react";
import { useParams } from "react-router-dom";
import FrameComponent4 from "../components/FrameComponent4";
import FrameComponent7 from "../components/FrameComponent7";
import ProductCard from "../components/ProductCard";
import FrameComponent from "../components/FrameComponent";

const Frame5 = () => {
  const { id } = useParams(); // 获取 URL 中的 id 参数

  return (
    <div className="w-full relative bg-white overflow-hidden flex flex-col items-start justify-start pt-[46px] px-20 pb-12 box-border gap-[121px] leading-[normal] tracking-[normal] mq750:gap-[60px] mq750:pl-10 mq750:pr-10 mq750:box-border mq450:gap-[30px]">
      <main className="self-stretch flex flex-col items-end justify-start gap-[46px] max-w-full mq750:gap-[23px]">
        <FrameComponent4 />
        <section className="self-stretch flex flex-col items-start justify-start gap-[24px] max-w-full">
          <FrameComponent7 productId={id} /> {/* 传递 id 给 FrameComponent7 */}
          <div className="self-stretch grid flex-row items-start justify-start gap-[32px] max-w-full grid-cols-[repeat(3,_minmax(304px,_1fr))] lg:justify-center lg:grid-cols-[repeat(2,_minmax(304px,_528px))] mq750:gap-[16px] mq750:grid-cols-[minmax(304px,_1fr)]">
            <ProductCard productId="1" />
            <ProductCard productId="2" />
            <ProductCard productId="3" />
          </div>
        </section>
      </main>
      <FrameComponent frameFooterAlignSelf="stretch" frameFooterFlex="unset" />
    </div>
  );
};

export default Frame5;
