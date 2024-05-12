import { FIRST_LOADING_TIME_MS } from "@/app/_constants";

const BarLoader = () => {
  return <>
    <div 
      className="custom-loader"
    ></div>
    <style jsx>
      {`
        .custom-loader {
          width: 150px;
          height: 16px;
          border-radius: 20px;
          color: rgba(18, 151, 159, 0.5);
          border: 2px solid;
          position: relative;
        }

        .custom-loader::before {
          content: "";
          position: absolute;
          margin: 2px;
          inset: 0 100% 0 0;
          border-radius: inherit;
          background: rgba(18, 151, 159, 0.5);
          animation: p6 ${FIRST_LOADING_TIME_MS}ms infinite;
        }

        @keyframes p6 {
          100% {
            inset: 0
          }
        }
      `}
    </style>
  </>
}

export default BarLoader;