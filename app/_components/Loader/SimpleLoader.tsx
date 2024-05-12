const SimpleLoader = () => {
  return <>
    <div className="loader"></div>
    <style jsx>
      {`
        .loader {
          border: 4px solid rgba(0, 0, 0, .3);
          border-left-color: transparent;
          border-radius: 50%;
        }

        .loader {
          border: 4px solid rgba(0, 0, 0, .3);
          border-left-color: transparent;
          width: 30px;
          height: 30px;
        }

        .loader {
          border: 4px solid rgba(0, 0, 0, .3);
          border-left-color: transparent;
          width: 30px;
          height: 30px;
          animation: spin89345 1s linear infinite;
        }

        @keyframes spin89345 {
          0% {
            transform: rotate(0deg);
          }

          100% {
            transform: rotate(360deg);
          }
        }
      `}
    </style>
  </>
}

export default SimpleLoader;