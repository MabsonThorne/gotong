import { useCallback } from "react";
import { TextField, InputAdornment, Icon, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Frame4 = () => {
  const navigate = useNavigate();

  const onGOTONGTextClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onAvatarIconClick = useCallback(() => {
    navigate("/3");
  }, [navigate]);

  return (
    <div className="w-full relative bg-white overflow-hidden flex flex-col items-start justify-start pt-0 px-0 pb-16 box-border gap-[32px] leading-[normal] tracking-[normal] text-left text-base text-text-primary font-small-text mq750:gap-[16px]">
      <header className="self-stretch bg-white overflow-hidden flex flex-row items-start justify-between py-2.5 pr-12 pl-5 top-[0] z-[99] sticky gap-[20px] text-left text-xl text-red font-small-text border-b-[1px] border-solid border-gainsboro-300 mq750:pr-6 mq750:box-border">
        <div className="flex flex-row items-end justify-start py-0 pr-[103px] pl-0 mq450:pr-5 mq450:box-border">
          <img
            className="h-[37px] w-[82px] relative object-cover z-[1]"
            loading="lazy"
            alt=""
            src="/logo1-11@2x.png"
          />
          <div
            className="relative tracking-[-0.01em] leading-[150%] font-semibold inline-block min-w-[93px] whitespace-nowrap cursor-pointer ml-[-22px]"
            onClick={onGOTONGTextClick}
          >
            <span>GO</span>
            <span className="text-text-primary">TONG</span>
          </div>
        </div>
        <nav className="m-0 w-48 flex flex-col items-start justify-start pt-2.5 px-0 pb-0 box-border mq750:hidden">
          <nav className="m-0 self-stretch flex flex-row items-start justify-between gap-[20px] text-left text-base text-text-primary font-small-text">
            <div className="relative leading-[150%] font-medium inline-block min-w-[32px]">
              首页
            </div>
            <div className="relative leading-[150%] font-medium inline-block min-w-[48px]">
              采购端
            </div>
            <div className="relative leading-[150%] font-medium inline-block min-w-[48px]">
              需求端
            </div>
          </nav>
        </nav>
        <div className="flex flex-col items-start justify-start pt-0.5 px-0 pb-0 text-base text-white">
          <div className="flex flex-row items-start justify-start gap-[24px]">
            <div className="flex flex-row items-start justify-start gap-[12px]">
              <div className="h-10 rounded-lg bg-whitesmoke-300 flex flex-row items-center justify-center py-0 px-4 box-border">
                <img
                  className="h-6 w-6 relative overflow-hidden shrink-0"
                  loading="lazy"
                  alt=""
                  src="/morehorizontal.svg"
                />
              </div>
              <div className="rounded-lg bg-red flex flex-row items-start justify-start py-2 px-4">
                <div className="relative leading-[150%] font-medium inline-block min-w-[32px]">
                  消息
                </div>
              </div>
            </div>
            <div className="flex flex-row items-start justify-start gap-[8px]">
              <img
                className="h-10 w-10 relative rounded-981xl overflow-hidden shrink-0 object-cover cursor-pointer"
                alt=""
                src="/avatar@2x.png"
                onClick={onAvatarIconClick}
              />
              <div className="flex flex-col items-start justify-start pt-2 px-0 pb-0">
                <img
                  className="w-6 h-6 relative overflow-hidden shrink-0"
                  alt=""
                  src="/chevrondown.svg"
                />
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="self-stretch flex flex-row items-start justify-start py-0 px-20 box-border max-w-full mq750:pl-10 mq750:pr-10 mq750:box-border">
        <div className="flex-1 flex flex-row items-start justify-between max-w-full gap-[20px] mq750:flex-wrap">
          <div className="rounded-lg bg-whitesmoke-100 overflow-x-auto flex flex-row items-start justify-start p-1">
            <div className="shadow-[0px_1px_2px_rgba(0,_0,_0,_0.05)] rounded bg-white flex flex-row items-start justify-start py-1 px-3">
              <div className="relative leading-[150%] font-medium inline-block min-w-[64px]">
                交易数据
              </div>
            </div>
            <div className="rounded flex flex-row items-start justify-start py-1 px-3">
              <div className="relative leading-[150%] font-medium inline-block min-w-[29px]">
                Tab
              </div>
            </div>
            <div className="rounded flex flex-row items-start justify-start py-1 px-3">
              <div className="relative leading-[150%] font-medium inline-block min-w-[29px]">
                Tab
              </div>
            </div>
            <div className="self-stretch rounded hidden flex-row items-center justify-start py-0 px-3">
              <div className="relative leading-[150%] font-medium">Popular</div>
            </div>
            <div className="self-stretch rounded hidden flex-row items-center justify-start py-0 px-3">
              <div className="relative leading-[150%] font-medium">
                New Releases
              </div>
            </div>
          </div>
          <TextField
            className="[border:none] bg-[transparent] h-10 w-[405px] font-small-text text-base text-gray-100 max-w-full"
            placeholder="Search..."
            variant="outlined"
            InputProps={{
              startAdornment: (
                <img width="24px" height="24px" src="/search.svg" />
              ),
            }}
            sx={{
              "& fieldset": { borderColor: "#e0e0e0" },
              "& .MuiInputBase-root": {
                height: "40px",
                backgroundColor: "#fff",
                paddingLeft: "12px",
                borderRadius: "8px",
              },
              "& .MuiInputBase-input": {
                paddingLeft: "12px",
                color: "#828282",
              },
              width: "405px",
            }}
          />
        </div>
      </div>
      <section className="self-stretch flex flex-row items-start justify-start py-0 pr-[81px] pl-20 box-border max-w-full text-left text-base text-text-primary font-small-text mq750:pl-10 mq750:pr-10 mq750:box-border">
        <div className="flex-1 flex flex-row flex-wrap items-start justify-start gap-[32px] max-w-full mq750:gap-[16px]">
          <div className="flex-1 shadow-[0px_4px_12px_rgba(0,_0,_0,_0.04)] rounded-lg bg-white box-border overflow-hidden flex flex-col items-start justify-start py-[22px] pr-5 pl-6 gap-[16px] min-w-[304px] max-w-full border-[1px] border-solid border-gainsboro-300">
            <div className="self-stretch relative leading-[150%] font-semibold">
              Title
            </div>
            <div className="self-stretch relative text-21xl tracking-[-0.02em] leading-[110%] font-semibold whitespace-nowrap mq450:text-5xl mq450:leading-[26px] mq1050:text-13xl mq1050:leading-[35px]">
              $45,678.90
            </div>
            <div className="self-stretch relative leading-[150%] font-medium text-gray-100">
              +20% month over month
            </div>
          </div>
          <div className="flex-1 shadow-[0px_4px_12px_rgba(0,_0,_0,_0.04)] rounded-lg bg-white box-border overflow-hidden flex flex-col items-start justify-start py-[22px] pr-5 pl-6 gap-[16px] min-w-[304px] max-w-full border-[1px] border-solid border-gainsboro-300">
            <div className="self-stretch relative leading-[150%] font-semibold">
              Title
            </div>
            <div className="self-stretch relative text-21xl tracking-[-0.02em] leading-[110%] font-semibold mq450:text-5xl mq450:leading-[26px] mq1050:text-13xl mq1050:leading-[35px]">
              2,405
            </div>
            <div className="self-stretch relative leading-[150%] font-medium text-gray-100">
              +33% month over month
            </div>
          </div>
          <div className="flex-1 shadow-[0px_4px_12px_rgba(0,_0,_0,_0.04)] rounded-lg bg-white box-border overflow-hidden flex flex-col items-start justify-start py-[22px] pr-5 pl-6 gap-[16px] min-w-[304px] max-w-full border-[1px] border-solid border-gainsboro-300">
            <div className="self-stretch relative leading-[150%] font-semibold">
              Title
            </div>
            <div className="self-stretch relative text-21xl tracking-[-0.02em] leading-[110%] font-semibold mq450:text-5xl mq450:leading-[26px] mq1050:text-13xl mq1050:leading-[35px]">
              10,353
            </div>
            <div className="self-stretch relative leading-[150%] font-medium text-gray-100">
              -8% month over month
            </div>
          </div>
        </div>
      </section>
      <section className="self-stretch flex flex-row items-start justify-start py-0 px-20 box-border max-w-full text-left text-base text-text-primary font-small-text mq750:pl-10 mq750:pr-10 mq750:box-border">
        <div className="flex-1 flex flex-row items-start justify-start gap-[32px] max-w-full lg:flex-wrap mq750:gap-[16px]">
          <div className="flex-1 shadow-[0px_4px_12px_rgba(0,_0,_0,_0.04)] rounded-lg bg-white box-border overflow-hidden flex flex-col items-start justify-start py-[22px] px-[23px] gap-[23px] min-w-[476px] max-w-full border-[1px] border-solid border-gainsboro-300 mq750:min-w-full mq450:pt-5 mq450:pb-5 mq450:box-border">
            <div className="relative leading-[150%] font-semibold inline-block min-w-[35px]">
              Title
            </div>
            <div className="self-stretch flex flex-col items-start justify-start gap-[4px] max-w-full text-smi text-gray-100">
              <div className="self-stretch h-[329px] flex flex-col items-start justify-start pt-0 px-0 pb-[309px] box-border relative gap-[19.7px] max-w-full mq750:pb-[201px] mq750:box-border">
                <img
                  className="w-full h-px absolute !m-[0] top-[54.8px] right-[0px] left-[0px] max-w-full overflow-hidden shrink-0"
                  alt=""
                  src="/vector-3.svg"
                />
                <img
                  className="w-full h-px absolute !m-[0] top-[109.7px] right-[0px] left-[0px] max-w-full overflow-hidden shrink-0"
                  alt=""
                  src="/vector-4.svg"
                />
                <img
                  className="w-full h-px absolute !m-[0] right-[0px] bottom-[163.5px] left-[0px] max-w-full overflow-hidden shrink-0"
                  alt=""
                  src="/vector-5.svg"
                />
                <img
                  className="w-full h-px absolute !m-[0] right-[0px] bottom-[108.7px] left-[0px] max-w-full overflow-hidden shrink-0"
                  alt=""
                  src="/vector-6.svg"
                />
                <img
                  className="w-full h-px absolute !m-[0] right-[0px] bottom-[53.8px] left-[0px] max-w-full overflow-hidden shrink-0"
                  alt=""
                  src="/vector-7.svg"
                />
                <div className="self-stretch flex flex-col items-start justify-start relative shrink-0 [debug_commit:0448091]">
                  <img
                    className="self-stretch relative max-w-full overflow-hidden max-h-full"
                    loading="lazy"
                    alt=""
                    src="/vector-1.svg"
                  />
                  <div className="relative leading-[20px] inline-block min-w-[52px] whitespace-nowrap z-[1] mt-[-1px]">
                    $50,000
                  </div>
                  <div className="w-12 h-12 absolute !m-[0] right-[21px] bottom-[-44px]">
                    <div className="absolute top-[18px] left-[18px] rounded-[50%] bg-text-primary w-3 h-3 z-[3]" />
                    <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-gray-200 w-full h-full z-[4]" />
                  </div>
                </div>
                <div className="self-stretch flex flex-col items-start justify-start gap-[4.5px] shrink-0 [debug_commit:0448091] max-w-full">
                  <div className="w-[639.3px] h-[284.8px] relative max-w-full">
                    <div className="absolute top-[15.3px] left-[0px] leading-[20px] inline-block min-w-[52px] whitespace-nowrap z-[1]">
                      $45,000
                    </div>
                    <div className="absolute top-[70.3px] left-[0px] leading-[20px] inline-block min-w-[53px] whitespace-nowrap z-[1]">
                      $40,000
                    </div>
                    <div className="absolute top-[125.3px] left-[0px] leading-[20px] inline-block min-w-[52px] whitespace-nowrap z-[1]">
                      $35,000
                    </div>
                    <div className="absolute top-[180.3px] left-[0px] leading-[20px] inline-block min-w-[53px] whitespace-nowrap z-[1]">
                      $30,000
                    </div>
                    <div className="absolute top-[235.3px] left-[0px] leading-[20px] inline-block min-w-[52px] whitespace-nowrap z-[1]">
                      $25,000
                    </div>
                    <img
                      className="absolute top-[0px] left-[1.2px] w-full h-full z-[2]"
                      loading="lazy"
                      alt=""
                      src="/graph.svg"
                    />
                  </div>
                  <img
                    className="self-stretch relative max-w-full overflow-hidden max-h-full"
                    loading="lazy"
                    alt=""
                    src="/vector-1.svg"
                  />
                </div>
              </div>
              <div className="self-stretch flex flex-row items-start justify-between gap-[20px] text-right mq750:flex-wrap">
                <div className="relative leading-[20px] text-left inline-block min-w-[45px]">
                  23 Nov
                </div>
                <div className="w-[45px] flex flex-col items-start justify-start py-0 pr-[26px] pl-0 box-border">
                  <div className="w-[18px] relative leading-[20px] inline-block min-w-[18px]">
                    24
                  </div>
                </div>
                <div className="w-[45px] flex flex-col items-start justify-start py-0 pr-[27px] pl-0 box-border">
                  <div className="self-stretch relative leading-[20px] inline-block min-w-[18px]">
                    25
                  </div>
                </div>
                <div className="w-[44.9px] flex flex-col items-start justify-start py-0 pr-[26px] pl-0 box-border">
                  <div className="w-[18px] relative leading-[20px] inline-block min-w-[18px]">
                    26
                  </div>
                </div>
                <div className="w-[45px] flex flex-col items-start justify-start py-0 pr-[27px] pl-0 box-border">
                  <div className="self-stretch relative leading-[20px] inline-block min-w-[18px]">
                    27
                  </div>
                </div>
                <div className="w-[45px] flex flex-col items-start justify-start py-0 pr-[26px] pl-0 box-border">
                  <div className="w-[18px] relative leading-[20px] inline-block min-w-[18px]">
                    28
                  </div>
                </div>
                <div className="w-[45px] flex flex-col items-start justify-start py-0 pr-[27px] pl-0 box-border">
                  <div className="self-stretch relative leading-[20px] inline-block min-w-[18px]">
                    29
                  </div>
                </div>
                <div className="w-[18px] relative leading-[20px] inline-block shrink-0 min-w-[18px] mq750:w-full mq750:h-[18px]">
                  30
                </div>
              </div>
            </div>
          </div>
          <div className="w-[515px] shadow-[0px_4px_12px_rgba(0,_0,_0,_0.04)] rounded-lg bg-white box-border overflow-hidden shrink-0 flex flex-col items-start justify-start py-[22px] px-[23px] gap-[16px] min-w-[515px] max-w-full border-[1px] border-solid border-gainsboro-300 lg:flex-1 mq750:min-w-full mq450:pt-5 mq450:pb-5 mq450:box-border">
            <div className="relative leading-[150%] font-semibold inline-block min-w-[35px]">
              Title
            </div>
            <div className="self-stretch flex flex-col items-center justify-center max-w-full">
              <div className="self-stretch rounded-lg flex flex-row items-center justify-start py-3 px-0 box-border gap-[16px] max-w-full mq750:flex-wrap">
                <img
                  className="h-12 w-12 relative rounded-981xl overflow-hidden shrink-0 object-cover min-h-[48px]"
                  alt=""
                  src="/avatar-9@2x.png"
                />
                <div className="flex-1 flex flex-col items-start justify-start min-w-[262px] max-w-full">
                  <div className="relative leading-[150%] font-medium inline-block min-w-[54px]">
                    Helena
                  </div>
                  <div className="self-stretch relative leading-[150%] text-darkslategray overflow-hidden text-ellipsis whitespace-nowrap">
                    email@figmasfakedomain.net
                  </div>
                </div>
              </div>
              <div className="self-stretch rounded-lg flex flex-row items-center justify-start py-3 px-0 box-border gap-[16px] max-w-full mq750:flex-wrap">
                <img
                  className="h-12 w-12 relative rounded-981xl overflow-hidden shrink-0 object-contain min-h-[48px]"
                  alt=""
                  src="/avatar-21@2x.png"
                />
                <div className="flex-1 flex flex-col items-start justify-start min-w-[262px] max-w-full">
                  <div className="relative leading-[150%] font-medium inline-block min-w-[46px]">
                    Oscar
                  </div>
                  <div className="self-stretch relative leading-[150%] text-darkslategray overflow-hidden text-ellipsis whitespace-nowrap">
                    email@figmasfakedomain.net
                  </div>
                </div>
              </div>
              <div className="self-stretch rounded-lg flex flex-row items-center justify-start py-3 px-0 box-border gap-[16px] max-w-full mq750:flex-wrap">
                <img
                  className="h-12 w-12 relative rounded-981xl overflow-hidden shrink-0 object-contain min-h-[48px]"
                  alt=""
                  src="/avatar-31@2x.png"
                />
                <div className="flex-1 flex flex-col items-start justify-start min-w-[262px] max-w-full">
                  <div className="relative leading-[150%] font-medium inline-block min-w-[48px]">
                    Daniel
                  </div>
                  <div className="self-stretch relative leading-[150%] text-darkslategray overflow-hidden text-ellipsis whitespace-nowrap">
                    email@figmasfakedomain.net
                  </div>
                </div>
              </div>
              <div className="self-stretch rounded-lg flex flex-row items-center justify-start py-3 px-0 box-border gap-[16px] max-w-full mq750:flex-wrap">
                <img
                  className="h-12 w-12 relative rounded-981xl overflow-hidden shrink-0 object-contain min-h-[48px]"
                  alt=""
                  src="/avatar-41@2x.png"
                />
                <div className="flex-1 flex flex-col items-start justify-start min-w-[262px] max-w-full">
                  <div className="relative leading-[150%] font-medium inline-block min-w-[118px]">
                    Daniel Jay Park
                  </div>
                  <div className="self-stretch relative leading-[150%] text-darkslategray overflow-hidden text-ellipsis whitespace-nowrap">
                    email@figmasfakedomain.net
                  </div>
                </div>
              </div>
              <div className="self-stretch rounded-lg flex flex-row items-center justify-start py-3 px-0 box-border gap-[16px] max-w-full mq750:flex-wrap">
                <img
                  className="h-12 w-12 relative rounded-981xl overflow-hidden shrink-0 object-contain min-h-[48px]"
                  alt=""
                  src="/avatar-51@2x.png"
                />
                <div className="flex-1 flex flex-col items-start justify-start min-w-[262px] max-w-full">
                  <div className="relative leading-[150%] font-medium inline-block min-w-[85px]">
                    Mark Rojas
                  </div>
                  <div className="self-stretch relative leading-[150%] text-darkslategray overflow-hidden text-ellipsis whitespace-nowrap">
                    email@figmasfakedomain.net
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="self-stretch flex flex-row items-start justify-start py-0 px-20 box-border max-w-full text-left text-base text-text-primary font-small-text mq750:pl-10 mq750:pr-10 mq750:box-border">
        <div className="flex-1 flex flex-row items-start justify-start gap-[32px] max-w-full lg:flex-wrap mq750:gap-[16px]">
          <div className="w-[515px] shadow-[0px_4px_12px_rgba(0,_0,_0,_0.04)] rounded-lg bg-white box-border overflow-hidden shrink-0 flex flex-col items-start justify-start pt-[22px] px-[23px] pb-[18px] gap-[16px] min-w-[515px] max-w-full border-[1px] border-solid border-gainsboro-300 lg:flex-1 mq750:min-w-full">
            <div className="relative leading-[150%] font-semibold inline-block min-w-[35px]">
              Title
            </div>
            <div className="self-stretch flex flex-col items-start justify-start gap-[4px] text-right text-gray-100">
              <div className="self-stretch flex flex-row items-start justify-start gap-[16px] mq750:flex-wrap">
                <div className="flex-1 relative leading-[150%] font-semibold text-left inline-block min-w-[43px]">
                  Source
                </div>
                <div className="relative leading-[150%] font-semibold inline-block min-w-[70px]">
                  Sessions
                </div>
                <div className="relative leading-[150%] font-semibold inline-block min-w-[61px]">
                  Change
                </div>
              </div>
              <div className="self-stretch flex flex-col items-start justify-start text-text-primary">
                <div className="self-stretch overflow-x-auto flex flex-row items-start justify-start pt-2.5 px-0 pb-3 gap-[33px] border-t-[1px] border-solid border-gainsboro-300 mq750:gap-[16px]">
                  <div className="w-[319px] shrink-0 flex flex-col items-start justify-start py-0 pr-[15px] pl-0 box-border text-left">
                    <div className="self-stretch relative leading-[150%] font-medium">
                      website.net
                    </div>
                  </div>
                  <div className="relative leading-[150%] inline-block min-w-[38px]">
                    4321
                  </div>
                  <div className="relative leading-[150%] inline-block min-w-[44px]">
                    +84%
                  </div>
                </div>
                <div className="self-stretch overflow-x-auto flex flex-row items-start justify-start pt-2.5 px-0 pb-3 gap-[45.5px] border-t-[1px] border-solid border-gainsboro-300 mq750:gap-[23px]">
                  <div className="w-[304px] relative leading-[150%] font-medium text-left inline-block shrink-0">
                    website.net
                  </div>
                  <div className="relative leading-[150%] inline-block min-w-[41px]">
                    4033
                  </div>
                  <div className="relative leading-[150%] inline-block min-w-[31px]">
                    -8%
                  </div>
                </div>
                <div className="self-stretch overflow-x-auto flex flex-row items-start justify-start pt-2.5 px-0 pb-3 gap-[46px] border-t-[1px] border-solid border-gainsboro-300 mq750:gap-[23px]">
                  <div className="w-[304px] relative leading-[150%] font-medium text-left inline-block shrink-0">
                    website.net
                  </div>
                  <div className="relative leading-[150%] inline-block min-w-[38px]">
                    3128
                  </div>
                  <div className="relative leading-[150%] inline-block min-w-[33px]">
                    +2%
                  </div>
                </div>
                <div className="self-stretch overflow-x-auto flex flex-row items-start justify-start pt-2.5 px-0 pb-3 gap-[33px] border-t-[1px] border-solid border-gainsboro-300 mq750:gap-[16px]">
                  <div className="w-[319px] shrink-0 flex flex-col items-start justify-start py-0 pr-[15px] pl-0 box-border text-left">
                    <div className="self-stretch relative leading-[150%] font-medium">
                      website.net
                    </div>
                  </div>
                  <div className="relative leading-[150%] inline-block min-w-[38px]">
                    2104
                  </div>
                  <div className="relative leading-[150%] inline-block min-w-[44px]">
                    +33%
                  </div>
                </div>
                <div className="self-stretch overflow-x-auto flex flex-row items-start justify-start pt-2.5 px-0 pb-3 gap-[33px] border-t-[1px] border-solid border-gainsboro-300 mq750:gap-[16px]">
                  <div className="w-[317px] shrink-0 flex flex-col items-start justify-start py-0 pr-[13px] pl-0 box-border text-left">
                    <div className="self-stretch relative leading-[150%] font-medium">
                      website.net
                    </div>
                  </div>
                  <div className="relative leading-[150%] inline-block min-w-[40px]">
                    2003
                  </div>
                  <div className="relative leading-[150%] inline-block min-w-[44px]">
                    +30%
                  </div>
                </div>
                <div className="self-stretch overflow-x-auto flex flex-row items-start justify-start pt-2.5 px-0 pb-3 gap-[36px] border-t-[1px] border-solid border-gainsboro-300 mq750:gap-[18px]">
                  <div className="w-[316px] shrink-0 flex flex-col items-start justify-start py-0 pr-3 pl-0 box-border text-left">
                    <div className="self-stretch relative leading-[150%] font-medium">
                      website.net
                    </div>
                  </div>
                  <div className="relative leading-[150%] inline-block min-w-[38px]">
                    1894
                  </div>
                  <div className="relative leading-[150%] inline-block min-w-[41px]">
                    +15%
                  </div>
                </div>
                <div className="self-stretch overflow-x-auto flex flex-row items-start justify-start pt-2.5 px-0 pb-3 gap-[39px] border-t-[1px] border-solid border-gainsboro-300 mq750:gap-[19px]">
                  <div className="w-[321px] shrink-0 flex flex-col items-start justify-start py-0 pr-[17px] pl-0 box-border text-left">
                    <div className="self-stretch relative leading-[150%] font-medium">
                      website.net
                    </div>
                  </div>
                  <div className="relative leading-[150%] inline-block min-w-[30px]">
                    405
                  </div>
                  <div className="relative leading-[150%] inline-block min-w-[38px]">
                    -12%
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 shadow-[0px_4px_12px_rgba(0,_0,_0,_0.04)] rounded-lg bg-white box-border overflow-hidden flex flex-col items-start justify-start py-[22px] pr-[19px] pl-[23px] gap-[23px] min-w-[476px] max-w-full border-[1px] border-solid border-gainsboro-300 mq750:min-w-full mq450:pt-5 mq450:pb-5 mq450:box-border">
            <div className="relative leading-[150%] font-semibold inline-block min-w-[35px]">
              Title
            </div>
            <div className="self-stretch flex flex-col items-end justify-start gap-[4px] max-w-full text-smi text-gray-100">
              <div className="self-stretch flex flex-row items-start justify-end py-0 pr-1 pl-0 box-border max-w-full">
                <div className="h-[329px] flex-1 flex flex-col items-start justify-start pt-0 px-0 pb-[34px] box-border gap-[34.4px] max-w-full mq750:h-auto mq750:gap-[17px]">
                  <div className="self-stretch flex flex-col items-start justify-start relative">
                    <img
                      className="self-stretch relative max-w-full overflow-hidden max-h-full"
                      alt=""
                      src="/vector-1.svg"
                    />
                    <div className="relative leading-[20px] inline-block min-w-[52px] whitespace-nowrap z-[1] mt-[-1px]">
                      $80,000
                    </div>
                    <div className="!m-[0] absolute right-[9px] bottom-[-309px] flex flex-row items-end justify-start gap-[19px] z-[1] mq750:flex-wrap">
                      <div className="h-[149px] w-8 relative rounded-t rounded-b-none bg-text-primary" />
                      <div className="h-[179px] w-8 relative rounded-t rounded-b-none bg-text-primary" />
                      <div className="h-[149px] w-8 relative rounded-t rounded-b-none bg-text-primary" />
                      <div className="h-[137px] w-8 relative rounded-t rounded-b-none bg-text-primary" />
                      <div className="h-[204px] w-8 relative rounded-t rounded-b-none bg-text-primary" />
                      <div className="h-[314px] w-8 relative rounded-t rounded-b-none bg-text-primary" />
                      <div className="h-[210px] w-8 relative rounded-t rounded-b-none bg-text-primary" />
                      <div className="h-[254px] w-8 relative rounded-t rounded-b-none bg-text-primary" />
                      <div className="h-[185px] w-8 relative rounded-t rounded-b-none bg-text-primary" />
                      <div className="h-[156px] w-8 relative rounded-t rounded-b-none bg-text-primary" />
                      <div className="h-[137px] w-8 relative rounded-t rounded-b-none bg-text-primary" />
                      <div className="h-[22px] w-8 relative rounded-t rounded-b-none bg-text-primary" />
                    </div>
                  </div>
                  <div className="self-stretch flex flex-col items-start justify-start">
                    <img
                      className="self-stretch relative max-w-full overflow-hidden max-h-full"
                      alt=""
                      src="/vector-3.svg"
                    />
                    <div className="relative leading-[20px] inline-block min-w-[51px] whitespace-nowrap z-[1] mt-[-0.8px]">
                      $70,000
                    </div>
                  </div>
                  <div className="self-stretch flex flex-col items-start justify-start">
                    <img
                      className="self-stretch relative max-w-full overflow-hidden max-h-full"
                      alt=""
                      src="/vector-4.svg"
                    />
                    <div className="relative leading-[20px] inline-block min-w-[52px] whitespace-nowrap z-[1] mt-[-0.7px]">
                      $60,000
                    </div>
                  </div>
                  <div className="self-stretch flex flex-col items-start justify-start">
                    <img
                      className="self-stretch relative max-w-full overflow-hidden max-h-full"
                      alt=""
                      src="/vector-5.svg"
                    />
                    <div className="relative leading-[20px] inline-block min-w-[52px] whitespace-nowrap z-[1] mt-[-0.5px]">
                      $50,000
                    </div>
                  </div>
                  <div className="self-stretch flex flex-col items-start justify-start">
                    <img
                      className="self-stretch relative max-w-full overflow-hidden max-h-full"
                      alt=""
                      src="/vector-6.svg"
                    />
                    <div className="relative leading-[20px] inline-block min-w-[53px] whitespace-nowrap z-[1] mt-[-0.3px]">
                      $40,000
                    </div>
                  </div>
                  <div className="self-stretch flex flex-col items-start justify-start">
                    <img
                      className="self-stretch relative max-w-full overflow-hidden max-h-full"
                      alt=""
                      src="/vector-7.svg"
                    />
                    <div className="relative leading-[20px] inline-block min-w-[53px] whitespace-nowrap z-[1] mt-[-0.2px]">
                      $30,000
                    </div>
                  </div>
                  <img
                    className="self-stretch relative max-w-full overflow-hidden max-h-full"
                    alt=""
                    src="/vector-1.svg"
                  />
                </div>
              </div>
              <div className="w-[616px] flex flex-row items-start justify-start max-w-full text-center mq750:flex-wrap">
                <div className="flex-1 relative leading-[20px] inline-block min-w-[50px] max-w-[51px]">
                  Jan
                </div>
                <div className="flex-1 relative leading-[20px] inline-block min-w-[50px] max-w-[51px]">
                  Feb
                </div>
                <div className="flex-1 relative leading-[20px] inline-block min-w-[50px] max-w-[51px]">
                  Mar
                </div>
                <div className="flex-1 relative leading-[20px] inline-block min-w-[50px] max-w-[51px]">
                  Apr
                </div>
                <div className="flex-1 relative leading-[20px] inline-block min-w-[50px] max-w-[51px]">
                  May
                </div>
                <div className="flex-1 relative leading-[20px] inline-block min-w-[50px] max-w-[51px]">
                  Jun
                </div>
                <div className="flex-1 relative leading-[20px] inline-block min-w-[50px] max-w-[51px]">
                  Jul
                </div>
                <div className="flex-1 relative leading-[20px] inline-block min-w-[50px] max-w-[51px]">
                  Aug
                </div>
                <div className="flex-1 relative leading-[20px] inline-block min-w-[50px] max-w-[51px]">
                  Sep
                </div>
                <div className="flex-1 relative leading-[20px] inline-block min-w-[50px] max-w-[51px]">
                  Oct
                </div>
                <div className="flex-1 relative leading-[20px] inline-block min-w-[50px] max-w-[51px]">
                  Nov
                </div>
                <div className="flex-1 relative leading-[20px] inline-block min-w-[50px] max-w-[51px]">
                  Dec
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Frame9;
