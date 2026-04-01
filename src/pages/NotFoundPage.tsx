import { useNavigate } from "react-router";
import { useState } from "react";
import ContainerLayout from "../layouts/ContainerLayout";
import Cell from "../components/game/Cell";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const [isLightOn, setIsLightOn] = useState(true);

  const handleLightClick = () => {
    setIsLightOn(false);
    setTimeout(() => {
      navigate("/");
    }, 300);
  };

  return (
    <ContainerLayout className="justify-center p-4">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 sm:gap-3 select-none">
          <span className="text-8xl sm:text-9xl font-bold leading-none tabular-nums">
            4
          </span>
          <div
            className={`w-16 h-24 sm:w-24 sm:h-32 flex items-center justify-center ${
              isLightOn ? "animate-flicker" : ""
            }`}
          >
            <div className="scale-100 sm:scale-125 transform-gpu w-16 h-16 sm:w-18 sm:h-18">
              <Cell onClick={handleLightClick} isOn={isLightOn} />
            </div>
          </div>
          <span className="text-8xl sm:text-9xl font-bold leading-none tabular-nums">
            4
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold mb-7">Page Not Found</h1>

        <p className="text-lg text-gray-600 dark:text-slate-400 mb-1">
          Oops! Looks like you got lost in the dark.
        </p>
        <p className="text-yellow-600 dark:text-yellow-400 font-medium">
          💡 Turn off the light to go back home!
        </p>
      </div>
    </ContainerLayout>
  );
};

export default NotFoundPage;
