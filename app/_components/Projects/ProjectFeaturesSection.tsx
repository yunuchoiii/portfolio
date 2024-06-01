import { IProjectFeature } from "@/app/_types/project";

const ProjectFeaturesSection = ({ 
  title, 
  content,
}: {
  title: string
  content?: IProjectFeature[]
}) => {
  return (content) && (
    <>
      <div className="mb-4 last:mb-0">
        <div className="text-base mb-1 font-bold">{title}</div>
        {Array.isArray(content) ? (
          <ul className="list-disc">
            {content.map((item, index) => (
              <li 
                key={`${title}-${index}`} 
                className="text-sm ml-4 leading-relaxed mb-1"
              >
                {item.feature}
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-sm">{content}</div>
        )}
      </div>
    </>
  );
};

export default ProjectFeaturesSection;