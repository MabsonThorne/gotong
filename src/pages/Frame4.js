import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import EmailRegistration from "../components/EmailRegistration";

const Frame4 = () => {
  const navigate = useNavigate();

  const onGOTONGTextClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className="w-full relative bg-white flex flex-col items-start justify-start pt-16 px-[151px] pb-[316px] box-border gap-[32px] leading-[normal] tracking-[normal] text-left text-29xl text-red font-small-text mq450:pl-5 mq450:pr-5 mq450:box-border mq750:gap-[16px] mq750:pl-[75px] mq750:pr-[75px] mq750:box-border">
      <div className="w-full flex flex-row items-center justify-start relative gap-4">
        <img
          className="h-[98px] w-[98px] object-cover z-[1] mq450:h-[43px] mq450:w-[43px] mq750:h-[58px] mq750:w-[58px]"
          loading="lazy"
          alt=""
          src="/logo1-1@2x.png"
        />
        <h1
          className="m-0 text-inherit leading-[144px] font-medium font-inherit cursor-pointer mq450:text-10xl mq450:leading-[43px] mq750:text-19xl mq750:leading-[58px]"
          onClick={onGOTONGTextClick}
        >
          <span>GO</span>
          <span className="text-black">TONG</span>
        </h1>
      </div>
      <div className="self-stretch flex flex-row items-start justify-center max-w-full">
        <EmailRegistration />
      </div>
    </div>
  );
};

export default Frame4;
