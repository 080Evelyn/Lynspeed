import success from "../../../../assets/successImg.png";
interface PaymentText {
  text: string;
}

const PaymentValidationText = ({ text }: PaymentText) => {
  return (
    <div className="validation">
      <h2>{text}</h2>
      {text === "your payment has been successfully verified" && (
        <img src={success} alt="img" />
      )}
      {text === "Invalid Payment" && (
        <svg
          width="82"
          height="84"
          viewBox="0 0 82 84"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d_2054_1614)">
            <path
              d="M77.4775 63.7996C77.5125 68.0221 75.5389 71.0875 72.4131 72.3247C69.0518 73.6571 66.0012 73.0059 63.4465 70.4765C56.9244 64.015 50.4474 57.5035 43.9554 51.012C41.0099 48.0668 41.0099 48.0668 38.0043 51.0771C31.5123 57.5686 25.0303 64.0751 18.5132 70.5416C16.244 72.7906 13.4839 73.5319 10.4082 72.6052C7.34253 71.6836 5.39893 69.5648 4.71767 66.4594C4.05143 63.409 5.0583 60.8294 7.26238 58.6405C13.9498 51.9937 20.6221 45.3219 27.2745 38.6401C29.744 36.1607 29.734 36.8269 27.2093 34.2874C20.4668 27.5154 13.6843 20.7835 6.95181 14.0015C4.69764 11.7325 3.97129 8.97758 4.88298 5.89713C5.79466 2.81667 7.90858 0.888257 11.0193 0.21206C14.07 -0.454119 16.6498 0.537635 18.8438 2.74655C25.6715 9.6087 32.5743 16.4007 39.3368 23.328C40.7093 24.7355 41.4106 24.6002 42.708 23.2829C49.5808 16.2855 56.5337 9.37327 63.4915 2.46104C65.7557 0.212055 68.5108 -0.534263 71.5916 0.38236C74.6622 1.29898 76.6058 3.41272 77.2921 6.51822C77.9684 9.56862 76.9615 12.1532 74.7574 14.3421C67.8947 21.1742 61.1021 28.0714 54.1743 34.8384C52.7567 36.2208 52.917 36.9221 54.2294 38.2093C61.0971 44.9463 67.8546 51.7934 74.6773 58.5704C76.4055 60.2634 77.4424 62.2319 77.4775 63.7996Z"
              fill="#E70F01"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_2054_1614"
              x="0.5"
              y="0"
              width="81"
              height="84"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="7" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_2054_1614"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_2054_1614"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      )}
    </div>
  );
};

export default PaymentValidationText;
