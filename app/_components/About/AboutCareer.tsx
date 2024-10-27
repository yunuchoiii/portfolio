import useFirestore from "@/app/_hooks/useFirestore";
import { ICareer } from "@/app/_types/career";
import { useIntersectionObserver } from "@uidotdev/usehooks";

const AboutCareer = () => {
  const {data:careerList} = useFirestore("career")

  const [ref, entry] = useIntersectionObserver({
    threshold: 0.5,
    root: null,
    rootMargin: "0px",
  });

  return <div ref={ref} className={`w-full h-full mb-20 ${entry?.intersectionRatio ? "fade-in-bottom" : "opacity-0"}`}>
    <div className="2xl:text-3xl xl:text-2xl text-xl font-semibold Montserrat mb-5">
      Career
    </div>
    <div>
      {(careerList as ICareer[]).map((c, i) => {
        return <div 
          key={`career-${i}`} 
          className={`relative px-8 py-6 ${c.workingNow ? "bg-blue-1 bg-opacity-15" : "bg-black bg-opacity-10 dark:bg-white dark:bg-opacity-10 opacity-85"} rounded-[30px] md:flex`}
        >
          <img src={c.logo} className="h-[120px] absolute grayscale opacity-20 dark:opacity-30 right-10 bottom-10 dark:invert" />
          <div className="Montserrat xl:w-1/5 md:w-1/4 md:border-b-0 border-b pb-3 mb-3 border-blue-1 leading-none">
            <div className="text-lg font-semibold">
              {c.companyName}
            </div>
            <div className="text-sm mt-2 break-keep">
              {c.period}
            </div>
          </div>
          <div className="flex-1">
            <div className="font-semibold mb-2">
              {c.team} {c.position}
            </div>
            <ul className="md:pl-0 pl-5">
              {c.tasks.map((task, i) => (
                <li key={`career-task-${i}`} className="leading-relaxed mb-1 last:mb-0 list-disc md:list-none">
                  {task}
                </li>
              ))}
            </ul>
          </div>
        </div>
      })}
    </div>
  </div>
}

export default AboutCareer;